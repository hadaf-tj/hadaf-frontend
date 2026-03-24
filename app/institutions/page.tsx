'use client';

import { useState, useEffect } from 'react';

import MainLayout from '@/components/layout/MainLayout';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { Button } from '@/components/ui/Button';
import { Search, Map, Loader2, ArrowUpDown, Navigation, ChevronDown, MapPin } from 'lucide-react';
import { Institution } from '@/types/project';
import Link from 'next/link';
import { fetchInstitutions } from '@/lib/api';

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'Children', label: 'Детям' },
  { id: 'Elderly', label: 'Пожилым' },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'needs_desc', label: 'По количеству нужд' },
  { id: 'distance', label: 'Ближайшие ко мне' },
];

export default function InstitutionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [cityFilter, setCityFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  // Состояние для реальных данных
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Функция запроса геолокации
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Геолокация не поддерживается вашим браузером');
      return;
    }

    setIsGeoLoading(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setSortBy('distance');
        setIsGeoLoading(false);
      },
      (err) => {
        setGeoError('Не удалось получить местоположение');
        setIsGeoLoading(false);
        console.error(err);
      }
    );
  };

  // Загружаем данные при изменении фильтров
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchInstitutions({
          search: searchQuery,
          type: activeCategory,
          sort: sortBy !== 'default' ? sortBy : undefined,
          lat: sortBy === 'distance' ? userLocation?.lat : undefined,
          lng: sortBy === 'distance' ? userLocation?.lng : undefined,
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
  }, [activeCategory, searchQuery, sortBy, userLocation]);

  // Получаем уникальные города из загруженных данных
  const uniqueCities = Array.from(new Set(institutions.map(i => i.city))).sort();

  // Фильтрация (работает уже с загруженными данными)
  const filteredData = institutions.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === 'all' || item.city === cityFilter;
    return matchesCategory && matchesSearch && matchesCity;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">

        {/* 1. COMPACT HERO & SEARCH */}
        <div className="bg-[#1e3a8a] pt-24 sm:pt-32 pb-8 sm:pb-12 rounded-b-[2rem] sm:rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3">
                  Кому помочь?
                </h1>
                <p className="text-white/80 text-base sm:text-lg">
                  Выберите учреждение или человека, которому нужна поддержка
                </p>
              </div>

              {/* Переключатель Карта / Список */}
              <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
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
            <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Найти по названию или городу..."
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-12 pr-4 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all font-medium text-sm sm:text-base"
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
                      whitespace-nowrap px-4 sm:px-6 h-11 sm:h-12 rounded-lg sm:rounded-xl font-bold transition-all text-sm
                      ${activeCategory === cat.id
                        ? 'bg-[#1e3a8a] text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {cat.label}
                  </button>
                ))}

                {/* City filter */}
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="appearance-none h-11 sm:h-12 pl-9 pr-9 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 cursor-pointer border-none"
                  >
                    <option value="all">Все города</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Панель сортировки и геолокации */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
              {/* Сортировка */}
              <div className="flex items-center gap-3">
                <ArrowUpDown size={18} className="text-white/60" />
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'distance' && !userLocation) {
                        requestGeolocation();
                      } else {
                        setSortBy(value);
                      }
                    }}
                    className="appearance-none bg-white/10 text-white border border-white/20 rounded-xl pl-4 pr-10 py-2.5 font-medium text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id} className="text-gray-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                </div>
              </div>

              {/* Кнопка геолокации */}
              <button
                onClick={requestGeolocation}
                disabled={isGeoLoading}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all
                  ${userLocation
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}
                  ${isGeoLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isGeoLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Navigation size={16} />
                )}
                {userLocation ? 'Местоположение определено' : 'Найти ближайшие'}
              </button>
            </div>

            {/* Ошибка геолокации */}
            {geoError && (
              <div className="mt-3 text-red-300 text-sm font-medium">
                {geoError}
              </div>
            )}
          </div>
        </div>

        {/* 2. СПИСОК (GRID) ИЛИ ЗАГРУЗКА */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 xl:px-28">

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                      onClick={() => { setActiveCategory('all'); setSearchQuery(''); setCityFilter('all'); }}
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