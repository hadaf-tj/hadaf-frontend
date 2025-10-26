import Link from 'next/link';
import { Institution } from '@/types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { MapPin } from 'lucide-react';

const InstitutionCard: React.FC<{ institution: Institution }> = ({ institution }) => {
  const typeMap = {
    Children: { text: 'Детский Дом' },
    Elderly: { text: 'Дом Престарелых' },
    Disabled: { text: 'Спец. Учреждение' },
  };
  const { text } = typeMap[institution.type];

  return (
    <Link href={`/institutions/${institution.id}`} className="block group">
      {/* Убраны все цветные рамки. Простая белая карточка с тенью. */}
      <Card className="h-full transition duration-300 shadow-md hover:shadow-xl group-hover:-translate-y-1 bg-white">
        <CardHeader>
          <CardTitle className="truncate text-lg font-bold text-[#763f97]">{institution.name}</CardTitle>
          <CardDescription className="font-medium text-primary">{text}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {institution.city}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-base font-bold text-[#763f97] flex justify-between items-center">
              <span>Активных нужд:</span>
              <span className="bg-gray-100 text-[#763f97] px-3 py-1 rounded-full text-sm font-semibold">
                {institution.needsCount}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default InstitutionCard;