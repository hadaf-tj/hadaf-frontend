'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { getProfile } from '@/lib/api';
import { User, Mail, Phone, Building } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return <div className="p-8 text-[#1e3a8a] font-bold">Загрузка настроек...</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#1e3a8a]">Настройки профиля</h1>
        <p className="text-gray-500 font-medium">
          Просмотр личной информации.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
         <form className="space-y-6">
            
            {/* Аватар (Заглушка) */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center border-2 border-blue-100">
                    <User size={40} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{user?.full_name}</h3>
                    <p className="text-sm text-gray-500">{user?.role === 'institution' ? 'Представитель учреждения' : 'Волонтер'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <User size={14}/> ФИО
                    </label>
                    <input 
                        type="text" 
                        value={user?.full_name || ''} 
                        disabled 
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Mail size={14}/> Email
                    </label>
                    <input 
                        type="email" 
                        value={user?.email || ''} 
                        disabled 
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Phone size={14}/> Телефон
                    </label>
                    <input 
                        type="text" 
                        value={user?.phone || 'Не указан'} 
                        disabled 
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Building size={14}/> Организация
                    </label>
                    <input 
                        type="text" 
                        value={user?.institution_id ? `ID Учреждения: ${user.institution_id}` : 'Не привязан'} 
                        disabled 
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button disabled className="opacity-50 cursor-not-allowed">
                    Сохранить изменения (Скоро)
                </Button>
            </div>

         </form>
      </div>
    </div>
  );
}