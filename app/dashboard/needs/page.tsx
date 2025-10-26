import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Need } from '@/types/project';
import Link from 'next/link';
import { Pencil } from 'lucide-react'; // <-- Заменяем иконку на более подходящую

// ... (MOCK_NEEDS остаются без изменений)
const MOCK_NEEDS: Need[] = [
    { id: 'n1', name: 'Подгузники (размер 4)', unit: 'уп.', requiredQuantity: 50, receivedQuantity: 25 },
    { id: 'n2', name: 'Детское питание (смесь)', unit: 'банка', requiredQuantity: 100, receivedQuantity: 90 },
    { id: 'n3', name: 'Канцелярские товары (наборы)', unit: 'шт.', requiredQuantity: 30, receivedQuantity: 30 },
    { id: 'n4', name: 'Теплые носки (детские)', unit: 'пар', requiredQuantity: 100, receivedQuantity: 15 },
    { id: 'n5', name: 'Крупа гречневая', unit: 'кг', requiredQuantity: 20, receivedQuantity: 0 },
];


const NeedsManagementPage = () => {
  return (
    <div className="space-y-6">
      {/* ... (шапка страницы остается без изменений) */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Управление нуждами</h1>
                <p className="text-gray-500">Добавляйте, редактируйте и удаляйте потребности вашего учреждения.</p>
            </div>
            <Button asChild>
                <Link href="/dashboard/needs/new">Добавить нужду</Link>
            </Button>
        </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Прогресс</TableHead>
              <TableHead className="w-[100px] text-center">Действия</TableHead> {/* <-- Центрируем заголовок */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_NEEDS.map((need) => {
              const isCompleted = need.receivedQuantity >= need.requiredQuantity;
              return (
                <TableRow key={need.id}>
                  <TableCell className="font-medium">{need.name}</TableCell>
                  <TableCell>
                    <Badge variant={isCompleted ? 'green' : 'yellow'}>
                      {isCompleted ? 'Выполнено' : 'В процессе'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {need.receivedQuantity} / {need.requiredQuantity} ({need.unit})
                  </TableCell>
                  <TableCell className="text-center">
                    {/* <-- ДОБАВЛЯЕМ ССЫЛКУ НА РЕДАКТИРОВАНИЕ --> */}
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/needs/${need.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NeedsManagementPage;