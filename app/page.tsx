import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';

// MOCK-ДАННЫЕ для запуска
const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: '1',
    name: 'Детский дом "Солнышко"',
    city: 'Бишкек',
    address: 'Ул. Демонстрационная, 1',
    type: 'Children',
    contactPhone: '+996 555 XXX XX',
    contactEmail: 'sun@example.com',
    needsCount: 42,
    lastUpdated: '2025-10-17',
    needs: [],
  },
  {
    id: '2',
    name: 'Дом престарелых "Отрада"',
    city: 'Ош',
    address: 'Пр. Мира, 5',
    type: 'Elderly',
    contactPhone: '+996 777 YYY YY',
    contactEmail: 'elder@example.com',
    needsCount: 18,
    lastUpdated: '2025-10-16',
    needs: [],
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* Секция Приветствия (Responsive Hero) */}
      <section className="text-center py-16 px-4 bg-gray-50 rounded-xl shadow-lg mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Адресная Помощь — Без Посредников
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Найдите учреждения, которые нуждаются в вашей помощи, и предоставьте им именно то, что нужно, благодаря актуальным спискам.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="/institutions" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Найти Учреждения
          </a>
        </div>
      </section>

      {/* Секция с Mock-карточками (Responsive Grid) */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Пилотные Учреждения
        </h2>
        
        {/* Используем адаптивную сетку: 1 столбец (мобайл), 2 (планшет), 3 (десктоп) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INSTITUTIONS.map((inst) => (
            <InstitutionCard key={inst.id} institution={inst} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
