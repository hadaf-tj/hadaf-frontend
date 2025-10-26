'use client'; // Так как обработка формы - клиентская логика

import { NeedForm } from '@/components/specific/NeedForm';

const NewNeedPage = () => {
  const handleCreateNeed = (data: any) => {
    // В будущем здесь будет fetch-запрос к API (POST /api/needs)
    console.log('Creating a new need:', data);
    // После успешного создания можно перенаправить пользователя
    // router.push('/dashboard/needs');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <NeedForm onSubmit={handleCreateNeed} />
    </div>
  );
};

export default NewNeedPage;