'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { User, Building2, ArrowLeft, HeartHandshake, Check, Loader2 } from 'lucide-react';
import { register, fetchInstitutions } from '@/lib/api';
import { Institution } from '@/types/project';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'volunteer' | 'institution'>('volunteer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Поля формы
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>(''); 

  // 1. Загружаем список учреждений при старте
  useEffect(() => {
    const loadInstitutions = async () => {
        const data = await fetchInstitutions();
        setInstitutions(data);
    };
    loadInstitutions();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      
      // Определяем ID учреждения
      // Если роль institution - берем из селекта. Если volunteer - null.
      let instId: number | null = null;
      if (role === 'institution') {
          if (!selectedInstitutionId) {
              throw new Error("Пожалуйста, выберите ваше учреждение из списка");
          }
          instId = parseInt(selectedInstitutionId);
      }

      
      const data = await register(email, phone, password, fullName, role, instId);
      // Сохраняем токены
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);

      // Редирект
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка регистрации. Проверьте данные.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative font-sans">
      
      <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-[#1e3a8a] flex items-center gap-2 font-bold transition-colors">
        <ArrowLeft size={20} /> На главную
      </Link>

      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-900/20">
           <HeartHandshake size={28} />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Создание аккаунта</h1>
      </div>

      <div className="w-full max-w-[500px] bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
        
        {/* Выбор роли */}
        <div className="grid grid-cols-2 gap-3 mb-8">
            <button type="button" onClick={() => setRole('volunteer')} className={`relative overflow-hidden rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all ${role === 'volunteer' ? 'border-[#1e3a8a] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
               {role === 'volunteer' && <div className="absolute top-2 right-2 text-[#1e3a8a]"><Check size={16} /></div>}
               <User className={`mb-2 ${role === 'volunteer' ? 'text-[#1e3a8a]' : 'text-gray-400'}`} size={24} />
               <span className={`text-sm font-bold ${role === 'volunteer' ? 'text-[#1e3a8a]' : 'text-gray-600'}`}>Я волонтер</span>
            </button>
            <button type="button" onClick={() => setRole('institution')} className={`relative overflow-hidden rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all ${role === 'institution' ? 'border-[#1e3a8a] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
               {role === 'institution' && <div className="absolute top-2 right-2 text-[#1e3a8a]"><Check size={16} /></div>}
               <Building2 className={`mb-2 ${role === 'institution' ? 'text-[#1e3a8a]' : 'text-gray-400'}`} size={24} />
               <span className={`text-sm font-bold ${role === 'institution' ? 'text-[#1e3a8a]' : 'text-gray-600'}`}>Сотрудник</span>
            </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl text-center border border-red-100">{error}</div>}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Имя</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Фамилия</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900" />
              </div>
            </div>

            {/* ВЫБОР УЧРЕЖДЕНИЯ (ТОЛЬКО ДЛЯ СОТРУДНИКОВ) */}
            {role === 'institution' && (
               <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                 <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Выберите организацию</label>
                 <div className="relative">
                    <select 
                        value={selectedInstitutionId}
                        onChange={(e) => setSelectedInstitutionId(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                        <option value="">-- Выберите из списка --</option>
                        {institutions.map(inst => (
                            <option key={inst.id} value={inst.id}>
                                {inst.name} ({inst.city})
                            </option>
                        ))}
                    </select>
                    {/* Стрелочка для селекта */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                 </div>
                 <p className="text-[10px] text-gray-400 ml-1">
                    Вашей организации нет в списке? <a href="#" className="text-[#1e3a8a] hover:underline">Подайте заявку</a>
                 </p>
               </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@mail.com" required className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Телефон (опционально)</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+992..." className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900" />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold text-base rounded-xl mt-4 shadow-lg shadow-[#1e3a8a]/20 disabled:opacity-70">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Зарегистрироваться'}
            </Button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm font-medium">
            Уже есть аккаунт? <Link href="/login" className="text-[#1e3a8a] font-black hover:underline">Войти</Link>
          </p>
        </div>

      </div>
    </div>
  );
}