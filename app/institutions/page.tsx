'use client';

import { useState, useEffect } from 'react';
import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Loader2 } from 'lucide-react';
import { fetchInstitutions } from '@/lib/api'; // <-- Импортируем нашу функцию

export default function InstitutionsPage() {
  // Состояния для данных и загрузки
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Состояния фильтров
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // 1. Загружаем данные при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchInstitutions();
      setInstitutions(data);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // 2. Логика фильтрации (происходит на клиенте)
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = 
      inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inst.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' 
      ? true 
      : inst.type.toLowerCase() === selectedType.toLowerCase(); // Внимание: бэкенд может хранить 'Children', а value у нас 'children'

    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-[#f7f9fe] min-h-screen pb-24">
      
      {/* Заголовок и Поиск */}
      <section className="bg-white pt-12 pb-16 shadow-sm rounded-b-[3rem] mb-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a]">Кому нужна помощь</h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              Выберите учреждение из списка. Вы можете использовать поиск по названию или городу, чтобы найти тех, кто находится рядом с вами.
            </p>
            
            {/* Панель поиска */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
              <div className="relative flex-grow">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  className="pl-12 h-14 text-lg rounded-full border-gray-200 bg-[#f7f9fe] focus:bg-white shadow-inner focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all" 
                  placeholder="Найти детский дом, интернат..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative shrink-0">
                 <select 
                   className="h-14 pl-6 pr-12 rounded-full border-gray-200 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent cursor-pointer appearance-none font-semibold transition-shadow hover:shadow-md outline-none"
                   value={selectedType}
                   onChange={(e) => setSelectedType(e.target.value)}
                 >
                    <option value="all">Все учреждения</option>
                    <option value="Children">Детские дома</option> {/* Значения value должны совпадать с тем, что приходит с бэка, или логикой фильтра */}
                    <option value="Elderly">Дома престарелых</option>
                    <option value="Disabled">Спец. учреждения</option>
                 </select>
                 <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1e3a8a] pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка учреждений */}
      <section className="container mx-auto max-w-7xl px-4">
         {/* Состояние загрузки */}
         {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="h-10 w-10 text-[#1e3a8a] animate-spin mb-4" />
               <p className="text-gray-500 font-medium">Загружаем список добрых дел...</p>
            </div>
         ) : (
            <>
              {filteredInstitutions.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredInstitutions.map(inst => (
                       <InstitutionCard key={inst.id} institution={inst} />
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20 opacity-60">
                     <p className="text-xl font-bold text-[#304663]">Ничего не найдено</p>
                     <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
                 </div>
              )}
            </>
         )}
      </section>
    </div>
  )
}