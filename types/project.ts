// Главное хранилище типов для всего проекта

// Тип для отдельной нужды учреждения
export type Need = {
  id: string;
  name: string; // Например, "Мыло жидкое", "Носки теплые"
  unit: string; // Например, "шт.", "литр", "кг"
  requiredQuantity: number; // Требуемое количество
  receivedQuantity: number; // Количество, которое уже получено/обещано
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
  needsCount: number; // Общее количество активных нужд
  lastUpdated: string; // Дата последнего обновления списка (для публичного доверия)
  needs: Need[]; // Детальный список нужд
  activityHours?: string;
};

// Тип для пользователя/сотрудника (используется для авторизации)
export type User = {
  id: string;
  email: string;
  role: 'Employee' | 'SuperAdmin';
  institutionId?: string; // Привязка к учреждению, если не SuperAdmin
};
