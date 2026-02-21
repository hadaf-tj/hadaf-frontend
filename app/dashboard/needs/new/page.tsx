'use client';

import { NeedForm } from '@/components/specific/NeedForm';
import { createNeed } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewNeedPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleCreateNeed = async (data: { name?: string; unit?: string; requiredQuantity?: number; receivedQuantity?: number }) => {
    try {
      // ВАЖНО: В реальном приложении ID учреждения берется из токена на бэкенде или из контекста юзера.
      // Поскольку у нас сейчас токен с ролью employee учреждения ID=1 (Навруз),
      // Мы передаем ID учреждения вручную или бэкенд сам определит по юзеру.
      // Посмотрим модель бэкенда: он ждет institution_id в JSON.
      
      const payload = {
        institution_id: 1, // Хардкодим ID учреждения "Навруз" для демо (пользователь админ Навруза)
        category_id: null,
        name: data.name,
        description: data.name, // Используем имя как описание, если нет поля
        unit: data.unit,
        required_qty: Number(data.requiredQuantity),
        received_qty: Number(data.receivedQuantity),
        urgency: 'medium' // Дефолтное значение
      };

      await createNeed(payload);
      router.push('/dashboard/needs'); // Возвращаемся в список
    } catch (err) {
      console.error(err);
      setError('Не удалось создать нужду. Проверьте авторизацию.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a8a]">Добавить новую потребность</h2>
      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
      <NeedForm onSubmit={handleCreateNeed} />
    </div>
  );
};

export default NewNeedPage;