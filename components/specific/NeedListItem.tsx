import { Need } from '@/types/project';
import { Button } from '@/components/ui/Button'; // <-- ИМПОРТИРУЕМ НАШУ НОВУЮ КНОПКУ

// TempButton УДАЛЕН

interface NeedListItemProps {
  need: Need;
}

const NeedListItem: React.FC<NeedListItemProps> = ({ need }) => {
  const progress = (need.receivedQuantity / need.requiredQuantity) * 100;
  const isCompleted = need.receivedQuantity >= need.requiredQuantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-grow">
        <h4 className="font-bold text-lg text-[#763f97]">{need.name}</h4>
        <p className="text-sm text-gray-500">
          {isCompleted ? 'Полностью собрано!' : `Нужно еще ${need.requiredQuantity - need.receivedQuantity} ${need.unit}`}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 rounded-full ${isCompleted ? 'bg-[#763f97]' : 'bg-[#ffca63]'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-600">
          {need.receivedQuantity} / {need.requiredQuantity} {need.unit}
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button disabled={isCompleted}>
          {isCompleted ? 'Собрано' : 'Помочь'}
        </Button>
      </div>
    </div>
  );
};

export default NeedListItem;