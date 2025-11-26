'use client';
import { useState } from 'react';
import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { Input } from '@/components/ui/Input';
import { Search, Filter } from 'lucide-react';

// Мок-данные
const MOCK_INSTITUTIONS: Institution[] = [
  { id: '1', name: 'Дом-интернат "Навруз"', city: 'Душанбе', address: '', type: 'Children', contactPhone: '', contactEmail: '', needsCount: 42, lastUpdated: '', needs: [] },
  { id: '2', name: 'Дом престарелых "Отрада"', city: 'Худжанд', address: '', type: 'Elderly', contactPhone: '', contactEmail: '', needsCount: 18, lastUpdated: '', needs: [] },
  { id: '3', name: 'Центр "Умед"', city: 'Вахдат', address: '', type: 'Disabled', contactPhone: '', contactEmail: '', needsCount: 5, lastUpdated: '', needs: [] },
  { id: '4', name: 'Детский дом №1', city: 'Душанбе', address: '', type: 'Children', contactPhone: '', contactEmail: '', needsCount: 12, lastUpdated: '', needs: [] },
];

export default function InstitutionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-[#f7f9fe] min-h-screen pb-24">
      
      {/* Заголовок и Поиск */}
      <section className="bg-white pt-12 pb-16 shadow-sm rounded-b-[3rem] mb-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#763f97]">Кому нужна помощь</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Выберите учреждение из списка. Вы можете использовать поиск по названию или городу, чтобы найти тех, кто находится рядом с вами.
            </p>
            
            {/* Панель поиска */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
              <div className="relative flex-grow">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  className="pl-12 h-14 text-lg rounded-full border-gray-200 bg-[#f7f9fe] focus:bg-white shadow-inner focus:ring-2 focus:ring-[#763f97] focus:border-transparent transition-all" 
                  placeholder="Найти детский дом, интернат..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative shrink-0">
                 <select className="h-14 pl-6 pr-12 rounded-full border-gray-200 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-[#763f97] focus:border-transparent cursor-pointer appearance-none font-semibold transition-shadow hover:shadow-md outline-none">
                    <option value="all">Все учреждения</option>
                    <option value="children">Детские дома</option>
                    <option value="elderly">Дома престарелых</option>
                 </select>
                 <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-[#763f97] pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка учреждений */}
      <section className="container mx-auto max-w-7xl px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_INSTITUTIONS.map(inst => (
               <InstitutionCard key={inst.id} institution={inst} />
            ))}
         </div>
         
         {/* Пустое состояние (если ничего не найдено) */}
         {/* <div className="text-center py-20 opacity-50">
             <p className="text-xl font-bold text-[#304663]">По вашему запросу ничего не найдено</p>
         </div> */}
      </section>
    </div>
  )
}