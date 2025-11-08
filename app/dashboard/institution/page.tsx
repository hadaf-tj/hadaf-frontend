'use client';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useRouter } from 'next/navigation';

// Мок-данные для текущего учреждения
const MOCK_INSTITUTION_DATA = {
  id: '1',
  name: 'Дом-интернат "Навруз"',
  city: 'Душанбе',
  address: 'Проспект Рудаки, 100',
  contactPhone: '+992 92 777 01 01',
  contactEmail: 'navruz.tj@example.com',
};

const InstitutionProfilePage = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь будет fetch-запрос к API (PUT /api/institution/{id})
    console.log('Updating institution profile...');
    // Можно показать уведомление об успешном сохранении
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Профиль Учреждения</CardTitle>
            <CardDescription>
              Эта информация будет видна всем посетителям сайта.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Официальное название</Label>
              <Input id="name" defaultValue={MOCK_INSTITUTION_DATA.name} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <Input id="city" defaultValue={MOCK_INSTITUTION_DATA.city} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" defaultValue={MOCK_INSTITUTION_DATA.address} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Контактный телефон</Label>
                <Input id="contactPhone" type="tel" defaultValue={MOCK_INSTITUTION_DATA.contactPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Контактный Email</Label>
                <Input id="contactEmail" type="email" defaultValue={MOCK_INSTITUTION_DATA.contactEmail} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Отмена
            </Button>
            <Button 
              type="submit" 
              className="bg-[#763f97] text-white hover:bg-[#763f97]/90"
            >
              Сохранить изменения
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default InstitutionProfilePage;