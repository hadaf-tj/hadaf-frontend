'use client';

import { useEffect, useState } from 'react';
import { 
  Heart, 
  PackageCheck, 
  Clock, 
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { getProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
   const router = useRouter();
   const [user, setUser] = useState<{ full_name: string; role: string; email: string; phone?: string; institution_id?: number } | null>(null);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        try {
            const userData = await getProfile();
            setUser(userData);
        } catch (e) {
            console.error("Ошибка авторизации:", e);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [router]);

  if (loading) {
      return <div className="flex h-[50vh] items-center justify-center text-[#1e3a8a]"><Loader2 className="animate-spin" size={40}/></div>
  }
  if (!user) return null;

  return (
    <div className="space-y-8 max-w-5xl">
       
       {/* 1. Приветствие (РЕАЛЬНОЕ) */}
       <div>
         <h1 className="text-3xl font-black text-[#1e3a8a]">
            Здравствуйте, {user?.full_name}!
         </h1>
         <p className="text-gray-500 font-medium mt-1">
           Добро пожаловать в Hadaf
         </p>
       </div>

       {/* 2. Статистика (Пока заглушки, но честные) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-60">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                   <PackageCheck size={24} />
                </div>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">0</div>
             <div className="text-sm text-gray-400 font-bold uppercase">Закрытых нужд</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-60">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                   <Clock size={24} />
                </div>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">0</div>
             <div className="text-sm text-gray-400 font-bold uppercase">Активные обещания</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-60">
             <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                   <Heart size={24} />
                </div>
             </div>
             <div className="text-3xl font-black text-gray-900 mb-1">0 c.</div>
             <div className="text-sm text-gray-400 font-bold uppercase">Ваш вклад</div>
          </div>
       </div>

       {/* 3. Блок "Что делать дальше" — только для волонтёров */}
       {user?.role !== 'employee' && (
       <div className="bg-[#1e3a8a] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">С чего начать?</h3>
              <p className="text-white/80 mb-6 max-w-xl">
                  Выберите учреждение на карте или в списке, найдите актуальную нужду (продукты, вещи, лекарства) и нажмите «Я привезу».
              </p>
              <Link 
                href="/institutions" 
                className="inline-block bg-[#ffca63] text-[#1e3a8a] px-8 py-4 rounded-xl font-black hover:bg-white transition-all"
              >
                  Перейти к списку нужд
              </Link>
          </div>
          {/* Декор */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Heart size={200} />
          </div>
       </div>
       )}

    </div>
  );
}