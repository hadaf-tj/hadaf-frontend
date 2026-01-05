import Link from 'next/link';
import { Institution } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'; // Убрал CardDescription, сделаем кастомный
import { MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const InstitutionCard: React.FC<{ institution: Institution }> = ({ institution }) => {
  const typeMap = {
    Children: { text: 'Детский Дом', variant: 'secondary' as const },
    Elderly: { text: 'Дом Престарелых', variant: 'secondary' as const },
    Disabled: { text: 'Спец. Учреждение', variant: 'secondary' as const },
  };
  
  const typeInfo = typeMap[institution.type];

  return (
    <Link href={`/institutions/${institution.id}`} className="block group h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
             <Badge variant={typeInfo.variant}>{typeInfo.text}</Badge>
          </div>
          <CardTitle className="text-xl font-extrabold text-gray-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
            {institution.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <MapPin className="w-4 h-4 mr-1 text-[#9851c2]" />
            {institution.city}
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Нужды</span>
               <span className="text-lg font-bold text-[#1e3a8a]">{institution.needsCount}</span>
            </div>
            
            <div className="bg-[#f7f9fe] p-2 rounded-full group-hover:bg-[#1e3a8a] transition-colors">
               <ArrowRight className="w-5 h-5 text-[#1e3a8a] group-hover:text-white transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default InstitutionCard;