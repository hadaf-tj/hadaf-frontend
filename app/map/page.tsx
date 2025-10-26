'use client'; // <-- ДОБАВЬТЕ ЭТУ СТРОКУ В САМОМ НАЧАЛЕ

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { ListChecks, MapPin } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-[#763f97]">Карта Учреждений</h1>
        <p className="mt-2 text-lg text-gray-600">
          Найдите учреждения рядом с вами и окажите помощь.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
        <span className="font-semibold">Фильтры:</span>
        <Button size="sm" className="gap-2 bg-[#763f97] text-white hover:bg-[#763f97]/90">
          <MapPin className="w-4 h-4" />
          Ближайшие ко мне
        </Button>
        <Button size="sm" className="gap-2 bg-[#763f97] text-white hover:bg-[#763f97]/90">
          <ListChecks className="w-4 h-4" />
          С наибольшими нуждами
        </Button>
        <select className="h-9 px-3 border border-transparent rounded-md bg-[#763f97] text-white text-sm focus:ring-2 focus:ring-white/50">
          <option>Все типы</option>
          <option>Детские дома</option>
          <option>Дома престарелых</option>
          <option>Спец. учреждения</option>
        </select>
      </div>

      <div className="h-[60vh] w-full rounded-lg shadow-lg overflow-hidden">
        <MapView institutions={MOCK_INSTITUTIONS_FOR_MAP} />
      </div>
    </div>
  );
};
export default MapPage;