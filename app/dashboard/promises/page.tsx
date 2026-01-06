/* FILE: app/dashboard/promises/page.tsx */
import { 
  Package, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge'; // Предполагаем, что Badge у нас есть, или используем span с классами

export default function PromisesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-black text-[#1e3a8a]">Мои обещания</h1>
        <p className="text-gray-500 font-medium">
          Список вещей, которые вы планируете передать учреждениям.
        </p>
      </div>

      {/* Список карточек */}
      <div className="space-y-4">
        
        {/* КАРТОЧКА 1: Активная (Срочная) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-l-4 border-l-orange-400 border-gray-100 flex flex-col md:flex-row gap-6">
           <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                 <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">В процессе</Badge>
                 <span className="flex items-center text-xs font-bold text-orange-500 uppercase tracking-wide">
                    <Clock size={14} className="mr-1" />
                    Ждут до 15 января
                 </span>
              </div>
              
              <h3 className="text-xl font-black text-gray-900">
                 Зимняя обувь (5 пар)
              </h3>
              
              <div className="flex items-start gap-3 text-gray-600">
                 <MapPin className="shrink-0 mt-0.5" size={18} />
                 <div>
                    <span className="font-bold block text-gray-900">Дом-интернат "Навруз"</span>
                    <span className="text-sm">г. Душанбе, ул. Сомони 45</span>
                 </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg w-fit">
                 <Phone size={14} />
                 Контакт: +992 900 12 34 56 (Директор: Мадина)
              </div>
           </div>

           <div className="flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[180px]">
              <Button className="w-full bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold">
                 <CheckCircle2 size={18} className="mr-2" />
                 Я отвез
              </Button>
              <Button variant="outline" className="w-full border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold border-2 bg-transparent">
                 Отменить
              </Button>
           </div>
        </div>

        {/* КАРТОЧКА 2: Обычная */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
           <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                 <Badge className="bg-blue-100 text-[#1e3a8a] hover:bg-blue-200">Запланировано</Badge>
                 <span className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wide">
                    <Calendar size={14} className="mr-1" />
                    До 20 января
                 </span>
              </div>
              
              <h3 className="text-xl font-black text-gray-900">
                 Медикаменты (Список №4)
              </h3>
              
              <div className="flex items-start gap-3 text-gray-600">
                 <MapPin className="shrink-0 mt-0.5" size={18} />
                 <div>
                    <span className="font-bold block text-gray-900">Дом престарелых "Отрада"</span>
                    <span className="text-sm">г. Худжанд</span>
                 </div>
              </div>
           </div>

           <div className="flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[180px]">
              <Button className="w-full bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold">
                 <CheckCircle2 size={18} className="mr-2" />
                 Я отвез
              </Button>
              <Button variant="outline" className="w-full border-gray-200 text-gray-500 hover:bg-gray-50 font-bold border-2 bg-transparent">
                 Подробнее
              </Button>
           </div>
        </div>

        {/* КАРТОЧКА 3: Завершенная (Для истории) */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
           <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                 <Badge className="bg-green-100 text-green-700">Выполнено</Badge>
                 <span className="text-xs font-bold text-gray-400">12 дек 2024</span>
              </div>
              <h3 className="text-xl font-bold text-gray-700 line-through">
                 Мешок муки (50кг)
              </h3>
              <div className="text-sm text-gray-500">
                 Центр "Умед"
              </div>
           </div>
           <div className="flex items-center justify-center min-w-[180px]">
              <div className="text-green-600 font-bold flex items-center gap-2">
                 <CheckCircle2 size={24} />
                 Спасибо!
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}