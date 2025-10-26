import InstitutionCard from '@/components/specific/InstitutionCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Institution } from '@/types/project';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input'; // <-- Импортируем Input

// ... (MOCK_INSTITUTIONS остаются без изменений)
const MOCK_INSTITUTIONS: Institution[] = [
  { id: '1', name: 'Детский дом "Солнышко"', city: 'Душанбе', address: 'Ул. Демонстрационная, 1', type: 'Children', contactPhone: '+996 555 XXX XX', contactEmail: 'sun@example.com', needsCount: 42, lastUpdated: '2025-10-17', needs: [], },
  { id: '2', name: 'Дом престарелых "Отрада"', city: 'Душанбе', address: 'Пр. Мира, 5', type: 'Elderly', contactPhone: '+996 777 YYY YY', contactEmail: 'elder@example.com', needsCount: 18, lastUpdated: '2025-10-16', needs: [], },
  { id: '3', name: 'Центр для ЛОВЗ "Надежда"', city: 'Худжанд', address: 'Ул. Горная, 10', type: 'Disabled', contactPhone: '+996 550 ZZZ ZZ', contactEmail: 'hope@example.com', needsCount: 25, lastUpdated: '2025-10-18', needs: [], },
];


const InstitutionsPage = () => {
  const isLoading = false; 

  return (
    <div className="space-y-8">
      {/* ... (Заголовок остается без изменений) */}
      <div>
        <h1 className="text-4xl font-extrabold text-[#763f97]">Все Учреждения</h1>
        <p className="mt-2 text-lg text-gray-600">
          Найдите организацию, которой вы хотите помочь.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {/* ЗАМЕНЯЕМ input НА НАШ КОМПОНЕНТ */}
          <Input
            type="text"
            placeholder="Поиск по названию или городу..."
            className="pl-10" // Отступ для иконки
          />
        </div>
        {/* Здесь тоже можно будет позже заменить select на кастомный компонент */}
        <select className="h-10 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500">
          <option>Все типы</option>
          <option>Детские дома</option>
          <option>Дома престарелых</option>
          <option>Спец. учреждения</option>
        </select>
      </div>
      
      {/* ... (Сетка карточек остается без изменений) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))
          : MOCK_INSTITUTIONS.map((inst) => (
              <InstitutionCard key={inst.id} institution={inst} />
            ))}
      </div>
    </div>
  );
};

export default InstitutionsPage;