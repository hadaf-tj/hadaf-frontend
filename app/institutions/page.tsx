'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, Map, Loader2 } from 'lucide-react';
import { Institution } from '@/types/project';
import Link from 'next/link';
import { fetchInstitutions } from '@/lib/api'; // Импортируем функцию запроса

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'Children', label: 'Детям' },
  { id: 'Elderly', label: 'Пожилым' },
  { id: 'Disabled', label: 'Людям с ОВЗ' },
];

export default function InstitutionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 1. Состояние для реальных данных
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Загружаем данные при открытии страницы
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchInstitutions({
            search: searchQuery,
            type: activeCategory
        });
        setInstitutions(data);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить список учреждений');
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutId = setTimeout(() => {
        loadData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, searchQuery]);

  // 3. Фильтрация (работает уже с загруженными данными)
  const filteredData = institutions.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        
        {/* 1. COMPACT HERO & SEARCH */}
        <div className="bg-[#1e3a8a] pt-32 pb-12 rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                  Кому помочь?
                </h1>
                <p className="text-white/80 text-lg">
                  Выберите учреждение или человека, которому нужна поддержка
                </p>
              </div>
              
              {/* Переключатель Карта / Список */}
              <div className="hidden md:flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
                 <button className="px-4 py-2 bg-white text-[#1e3a8a] rounded-lg font-bold text-sm shadow-sm">Список</button>
                 <Link href="/map">
                 <button className="px-4 py-2 text-white/80 hover:text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                    <Map size={16} />
                    На карте
                 </button>
                 </Link>
              </div>
            </div>

            {/* Блок поиска и фильтров */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Найти по названию или городу..." 
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Фильтры по категориям */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 px-1 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      whitespace-nowrap px-6 h-12 rounded-xl font-bold transition-all text-sm
                      ${activeCategory === cat.id 
                        ? 'bg-[#1e3a8a] text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {cat.label}
                  </button>
                ))}
                
                <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 flex-shrink-0 border border-transparent hover:border-gray-200">
                   <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. СПИСОК (GRID) ИЛИ ЗАГРУЗКА */}
        <section className="py-12">
           <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
             
             {/* Состояние загрузки */}
             {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-[#1e3a8a]">
                    <Loader2 size={48} className="animate-spin mb-4" />
                    <p className="font-bold text-lg">Загружаем список учреждений...</p>
                </div>
             )}

             {/* Состояние ошибки */}
             {!isLoading && error && (
                <div className="text-center py-20">
                    <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
                </div>
             )}

             {/* Контент */}
             {!isLoading && !error && (
                <>
                    <div className="mb-6 text-gray-500 font-medium">
                        Найдено учреждений: <span className="text-gray-900 font-bold">{filteredData.length}</span>
                    </div>

                    {filteredData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredData.map((item) => (
                            <div key={item.id} className="h-full">
                                <InstitutionCard institution={item} />
                            </div>
                        ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ничего не найдено</h3>
                            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
                            <button 
                                onClick={() => {setActiveCategory('all'); setSearchQuery('')}}
                                className="mt-6 text-[#1e3a8a] font-bold hover:underline"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}

                    {/* Pagination / Load More (пока заглушка, если данных много) */}
                    {filteredData.length > 9 && (
                        <div className="mt-16 text-center">
                        <Button variant="outline" className="border-2 border-gray-200 text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] font-bold h-12 px-8 rounded-full">
                            Показать еще
                        </Button>
                        </div>
                    )}
                </>
             )}
           </div>
        </section>

      </div>
    </MainLayout>
  );
}