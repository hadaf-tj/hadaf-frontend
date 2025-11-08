import { Institution } from '@/types/project';
import InstitutionCard from '@/components/specific/InstitutionCard';
import { HeartHandshake, ListChecks, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const MOCK_INSTITUTIONS: Institution[] = [
    { id: '1', name: 'Дом-интернат "Навруз"', city: 'Душанбе', type: 'Children', needsCount: 42, address: '', contactEmail: '', contactPhone: '', lastUpdated: '', needs: [] },
    { id: '2', name: 'Дом престарелых "Отрада"', city: 'Худжанд', type: 'Elderly', needsCount: 18, address: '', contactEmail: '', contactPhone: '', lastUpdated: '', needs: [] },
];

const steps = [
    // Пункт 3: Иконки фиолетовые
    { icon: <Search className="w-10 h-10 text-[#763f97]" />, title: '1. Найдите Учреждение', description: 'Выберите из списка проверенных социальных учреждений в вашем городе.' },
    { icon: <ListChecks className="w-10 h-10 text-[#763f97]" />, title: '2. Посмотрите Нужды', description: 'Ознакомьтесь с актуальным списком потребностей.' },
    { icon: <HeartHandshake className="w-10 h-10 text-[#763f97]" />, title: '3. Помогите Напрямую', description: 'Свяжитесь с учреждением и окажите помощь без посредников.' },
];

const HomePage: React.FC = () => {
  // throw new Error('Это тестовая ошибка сервера 500!');
  return (
    <div className="space-y-20">
      <section className="text-center py-16 px-4 bg-[#763f97] rounded-xl shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Помощь без посредников</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">Найдите учреждения, которые нуждаются в вашей помощи, и предоставьте им именно то, что нужно.</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-[#763f97] mb-12">Как это работает?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step) => (
            <Card key={step.title} className="shadow-none border-none bg-transparent">
              <CardHeader className="items-center">
                {/* Пункт 3: Фон иконок - светло-фиолетовый */}
                <div className="bg-[#9851c2]/10 p-4 rounded-full">{step.icon}</div>
                <CardTitle className="mt-4 text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent><p className="text-gray-600">{step.description}</p></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-[#763f97] mb-8">Учреждения, которым нужна помощь</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{MOCK_INSTITUTIONS.map((inst) => (<InstitutionCard key={inst.id} institution={inst} />))}</div>
      </section>
      
      <section>
        {/* Пункт 6: Блок "Готовы помочь" */}
        <div className="text-center p-10 bg-[#763f97] text-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Готовы помочь?</h2>
          <p className="max-w-xl mx-auto mb-6 opacity-90">Каждая мелочь имеет значение. Нажмите на кнопку ниже, чтобы увидеть полный список учреждений.</p>
          <Button asChild size="lg" className="bg-white text-[#763f97] hover:bg-gray-200 font-bold">
            <Link href="/institutions">Посмотреть все учреждения</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
export default HomePage;