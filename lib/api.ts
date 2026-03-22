import { Institution, Need } from "@/types/project";

const API_BASE_URL = "/api/v1";

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
  needs_count?: number;
}

interface BackendNeed {
  id: number;
  institution_id: number;
  name: string;
  description: string;
  unit: string;
  required_qty: number;
  received_qty: number;
  booked_qty: number;
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

export async function refreshTokens(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Session expired");
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // If unauthorized, try to refresh once
  if (res.status === 401 && !url.includes("/login") && !url.includes("/refresh")) {
    try {
      await refreshTokens();
      // Retry request
      res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    } catch {
      // Refresh failed, user needs to login again
      return res;
    }
  }

  // GLOBAL ERROR HANDLER
  if (!res.ok) {
    const clone = res.clone();
    clone.json().then(errData => {
      // Distinguish system level errors from form validation errors if possible
      if (res.status === 401 || res.status === 403 || res.status === 429 || res.status >= 500) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('api-error', { detail: errData.message || 'Системная ошибка' }));
        }
      }
    }).catch(() => {});
  }

  return res;
}

const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const mapInstitution = (item: BackendInstitution): Institution => ({
  id: String(item.id),
  name: item.name,
  city: item.city,
  address: item.address,
  type: item.type as "Children" | "Elderly",
  contactPhone: item.phone,
  contactEmail: item.email,
  needsCount: item.needs_count || 0,
  lastUpdated: item.updated_at
    ? new Date(item.updated_at).toLocaleDateString("ru-RU")
    : new Date(item.created_at).toLocaleDateString("ru-RU"),
  needs: [],
  activityHours: item.activity_hours,
  latitude: item.latitude,
  longitude: item.longitude,
});

const mapNeed = (item: BackendNeed): Need => ({
  id: String(item.id),
  name: item.name,
  unit: item.unit,
  requiredQuantity: item.required_qty,
  receivedQuantity: item.received_qty,
  bookedQuantity: item.booked_qty || 0,
  urgency: item.urgency || "medium",
});

// --- API МЕТОДЫ ---

// 1. Авторизация
export async function login(
  email: string,
  password: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login error");
  }
  // Tokens are set as cookies by backend
}

// 2. Регистрация (НОВОЕ)
export async function register(
  email: string,
  phone: string,
  password: string,
  fullName: string,
  role: "volunteer" | "employee",
  institutionId: number | null // null для волонтеров
): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        phone,
        password,
        full_name: fullName,
        role: role,
        institution_id: institutionId,
      }),
    });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Register error");
  }
  // Backend returns { message: "verification_required", email } — no tokens yet
}

// 2b. Подтверждение OTP-кода
export async function confirmOTP(
  receiver: string,
  otp: string
): Promise<TokenResponse> {
  const res = await fetchWithAuth(`${API_BASE_URL}/confirm_otp`, {
    method: "POST",
    body: JSON.stringify({ receiver, otp }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Неверный код");
  }

  const json: ApiResponse<TokenResponse> = await res.json();
  return json.data;
}

// 3. Учреждения
export async function fetchInstitutions(filters?: {
  search?: string;
  type?: string;
  sort?: string; // 'needs_desc' | 'distance'
  lat?: number;
  lng?: number;
}): Promise<Institution[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.type && filters.type !== "all") {
      params.append("type", filters.type);
    }
    if (filters?.sort) params.append("sort", filters.sort);
    if (filters?.lat !== undefined) params.append("lat", filters.lat.toString());
    if (filters?.lng !== undefined) params.append("lng", filters.lng.toString());

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

// Фильтры для нужд
export interface NeedsFilters {
  name?: string;
  urgency?: string;
  is_done?: boolean;
  order_by?: string; // 'date_asc' | 'urgency' | default (date_desc)
}

export async function fetchNeedsByInstitution(
  institutionId: string,
  filters?: NeedsFilters
): Promise<Need[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.name) params.append("name", filters.name);
    if (filters?.urgency) params.append("urgency", filters.urgency);
    if (filters?.is_done !== undefined) params.append("is_done", filters.is_done.toString());
    if (filters?.order_by) params.append("order_by", filters.order_by);

    const res = await fetch(
      `${API_BASE_URL}/institutions/${institutionId}/needs?${params.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Ошибка загрузки нужд");
    const json: ApiResponse<BackendNeed[]> = await res.json();
    if (!json.data) return [];
    return json.data.map(mapNeed);
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
export async function createNeed(data: Record<string, unknown>) {
  const res = await fetchWithAuth(`${API_BASE_URL}/needs`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка создания нужды");
  return res.json();
}

export async function deleteNeed(id: string) {
  const res = await fetchWithAuth(`${API_BASE_URL}/needs/${id}`, {
    method: "DELETE",
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
  const res = await fetchWithAuth(`${API_BASE_URL}/me`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить профиль");
  }

  const json = await res.json();
  return json.data;
}

// 6. Получение нужды по ID
export async function fetchNeedById(id: string): Promise<Need | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/needs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: ApiResponse<BackendNeed> = await res.json();
    if (!json.data) return null;
    return mapNeed(json.data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 7. Обновление нужды
export async function updateNeed(id: string, data: Partial<{
  name: string;
  unit: string;
  required_qty: number;
  received_qty: number;
  urgency: string;
}>) {
  const res = await fetchWithAuth(`${API_BASE_URL}/needs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка обновления нужды");
  return res.json();
}

// 8. Бронирование (Я привезу)
export async function createBooking(
  needId: number,
  quantity: number,
  note?: string
): Promise<{ id: number }> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings`, {
    method: "POST",
    body: JSON.stringify({
      need_id: needId,
      quantity: quantity,
      note: note || "",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Ошибка бронирования" }));
    throw new Error(errorData.message || "Ошибка бронирования");
  }

  const json: ApiResponse<{ id: number }> = await res.json();
  return json.data;
}

// 9. Мои бронирования (для волонтера)
export async function fetchMyBookings(): Promise<Record<string, unknown>[]> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/my`);
  if (!res.ok) throw new Error("Ошибка загрузки обещаний");
  const json: ApiResponse<Record<string, unknown>[]> = await res.json();
  return json.data || [];
}

