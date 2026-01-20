'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Package, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AddNeedModal from '@/components/specific/AddNeedModal';
import { getProfile, fetchInstitutionById, deleteNeed } from '@/lib/api';
import { Need } from '@/types/project';

export default function InstitutionDashboard() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загрузка данных
  const loadData = async () => {
    setLoading(true);
    try {
        // 1. Кто я?
        const user = await getProfile();
        
        if (!user.institution_id) {
            alert("Вы не привязаны к учреждению!");
            setLoading(false);
            return;
        }
        setInstitutionId(user.institution_id);

        // 2. Загружаем нужды моего учреждения
        const inst = await fetchInstitutionById(String(user.institution_id));
        if (inst) {
            setNeeds(inst.needs);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Удаление
  const handleDelete = async (id: string) => {
      if(!confirm("Удалить эту запись?")) return;
      try {
          await deleteNeed(id);
          // Обновляем список локально
          setNeeds(prev => prev.filter(n => n.id !== id));
      } catch (e) {
          console.error(e);
          alert("Не удалось удалить");
      }
  };

  if (loading) {
      return <div className="flex h-screen items-center justify-center text-[#1e3a8a]"><Loader2 className="animate-spin" size={40}/></div>;
  }

  // Считаем статистику
  const activeCount = needs.filter(n => n.receivedQuantity < n.requiredQuantity).length;
  const completedCount = needs.length - activeCount;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#1e3a8a]">Управление нуждами</h1>
           <p className="text-gray-500 font-medium">
             Публикуйте то, что действительно необходимо вашим подопечным.
           </p>
        </div>
        <Button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#1e3a8a]/20 flex items-center gap-2"
        >
           <Plus size={20} />
           Добавить нужду
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">{activeCount}</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Активных сборов</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
               <Clock size={24} />
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">{completedCount}</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Завершено</div>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Наименование</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Прогресс</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Статус</th>
                     <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Действия</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {needs.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">Список пуст</td></tr>
                  ) : needs.map((item) => {
                      const percent = Math.min(100, Math.round((item.receivedQuantity / item.requiredQuantity) * 100));
                      const isDone = item.receivedQuantity >= item.requiredQuantity;
                      
                      return (
                         <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors group">
                            {/* Название */}
                            <td className="py-5 px-6">
                               <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-[#1e3a8a]'}`}>
                                     {isDone ? <CheckCircle2 size={20}/> : <Package size={20}/>}
                                  </div>
                                  <div>
                                     <div className="font-bold text-gray-900">{item.name}</div>
                                     <div className="text-xs text-gray-400 font-medium">
                                        {item.requiredQuantity} {item.unit}
                                     </div>
                                  </div>
                               </div>
                            </td>

                            {/* Прогресс */}
                            <td className="py-5 px-6 w-1/4">
                               <div className="flex justify-between text-xs font-bold mb-1.5">
                                  <span className="text-gray-500">{item.receivedQuantity} из {item.requiredQuantity}</span>
                                  <span className="text-[#1e3a8a]">{percent}%</span>
                               </div>
                               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${isDone ? 'bg-green-500' : 'bg-[#1e3a8a]'}`} style={{ width: `${percent}%` }}></div>
                               </div>
                            </td>

                            {/* Статус */}
                            <td className="py-5 px-6 text-center">
                               {isDone ? (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase">
                                     <CheckCircle2 size={12} /> Закрыт
                                  </span>
                               ) : (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase">
                                     Активен
                                  </span>
                               )}
                            </td>

                            {/* Действия */}
                            <td className="py-5 px-6 text-right">
                               <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                                     <Trash2 size={18} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* MODAL */}
      <AddNeedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        institutionId={institutionId || 1} 
        onSuccess={loadData} 
      />

    </div>
  );
}