'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ListChecks, MapPin, XCircle, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_INSTITUTIONS_FOR_MAP = [
  { id: '1', name: 'Дом-интернат "Навруз"', position: [38.5765, 68.7895] as [number, number] },
  { id: '2', name: 'Дом престарелых "Отрада"', position: [38.5490, 68.7731] as [number, number] },
  { id: '3', name: 'Центр "Умед"', position: [38.5612, 68.8050] as [number, number] },
];

const MapPage = () => {
  const MapView = useMemo(() => dynamic(() => import('@/components/specific/MapView'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-[#f7f9fe] animate-pulse flex flex-col items-center justify-center text-[#869cb9]">
            <MapPin size={40} className="mb-2 opacity-50" />
            <p>Загрузка карты...</p>
        </div>
    ),
  }), []);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');

  const resetFilters = () => {
    setActiveFilter(null);
    setSelectedType('all');
  };

  return (
    <div className="bg-[#f7f9fe] min-h-screen pb-12">
      
      {/* Шапка страницы */}
      <div className="bg-white pt-8 pb-12 shadow-sm rounded-b-[2.5rem]">
         <div className="container mx-auto max-w-7xl px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#763f97] mb-4">Карта помощи</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
               Найдите ближайшее учреждение, посмотрите его нужды и привезите помощь лично. Это самый прозрачный способ поддержать.
            </p>
         </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-6">
        {/* Панель фильтров (Карточка) */}
        <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-xl shadow-[#763f97]/5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border border-[#e2e8f0]">
            
            <div className="flex items-center gap-2 text-[#763f97] font-bold uppercase tracking-wider text-sm shrink-0">
                <Filter size={18} />
                Фильтры:
            </div>

            <div className="flex flex-wrap gap-3 w-full">
                <Button
                size="sm"
                onClick={() => setActiveFilter(prev => prev === 'nearest' ? null : 'nearest')}
                className={cn(
                    "rounded-xl transition-all h-10 font-bold",
                    activeFilter === 'nearest'
                    ? "bg-[#763f97] text-white shadow-md"
                    : "bg-[#f7f9fe] text-[#304663] hover:bg-[#e2e8f0]"
                )}
                >
                <MapPin size={16} className="mr-2" />
                Ближайшие
                </Button>

                <Button
                size="sm"
                onClick={() => setActiveFilter(prev => prev === 'most_needs' ? null : 'most_needs')}
                className={cn(
                    "rounded-xl transition-all h-10 font-bold",
                    activeFilter === 'most_needs'
                    ? "bg-[#763f97] text-white shadow-md"
                    : "bg-[#f7f9fe] text-[#304663] hover:bg-[#e2e8f0]"
                )}
                >
                <ListChecks size={16} className="mr-2" />
                Много нужд
                </Button>

                <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>

                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="h-10 pl-4 pr-10 rounded-xl bg-[#f7f9fe] text-[#304663] font-bold text-sm border-none focus:ring-2 focus:ring-[#763f97] cursor-pointer outline-none hover:bg-[#e2e8f0] transition-colors"
                >
                    <option value="all">Все учреждения</option>
                    <option value="children">Детские дома</option>
                    <option value="elderly">Дома престарелых</option>
                    <option value="disabled">Спец. центры</option>
                </select>

                {(activeFilter || selectedType !== 'all') && (
                    <button
                        onClick={resetFilters}
                        className="ml-auto text-sm font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                        <XCircle size={16} />
                        Сбросить
                    </button>
                )}
            </div>
        </div>

        {/* Карта */}
        <div className="mt-6 bg-white p-2 rounded-[2rem] shadow-lg border border-[#e2e8f0]">
            <div className="h-[65vh] w-full rounded-[1.5rem] overflow-hidden relative z-0">
                <MapView institutions={MOCK_INSTITUTIONS_FOR_MAP} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default MapPage;