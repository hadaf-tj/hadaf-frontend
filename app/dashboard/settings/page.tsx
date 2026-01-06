/* FILE: app/dashboard/settings/page.tsx */
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-[#1e3a8a]">Настройки профиля</h1>
        <p className="text-gray-500 font-medium">
          Управляйте личной информацией и безопасностью
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
         {/* ЛЕВАЯ КОЛОНКА: Аватар */}
         <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
               <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-4 relative overflow-hidden border-4 border-white shadow-lg">
                  {/* Заглушка аватара */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                     <User size={48} />
                  </div>
               </div>
               <Button variant="outline" size="sm" className="border-2 border-gray-200 font-bold text-gray-600 bg-transparent">
                  Изменить фото
               </Button>
               <p className="text-xs text-gray-400 mt-4">
                  JPG, GIF или PNG. Макс 1MB.
               </p>
            </div>
         </div>

         {/* ПРАВАЯ КОЛОНКА: Формы */}
         <div className="md:col-span-2 space-y-6">
            
            {/* Основная инфо */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-black text-gray-900 mb-6">Личные данные</h3>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Имя</label>
                        <input type="text" defaultValue="Алишер" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Фамилия</label>
                        <input type="text" defaultValue="Валиев" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                  </div>
                  
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input type="email" defaultValue="alisher@example.com" className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase">Телефон</label>
                     <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input type="text" defaultValue="+992 900 00 00 00" className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Безопасность */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-black text-gray-900 mb-6">Изменить пароль</h3>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500 uppercase">Текущий пароль</label>
                     <input type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Новый пароль</label>
                        <input type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Повторите пароль</label>
                        <input type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-end pt-4">
               <Button className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 px-8 rounded-xl shadow-lg shadow-[#1e3a8a]/20">
                  <Save size={18} className="mr-2" />
                  Сохранить изменения
               </Button>
            </div>

         </div>
      </div>
    </div>
  );
}