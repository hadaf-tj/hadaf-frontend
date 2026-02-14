/* FILE: components/specific/PledgeModal.tsx */
'use client';

import { useState } from 'react';
import { X, Gift, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createBooking } from '@/lib/api';

// Тип данных для нужды, которую мы передаем в модалку
export interface NeedItem {
  id: string | number;
  title: string;
  total: number;
  collected: number;
  measure?: string; // шт, кг, литры и т.д.
}

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  need: NeedItem;
  institutionName: string;
  onSuccess?: () => void;
}

export default function PledgeModal({ isOpen, onClose, need, institutionName, onSuccess }: PledgeModalProps) {
  const [amount, setAmount] = useState<number>(1);
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const remaining = need.total - need.collected;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (amount <= 0 || amount > remaining) {
      setError('Неверное количество');
      return;
    }

    setIsSubmitting(true);
    try {
      const needId = typeof need.id === 'string' ? parseInt(need.id, 10) : need.id;
      if (isNaN(needId)) {
        setError('Некорректный ID нужды');
        return;
      }

      const note = date ? `Планируемая дата визита: ${date}` : '';
      await createBooking(needId, amount, note);

      alert('Спасибо! Ваше бронирование отправлено.');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-[100] bg-[#1e3a8a]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header с орнаментом */}
        <div className="relative bg-[#1e3a8a] p-6 text-white">
           <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0 bg-[url('/ornament.png')] bg-repeat mix-blend-overlay"></div>
           </div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1"
           >
             <X size={24} />
           </button>
           <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift size={24} />
              </div>
              <div>
                 <h3 className="font-black text-lg leading-tight">Я привезу помощь</h3>
                 <p className="text-white/80 text-sm">{institutionName}</p>
              </div>
           </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
           
           {/* Информация о нужде */}
           <div>
              <h4 className="text-xl font-black text-gray-900 mb-1">{need.title}</h4>
              <p className="text-gray-500 font-medium text-sm">
                Осталось собрать: <span className="text-[#1e3a8a] font-bold">{remaining} {need.measure || 'шт.'}</span>
              </p>
           </div>

           {/* Ошибка */}
           {error && (
             <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl">{error}</div>
           )}

           {/* Input: Количество */}
           <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Сколько вы привезете?</label>
              <div className="flex items-center gap-4">
                 <input 
                   type="number" 
                   min="1" 
                   max={remaining}
                   value={amount}
                   onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                   className="w-full h-14 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-black text-2xl text-[#1e3a8a] text-center"
                 />
                 <span className="text-gray-500 font-bold text-lg shrink-0">
                    из {remaining} {need.measure || 'шт.'}
                 </span>
              </div>
              {amount > remaining && (
                  <p className="text-red-500 text-sm font-bold mt-1">Нельзя указать больше, чем требуется.</p>
              )}
           </div>

           {/* Input: Дата */}
           <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Примерная дата визита</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
                />
              </div>
              <p className="text-xs text-gray-400 ml-1">
                 Это поможет учреждению планировать поступления.
              </p>
           </div>

           {/* Footer buttons */}
           <div className="pt-4 flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-14 rounded-xl border-2 font-bold border-gray-100 text-gray-500 hover:bg-gray-50 bg-transparent">
                 Отмена
              </Button>
              <Button 
                type="submit" 
                disabled={amount <= 0 || amount > remaining || !date || isSubmitting}
                className="flex-1 h-14 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold text-lg shadow-xl shadow-[#1e3a8a]/20 disabled:opacity-50 disabled:shadow-none"
              >
                 {isSubmitting ? (
                   <span className="flex items-center gap-2">
                     <Loader2 size={20} className="animate-spin" />
                     Отправка...
                   </span>
                 ) : (
                   'Подтвердить'
                 )}
              </Button>
           </div>

        </form>
      </div>
    </div>
  );
}