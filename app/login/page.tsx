import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { HeartHandshake, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fe] px-4 py-12 relative">
       
       {/* Кнопка "На главную" */}
       <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#763f97] transition-colors font-bold">
          <ArrowLeft size={20} />
          На главную
       </Link>

       <div className="w-full max-w-md space-y-8">
          {/* Логотип над формой */}
          <div className="text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="w-20 h-20 bg-[#763f97] rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-[#763f97]/20 transform rotate-3">
                <HeartHandshake size={40} />
             </div>
             <h1 className="text-3xl font-extrabold text-[#304663]">Вход в систему</h1>
             <p className="text-gray-500 mt-3 text-lg">Для сотрудников учреждений</p>
          </div>

          <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
             <div className="h-2 bg-gradient-to-r from-[#763f97] to-[#9851c2]"></div>
             <CardHeader className="space-y-1 pb-2 pt-8 px-8">
                <CardTitle className="text-xl text-center text-[#304663]">Авторизация</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6 px-8 pb-8">
                <div className="space-y-2">
                   <Label htmlFor="email" className="text-gray-600 font-semibold">Email адрес</Label>
                   <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="h-12 rounded-xl border-gray-200 focus:border-[#763f97] focus:ring-[#763f97] bg-[#f7f9fe]" 
                   />
                </div>
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-600 font-semibold">Пароль</Label>
                      <Link href="#" className="text-xs font-bold text-[#763f97] hover:text-[#9851c2] hover:underline">
                         Забыли пароль?
                      </Link>
                   </div>
                   <Input 
                      id="password" 
                      type="password" 
                      className="h-12 rounded-xl border-gray-200 focus:border-[#763f97] focus:ring-[#763f97] bg-[#f7f9fe] text-lg tracking-widest" 
                   />
                </div>
             </CardContent>
             <CardFooter className="px-8 pb-8 pt-0">
                <Button className="w-full bg-[#763f97] hover:bg-[#5d317a] h-14 text-lg font-bold rounded-xl shadow-lg shadow-[#763f97]/20 transition-all hover:-translate-y-0.5">
                   Войти
                </Button>
             </CardFooter>
          </Card>
          
          <p className="text-center text-sm text-gray-500">
             Возникли проблемы? <span className="text-[#763f97] font-bold cursor-pointer hover:underline">Напишите в поддержку</span>
          </p>
       </div>
    </div>
  )
}