export async function cancelMyBooking(bookingId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/my/${bookingId}/cancel`, {
    method: "PUT",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Ошибка отмены" }));
    throw new Error(errorData.message || "Ошибка отмены");
  }
}

export async function updateMyBooking(bookingId: number, quantity: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/my/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Ошибка обновления" }));
    throw new Error(errorData.message || "Ошибка обновления");
  }
}

// 10. Booking management (для менеджера)
export async function fetchInstitutionBookings(institutionId: number | string): Promise<Record<string, unknown>[]> {
  const res = await fetchWithAuth(`${API_BASE_URL}/institutions/${institutionId}/bookings`);
  if (!res.ok) throw new Error("Ошибка загрузки бронирований");
  const json: ApiResponse<Record<string, unknown>[]> = await res.json();
  return json.data || [];
}

export async function approveBooking(bookingId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/${bookingId}/approve`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Ошибка подтверждения");
}

export async function rejectBooking(bookingId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/${bookingId}/reject`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Ошибка отклонения");
}

export async function completeBooking(bookingId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/bookings/${bookingId}/complete`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Ошибка завершения");
}

// 10. Публичная статистика
export async function fetchStats(): Promise<{ closed_needs: number; people_helped: number; institutions_count: number }> {
  const res = await fetch(`${API_BASE_URL}/stats`);
  if (!res.ok) throw new Error("Ошибка загрузки статистики");
  const json: ApiResponse<{ closed_needs: number; people_helped: number; institutions_count: number }> = await res.json();
  return json.data;
}

// 11. События (Events)
export async function fetchEvents(): Promise<Record<string, unknown>[]> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events`);
  if (!res.ok) throw new Error("Ошибка загрузки событий");
  const json: ApiResponse<Record<string, unknown>[]> = await res.json();
  return json.data || [];
}

export async function createEvent(data: {
  title: string;
  description: string;
  event_date: string;
  institution_id: number;
}): Promise<{ id: number }> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка создания события");
  const json: ApiResponse<{ id: number }> = await res.json();
  return json.data;
}

export async function joinEvent(eventId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events/${eventId}/join`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Ошибка записи на событие");
}

export async function leaveEvent(eventId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events/${eventId}/leave`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Ошибка отмены записи");
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  event_date: string;
  institution_id: number;
  institution_name: string;
  creator_name: string;
  participants_count: number;
  is_joined: boolean;
  status: string;
}

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  type: string;
  experience: string;
  workload: string;
  is_active: boolean;
}

export async function fetchVacancies(): Promise<Vacancy[]> {
  const res = await fetch(`${API_BASE_URL}/vacancies`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Fetch vacancies error');
  const json: ApiResponse<Vacancy[]> = await res.json();
  return json.data;
}

export interface TeamMember {
  id: number;
  full_name: string;
  role: string;
  photo_url: string | null;
  quote: string | null;
  telegram: string;
  linkedin: string;
  sort_order: number;
  is_active: boolean;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${API_BASE_URL}/team`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Fetch team members error');
  const json: ApiResponse<TeamMember[]> = await res.json();
  return json.data;
}

export async function fetchTeamMemberById(id: number): Promise<TeamMember> {
  const res = await fetch(`${API_BASE_URL}/team/${id}`);
  if (!res.ok) throw new Error('Fetch team member error');
  const json: ApiResponse<TeamMember> = await res.json();
  return json.data;
}

export async function fetchVacancyById(id: number): Promise<Vacancy> {
  const res = await fetch(`${API_BASE_URL}/vacancies/${id}`);
  if (!res.ok) throw new Error('Fetch vacancy error');
  const json: ApiResponse<Vacancy> = await res.json();
  return json.data;
}

// --- EVENT MODERATION ---
export async function fetchInstitutionEvents(institutionId: number | string): Promise<EventItem[]> {
  const res = await fetchWithAuth(`${API_BASE_URL}/institutions/${institutionId}/events`, {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) {
    const errorStr = await res.text();
    throw new Error(errorStr || 'Fetch institution events error');
  }
  const json: ApiResponse<EventItem[]> = await res.json();
  return json.data;
}

export async function approveEvent(id: number | string): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events/${id}/approve`, { method: 'PUT' });
  if (!res.ok) throw new Error('Approve event error');
}

export async function rejectEvent(id: number | string): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE_URL}/events/${id}/reject`, { method: 'PUT' });
  if (!res.ok) throw new Error('Reject event error');
}
