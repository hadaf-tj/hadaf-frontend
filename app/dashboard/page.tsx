import StatCard from '@/components/specific/StatCard';
import { Button } from '@/components/ui/Button';
import { ListChecks, PackageCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const DashboardHomePage = () => {
  const stats = { activeNeeds: 12, completedNeeds: 153, urgentNeeds: 2 };
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Обзор</h1>
          <p className="text-gray-500">Сводка по вашему учреждению</p>
        </div>
        <Button 
          asChild 
          className="bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90"
        >
          <Link href="/dashboard/needs/new">Добавить нужду</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Активных нужд" value={stats.activeNeeds} icon={<ListChecks className="h-5 w-5 text-gray-500" />} />
        <StatCard title="Всего закрыто" value={stats.completedNeeds} icon={<PackageCheck className="h-5 w-5 text-gray-500" />} />
        {/* Пункт 5: Срочные нужды - желтые */}
        <StatCard
          title="Срочные нужды"
          value={stats.urgentNeeds}
          icon={<AlertTriangle className="h-5 w-5 text-[#ffca63]" />}
          className="border-l-4 border-[#ffca63]"
        />
      </div>
      <div className="mt-8 rounded-lg border bg-white p-6 shadow-md">
        <h3 className="font-bold">Последняя активность</h3>
        <p className="mt-2 text-sm text-gray-500">Раздел для будущих графиков и логов находится в разработке.</p>
      </div>
    </div>
  );
};
export default DashboardHomePage;