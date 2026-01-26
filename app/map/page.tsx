/* FILE: app/map/page.tsx */
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, List, Map as MapIcon, Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Мок-данные (те же, что и раньше, но с координатами)
const MOCK_LOCATIONS = [
  { id: '1', name: 'Дом-интернат "Навруз"', type: 'Children', lat: 38.57, lng: 68.75, needsCount: 42, address: 'Душанбе' },
  { id: '2', name: 'Дом престарелых "Отрада"', type: 'Elderly', lat: 38.53, lng: 68.80, needsCount: 18, address: 'Худжанд' },
  { id: '3', name: 'Центр "Умед"', type: 'Disabled', lat: 38.56, lng: 68.79, needsCount: 5, address: 'Вахдат' },
  { id: '4', name: 'Интернат №1', type: 'Children', lat: 38.59, lng: 68.73, needsCount: 12, address: 'Куляб' },
  { id: '5', name: 'Центр ветеранов', type: 'Elderly', lat: 38.52, lng: 68.76, needsCount: 25, address: 'Душанбе' },
];

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'Children', label: 'Детям' },
  { id: 'Elderly', label: 'Пожилым' },
  { id: 'Disabled', label: 'Людям с ОВЗ' },
];

const MapPage = () => {
  // Динамический импорт карты (обязательно для Leaflet в Next.js)
  const MapView = useMemo(() => dynamic(() => import('@/components/specific/MapView'), {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#f7f9fe] flex flex-col items-center justify-center text-[#869cb9]">
        <Loader2 size={40} className="mb-2 animate-spin text-[#1e3a8a]" />
        <p className="font-medium animate-pulse">Загрузка карты...</p>
      </div>
    ),
  }), []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Логика фильтрации
  const filteredLocations = MOCK_LOCATIONS.filter(loc => {
    const matchesCategory = activeCategory === 'all' || loc.type === activeCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">

        {/* 1. HERO HEADER (Точно такой же, как в Institutions) */}
        <div className="bg-[#1e3a8a] pt-32 pb-12 rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                  Карта помощи
                </h1>
                <p className="text-white/80 text-lg">
                  Найдите ближайшее учреждение и привезите помощь лично
                </p>
              </div>

              {/* Переключатель Карта / Список */}
              <div className="hidden md:flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
                <Link href="/institutions">
                  <button className="px-4 py-2 text-white/80 hover:text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                    <List size={16} />
                    Список
                  </button>
                </Link>
                <button className="px-4 py-2 bg-white text-[#1e3a8a] rounded-lg font-bold text-sm shadow-sm flex items-center gap-2">
                  <MapIcon size={16} />
                  На карте
                </button>
              </div>
            </div>

            {/* Блок поиска и фильтров (Нависает над контентом) */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 relative z-20">
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

                {/* Кнопка доп. фильтров */}
                <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 flex-shrink-0 border border-transparent hover:border-gray-200">
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ОБЛАСТЬ КАРТЫ */}
        <section className="py-12 -mt-4 relative z-10">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">

            {/* Счетчик */}
            <div className="mb-4 text-gray-500 font-medium pl-2">
              Найдено на карте: <span className="text-gray-900 font-bold">{filteredLocations.length}</span>
            </div>

            {/* Контейнер карты */}
            <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="h-[65vh] w-full rounded-[2rem] overflow-hidden bg-gray-50 relative z-0">
                <MapView locations={filteredLocations} />
              </div>
            </div>

            {/* Подсказка */}
            <div className="mt-6 text-center text-gray-400 text-sm font-medium">
              Нажмите на метку, чтобы увидеть подробности и перейти к странице помощи
            </div>

          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default MapPage;