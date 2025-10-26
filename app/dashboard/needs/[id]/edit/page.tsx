'use client';

import { NeedForm } from '@/components/specific/NeedForm';
import { Need } from '@/types/project';

// Мок-данные для существующей нужды, которую мы "редактируем"
const MOCK_NEED_DETAIL: Need = {
  id: 'n4',
  name: 'Теплые носки (детские)',
  unit: 'пар',
  requiredQuantity: 100,
  receivedQuantity: 15,
};

const EditNeedPage = ({ params }: { params: { id: string } }) => {
  // В будущем здесь будет fetch-запрос к API для получения данных по params.id
  const needData = MOCK_NEED_DETAIL;

  const handleUpdateNeed = (data: any) => {
    // Здесь будет fetch-запрос к API (PUT /api/needs/{params.id})
    console.log(`Updating need ${params.id} with data:`, data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Передаем начальные данные в нашу универсальную форму */}
      <NeedForm initialData={needData} onSubmit={handleUpdateNeed} />
    </div>
  );
};

export default EditNeedPage;