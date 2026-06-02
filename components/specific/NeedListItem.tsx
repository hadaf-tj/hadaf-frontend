// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { Need } from "@/types/project";
import { Button } from "@/components/ui/Button";

interface NeedListItemProps {
  need: Need;
}

const NeedListItem: React.FC<NeedListItemProps> = ({ need }) => {
  const progress = Math.min(
    (need.receivedQuantity / need.requiredQuantity) * 100,
    100,
  );
  const isCompleted = need.receivedQuantity >= need.requiredQuantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex-grow w-full">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-lg text-gray-800">{need.name}</h4>
          <span className="text-xs font-bold bg-[#f7f9fe] px-2 py-1 rounded text-gray-500">
            {need.unit}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : "bg-[#1e3a8a]"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-2 font-medium">
          <span className="text-[#1e3a8a]">
            {need.receivedQuantity} собрано
          </span>
          <span className="text-gray-400">из {need.requiredQuantity}</span>
        </div>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        <Button
          disabled={isCompleted}
          className={`w-full sm:w-auto ${isCompleted ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"}`}
        >
          {isCompleted ? "Готово" : "Помочь"}
        </Button>
      </div>
    </div>
  );
};

export default NeedListItem;
