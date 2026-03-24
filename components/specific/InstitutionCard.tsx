/* FILE: components/specific/InstitutionCard.tsx */
'use client';

import Link from 'next/link';
import { Institution } from '@/types/project';
import { MapPin, ArrowRight, Building2, Users, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstitutionCardProps {
  institution: Institution;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution }) => {

  // Настройка иконок и текстов для типов
  const typeMap = {
    Children: {
      text: 'Детский дом',
      icon: <Baby size={16} />,
      bg: 'bg-orange-50',
      textCol: 'text-orange-600'
    },
    Elderly: {
      text: 'Дом престарелых',
      icon: <Users size={16} />,
      bg: 'bg-blue-50',
      textCol: 'text-[#1e3a8a]'
    },
  };

  // Фолбэк, если тип не найден
  const typeInfo = typeMap[institution.type as keyof typeof typeMap] || {
    text: 'Учреждение',
    icon: <Building2 size={16} />,
    bg: 'bg-gray-50',
    textCol: 'text-gray-600'
  };

  return (
    <Link href={`/institutions/${institution.id}`} className="block group h-full">
      <div className={cn(
        "relative flex flex-col h-full bg-white rounded-3xl p-6 border border-gray-100 shadow-sm",
        "transition-all duration-500 ease-out",
        "hover:shadow-xl hover:shadow-[#1e3a8a]/[0.08] hover:-translate-y-1.5 hover:border-[#1e3a8a]/15",
      )}>

        {/* Хедер карточки: Тип и Город */}
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide",
            typeInfo.bg, typeInfo.textCol
          )}>
            {typeInfo.icon}
            {typeInfo.text}
          </div>
        </div>

        {/* Название */}
        <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1e3a8a] transition-colors duration-300 mb-2 line-clamp-2 leading-tight">
          {institution.name}
        </h3>

        {/* Адрес */}
        <div className="flex items-center text-gray-500 mb-6 font-medium">
          <MapPin className="w-4 h-4 mr-2 text-gray-400 group-hover:text-[#ffca63] transition-colors duration-300" />
          {institution.city}
        </div>

        {/* Футер карточки (прижат к низу) */}
        <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Открытые сборы</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#1e3a8a]">{institution.needsCount}</span>
              <span className="text-sm text-gray-400 font-medium">нужд</span>
            </div>
          </div>

          {/* Кнопка-стрелка */}
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1e3a8a] transition-all duration-300 shadow-sm">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffca63] transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InstitutionCard;