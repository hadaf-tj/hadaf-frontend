'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { NeedForm } from '@/components/specific/NeedForm';
import { Need } from '@/types/project';
import { fetchNeedById, updateNeed } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const EditNeedPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const router = useRouter();

  const [needData, setNeedData] = useState<Need | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadNeed = async () => {
      setIsLoading(true);
      try {
        const data = await fetchNeedById(resolvedParams.id);
        if (!data) {
          setError('Нужда не найдена');
        } else {
          setNeedData(data);
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    };
    loadNeed();
  }, [resolvedParams.id]);

  const handleUpdateNeed = async (data: { name?: string; unit?: string; requiredQuantity?: number; receivedQuantity?: number }) => {
    setIsSubmitting(true);
    try {
      await updateNeed(resolvedParams.id, {
        name: data.name,
        unit: data.unit,
        required_qty: data.requiredQuantity,
        received_qty: data.receivedQuantity,
      });
      router.push('/dashboard/needs');
    } catch (err) {
      console.error(err);
      alert('Ошибка при обновлении нужды');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex justify-center py-20">
        <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
      </div>
    );
  }

  if (error || !needData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-red-500 font-medium">{error || 'Нужда не найдена'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <NeedForm
        initialData={needData}
        onSubmit={handleUpdateNeed}
      />
    </div>
  );
};

export default EditNeedPage;