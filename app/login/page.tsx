'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { HeartHandshake, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Бэкенд ждет телефон в поле "login", но у нас в форме Email.
      // Для теста используем введенное значение как логин.
      const data = await login(formData.email, formData.password);
      
      // Сохраняем токены
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('isLoggedIn', 'true');
      
      // В реальном проекте тут нужно декодировать JWT, чтобы получить ID учреждения
      // Пока просто перенаправим
      router.push('/dashboard/needs'); 
    } catch (err: any) {
      setError('Неверный логин или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fe] px-4 py-12 relative">
       <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#763f97] transition-colors font-bold">
          <ArrowLeft size={20} /> На главную
       </Link>

       <div className="w-full max-w-md space-y-8">
          <div className="text-center flex flex-col items-center">
             <div className="w-20 h-20 bg-[#763f97] rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-[#763f97]/20 transform rotate-3">
                <HeartHandshake size={40} />
             </div>
             <h1 className="text-3xl font-extrabold text-[#304663]">Вход в систему</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
               <div className="h-2 bg-gradient-to-r from-[#763f97] to-[#9851c2]"></div>
               <CardHeader className="space-y-1 pb-2 pt-8 px-8">
                  <CardTitle className="text-xl text-center text-[#304663]">Авторизация</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6 px-8 pb-8">
                  {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
                  
                  <div className="space-y-2">
                     <Label htmlFor="email">Телефон (Логин)</Label>
                     <Input 
                       id="email" 
                       placeholder="+992..." 
                       className="h-12 rounded-xl bg-[#f7f9fe]"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Пароль</Label>
                     <Input 
                       id="password" 
                       type="password" 
                       className="h-12 rounded-xl bg-[#f7f9fe]"
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       required
                     />
                  </div>
               </CardContent>
               <CardFooter className="px-8 pb-8 pt-0">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#763f97] hover:bg-[#5d317a] h-14 text-lg font-bold rounded-xl"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Войти'}
                  </Button>
               </CardFooter>
            </Card>
          </form>
       </div>
    </div>
  )
}