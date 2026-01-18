import { Institution, Need } from "@/types/project";

const API_BASE_URL = "http://localhost:8000/api/v1";

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

const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const mapInstitution = (item: BackendInstitution): Institution => ({
  id: String(item.id),
  name: item.name,
  city: item.city,
  address: item.address,
  type: item.type as "Children" | "Elderly" | "Disabled",
  contactPhone: item.phone,
  contactEmail: item.email,
  needsCount: 0,
  lastUpdated: item.updated_at
    ? new Date(item.updated_at).toLocaleDateString("ru-RU")
    : new Date(item.created_at).toLocaleDateString("ru-RU"),
  needs: [],
  activityHours: item.activity_hours,
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
export async function login(
  email: string,
  password: string
): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login error");
  }

  const json: ApiResponse<TokenResponse> = await res.json();
  return json.data;
}

// 2. Регистрация (НОВОЕ)
export async function register(
  email: string,
  phone: string,
  password: string,
  fullName: string,
  role: "volunteer" | "institution",
  institutionId: number | null // null для волонтеров
): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      phone,
      password,
      full_name: fullName,
      role: role,
      institution_id: institutionId, // Может быть null
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Register error");
  }

  const json: ApiResponse<TokenResponse> = await res.json();
  return json.data;
}

// 3. Учреждения
export async function fetchInstitutions(filters?: {
  search?: string;
  type?: string;
}): Promise<Institution[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.append("name", filters.search);
    if (filters?.type && filters.type !== "all") {
      params.append("type", filters.type);
    }

    const res = await fetch(
      `${API_BASE_URL}/institutions?${params.toString()}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Ошибка загрузки");
    const json: ApiResponse<BackendInstitution[]> = await res.json();
    if (!json.data) return [];
    return json.data.map(mapInstitution);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchInstitutionById(
  id: string
): Promise<Institution | null> {
  try {
    const resInst = await fetch(`${API_BASE_URL}/institutions/${id}`, {
      cache: "no-store",
    });
    if (!resInst.ok) return null;
    const jsonInst = await resInst.json();
    if (!jsonInst.data) return null;

    const institution = mapInstitution(jsonInst.data);

    const resNeeds = await fetch(`${API_BASE_URL}/institutions/${id}/needs`, {
      cache: "no-store",
    });
    if (resNeeds.ok) {
      const jsonNeeds = await resNeeds.json();
      if (jsonNeeds.data) {
        // @ts-ignore
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

// 4. Управление нуждами
export async function createNeed(data: any) {
  const res = await fetch(`${API_BASE_URL}/needs`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка создания нужды");
  return res.json();
}

export async function deleteNeed(id: string) {
  const res = await fetch(`${API_BASE_URL}/needs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Ошибка удаления");
  return res.json();
}
// 5. Получение профиля (НОВОЕ)
export async function getProfile(): Promise<{
  id: number;
  full_name: string;
  email: string;
  role: string;
  institution_id?: number;
}> {
  const res = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить профиль");
  }

  const json = await res.json();
  return json.data;
}
