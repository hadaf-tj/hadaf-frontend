import NeedListItem from '@/components/specific/NeedListItem';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Institution, Need } from '@/types/project';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

// Мок-данные. Заменил город на Душанбе.
const MOCK_INSTITUTION_DETAIL: Institution = {
  id: '1',
  name: 'Дом-интернат "Навруз"',
  city: 'Душанбе',
  address: 'Проспект Рудаки, 100',
  type: 'Children',
  contactPhone: '+992 92 777 01 01',
  contactEmail: 'navruz.tj@example.com',
  needsCount: 4,
  lastUpdated: '2025-10-25',
  needs: [
    { id: 'n1', name: 'Подгузники (размер 4)', unit: 'уп.', requiredQuantity: 50, receivedQuantity: 25 },
    { id: 'n2', name: 'Детское питание (смесь)', unit: 'банка', requiredQuantity: 100, receivedQuantity: 90 },
    { id: 'n3', name: 'Канцелярские товары (наборы)', unit: 'шт.', requiredQuantity: 30, receivedQuantity: 30 },
    { id: 'n4', name: 'Теплые носки (детские)', unit: 'пар', requiredQuantity: 100, receivedQuantity: 15 },
  ],
};

const typeMap = {
    Children: { text: 'Детский Дом', variant: 'yellow' as const },
    Elderly: { text: 'Дом Престарелых', variant: 'green' as const },
    Disabled: { text: 'Спец. Учреждение', variant: 'default' as const },
};

const InstitutionDetailPage = ({ params }: { params: { id: string } }) => {
  const institution = MOCK_INSTITUTION_DETAIL;
  const typeInfo = typeMap[institution.type];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Шапка */}
      <div className="mb-8">
        <Badge variant={typeInfo.variant}>{typeInfo.text}</Badge>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-[#763f97] tracking-tight">
          {institution.name}
        </h1>
      </div>

      {/* Основной макет: 2/3 контент, 1/3 сайдбар */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {/* Левая колонка: список нужд */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-[#763f97] mb-4">Актуальные нужды</h2>
          <div className="space-y-4">
            {institution.needs.length > 0 ? (
              institution.needs.map((need) => (
                <NeedListItem key={need.id} need={need} />
              ))
            ) : (
              <p className="text-gray-500">На данный момент все нужды закрыты. Спасибо!</p>
            )}
          </div>
        </div>

        {/* Правая колонка: информация */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card className="sticky top-24"> {/* Делаем карточку "липкой" при скролле */}
            <CardHeader>
              <CardTitle>Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <span>{institution.city}, {institution.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href={`tel:${institution.contactPhone}`} className="hover:underline">{institution.contactPhone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href={`mailto:${institution.contactEmail}`} className="hover:underline truncate">{institution.contactEmail}</a>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span>Обновлено: {institution.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailPage;