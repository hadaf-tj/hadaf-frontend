// Главное хранилище типов для всего проекта

// Тип для отдельной нужды учреждения
export type Need = {
  id: string;
  name: string;
  unit: string;
  requiredQuantity: number;
  receivedQuantity: number;
  bookedQuantity: number;
  urgency: string;
};

// Тип для учреждения (детский дом, дом престарелых)
export type Institution = {
  id: string;
  name: string;
  city: string;
  address: string;
  type: 'Children' | 'Elderly';
  contactPhone: string;
  contactEmail: string;
  needsCount: number;
  lastUpdated: string;
  needs: Need[];
  activityHours?: string;
  latitude?: number;
  longitude?: number;
};

// Тип для пользователя/сотрудника (используется для авторизации)
export type User = {
  id: string;
  email: string;
  role: 'employee' | 'super_admin' | 'volunteer';
  institutionId?: string; // Привязка к учреждению, если не SuperAdmin
  is_approved?: boolean;
};
