import { Institution, Need } from "@/types/project";

const API_BASE_URL = 'http://localhost:8000/api/v1';

// --- ТИПЫ ---
interface BackendInstitution {
  id: number;
  name: string;
  type: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  activity_hours: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at?: string;
}

interface BackendNeed {
  id: number;
  institution_id: number;
  name: string;
  description: string;
  unit: string;
  required_qty: number;
  received_qty: number;
  urgency: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

// Получение заголовков с токеном
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// Мапперы
const mapInstitution = (item: BackendInstitution): Institution => ({
  id: String(item.id),
  name: item.name,
  city: item.city,
  address: item.address,
  type: item.type as 'Children' | 'Elderly' | 'Disabled',
  contactPhone: item.phone,
  contactEmail: item.email,
  activityHours: item.activity_hours,
  needsCount: 0, // Пока 0, так как список берем отдельно
  lastUpdated: item.updated_at 
    ? new Date(item.updated_at).toLocaleDateString('ru-RU') 
    : new Date(item.created_at).toLocaleDateString('ru-RU'),
  needs: []
});

const mapNeed = (item: BackendNeed): Need => ({
  id: String(item.id),
  name: item.name,
  unit: item.unit,
  requiredQuantity: item.required_qty,
  receivedQuantity: item.received_qty,
});

// --- API МЕТОДЫ ---

// 1. Авторизация
export async function login(phone: string, password: string): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: phone, password: password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Ошибка входа');
  }

  const json: ApiResponse<TokenResponse> = await res.json();
  return json.data;
}

// 2. Учреждения (Публичные)
export async function fetchInstitutions(): Promise<Institution[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/institutions`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Ошибка загрузки');
    const json: ApiResponse<BackendInstitution[]> = await res.json();
    if (!json.data) return [];
    return json.data.map(mapInstitution);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchInstitutionById(id: string): Promise<Institution | null> {
  try {
    const resInst = await fetch(`${API_BASE_URL}/institutions/${id}`, { cache: 'no-store' });
    if (!resInst.ok) return null;
    const jsonInst = await resInst.json();
    if (!jsonInst.data) return null;
    
    const institution = mapInstitution(jsonInst.data);

    // Загружаем нужды
    const resNeeds = await fetch(`${API_BASE_URL}/institutions/${id}/needs`, { cache: 'no-store' });
    if (resNeeds.ok) {
        const jsonNeeds = await resNeeds.json();
        if (jsonNeeds.data) {
            institution.needs = jsonNeeds.data.map(mapNeed);
            institution.needsCount = institution.needs.length;
        }
    }
    return institution;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 3. Управление нуждами (Защищено токеном)
export async function createNeed(data: any) {
  const res = await fetch(`${API_BASE_URL}/needs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка создания нужды');
  return res.json();
}

export async function deleteNeed(id: string) {
  const res = await fetch(`${API_BASE_URL}/needs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Ошибка удаления');
  return res.json();
}