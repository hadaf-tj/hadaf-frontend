// /components/specific/InstitutionCard.tsx
import Link from 'next/link';
import { Institution } from '@/types/project'; // Теперь этот импорт работает! (При условии, что types/project.ts существует)

interface InstitutionCardProps {
  institution: Institution;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution }) => {
  // Убеждаемся, что type 'Disabled' (из types/project.ts) также имеет цвет
  const isChildrensHome = institution.type === 'Children';
  const isElderlyHome = institution.type === 'Elderly';
  // Если не Children, используем более нейтральный или другой цвет
  const borderColor = isChildrensHome 
    ? 'border-yellow-500' 
    : isElderlyHome 
      ? 'border-green-500'
      : 'border-blue-500'; // Для 'Disabled' или других типов

  return (
    // Link для перехода на детальную страницу
    <Link href={`/institutions/${institution.id}`} className="block">
      <div 
        className={`bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer transform hover:-translate-y-1 border-t-4 ${borderColor}`}
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">
          {institution.name}
        </h3>
        {/* Отображение типа учреждения */}
        <p className={`text-sm mb-3 font-semibold ${isChildrensHome ? 'text-yellow-600' : isElderlyHome ? 'text-green-600' : 'text-blue-600'}`}>
          {institution.type === 'Children' 
            ? 'Детский Дом' 
            : institution.type === 'Elderly'
              ? 'Дом Престарелых'
              : 'Спец. Учреждение'
          }
        </p>
        
        <p className="text-sm text-gray-500 mb-4 flex items-center">
            {/* Иконка местоположения */}
            <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            {institution.city}
        </p>

        {/* Адаптивная информация о нуждах */}
        <div className="pt-4 border-t border-gray-100">
            <p className="text-lg font-extrabold text-red-600 flex justify-between items-center">
                <span>Активных нужд:</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    {institution.needsCount}
                </span>
            </p>
        </div>
      </div>
    </Link>
  );
};

export default InstitutionCard;
