'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ListChecks, MapPin, XCircle } from 'lucide-react'; // Добавляем XCircle для сброса
import { cn } from '@/lib/utils';

const MOCK_INSTITUTIONS_FOR_MAP = [
  { id: '1', name: 'Дом-интернат "Навруз"', position: [38.5765, 68.7895] as [number, number] },
  { id: '2', name: 'Дом престарелых "Отрада"', position: [38.5490, 68.7731] as [number, number] },
  { id: '3', name: 'Центр "Умед"', position: [38.5612, 68.8050] as [number, number] },
];

const MapPage = () => {
  const MapView = useMemo(() => dynamic(() => import('@/components/specific/MapView'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center"><p>Загрузка карты...</p></div>,
  }), []);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('all');

  // Функция для сброса
  const resetFilters = () => {
    setActiveFilter(null);
    setSelectedType('all');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#763f97]">Карта Учреждений</h1>
        <p className="mt-2 text-lg text-gray-600">
          Найдите учреждения рядом с вами и окажите помощь.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
        <span className="font-semibold text-gray-800">Фильтры:</span>
        
        {/* ИЗМЕНЕНО: Кнопки теперь используют 'cn' для явного управления стилем */}
        <Button
          size="sm"
          className={cn(
            'gap-2 transition-colors',
            activeFilter === 'nearest'
              ? 'bg-[#763f97] text-white hover:bg-[#763f97]/90' // Активный стиль
              : 'bg-white text-[#763f97] border border-[#763f97] hover:bg-gray-100' // Неактивный (видимый)
          )}
          onClick={() => setActiveFilter(prev => prev === 'nearest' ? null : 'nearest')}
        >
          <MapPin className="w-4 h-4" />
          Ближайшие ко мне
        </Button>
        <Button
          size="sm"
          className={cn(
            'gap-2 transition-colors',
            activeFilter === 'most_needs'
              ? 'bg-[#763f97] text-white hover:bg-[#763f97]/90' // Активный стиль
              : 'bg-white text-[#763f97] border border-[#763f97] hover:bg-gray-100' // Неактивный (видимый)
          )}
          onClick={() => setActiveFilter(prev => prev === 'most_needs' ? null : 'most_needs')}
        >
          <ListChecks className="w-4 h-4" />
          С наибольшими нуждами
        </Button>

        {/* 'select' и так был видим, оставляем его */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-9 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:ring-2 focus:ring-[#763f97]"
        >
          <option value="all">Все типы</option>
          <option value="children">Детские дома</option>
          <option value="elderly">Дома престарелых</option>
          <option value="disabled">Спец. учреждения</option>
        </select>

        {/* ДОБАВЛЕНО: Кнопка сброса */}
        <Button
          size="sm"
          variant="ghost" // 'ghost' обычно имеет прозрачный фон
          className="gap-2 text-gray-600 hover:text-red-600"
          onClick={resetFilters}
        >
          <XCircle className="w-4 h-4" />
          Сбросить
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border-5 border-[#763f97]">
        <div className="h-[60vh] w-full rounded-lg overflow-hidden">
          <MapView institutions={MOCK_INSTITUTIONS_FOR_MAP} />
        </div>
      </div>
    </div>
  );
};

export default MapPage;