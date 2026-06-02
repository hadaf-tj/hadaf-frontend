"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState } from "react";
import { X, PackagePlus, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createNeed } from "@/lib/api";

const CATEGORIES = [
  "Продукты",
  "Одежда",
  "Медикаменты",
  "Канцелярия",
  "Спорт",
  "Бытовая химия",
  "Другое",
];

interface AddNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutionId: number;
  onSuccess: () => void;
}

export default function AddNeedModal({
  isOpen,
  onClose,
  institutionId,
  onSuccess,
}: AddNeedModalProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("шт");
  const [isUrgent, setIsUrgent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNeed({
        institution_id: institutionId,

        name: name,
        description: category,
        unit: unit,
        required_qty: Number(qty),
        received_qty: 0,
        urgency: isUrgent ? "high" : "medium",
      });

      setName("");
      setQty("");
      setIsUrgent(false);

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании нужды");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#1e3a8a]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-[#1e3a8a] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <PackagePlus size={24} />
            </div>
            <h3 className="font-black text-lg leading-tight">
              Добавить новую нужду
            </h3>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
              Что необходимо?
            </label>
            <input
              type="text"
              placeholder="Например: Зимние куртки"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-14 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900 appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                Ед. измерения
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-14 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900 appearance-none"
              >
                {["шт", "кг", "литр", "упаковка", "коробка"].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
              Количество
            </label>
            <input
              type="number"
              min="1"
              placeholder="Сколько нужно?"
              required
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
            />
          </div>

          <div
            onClick={() => setIsUrgent(!isUrgent)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${isUrgent ? "border-red-400 bg-red-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isUrgent ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-400"}`}
            >
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <div
                className={`font-bold text-lg ${isUrgent ? "text-red-700" : "text-gray-900"}`}
              >
                Это срочный сбор?
              </div>
              <div
                className={`text-sm font-medium ${isUrgent ? "text-red-600/70" : "text-gray-500"}`}
              >
                Отметьте, если помощь нужна немедленно
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isUrgent ? "border-red-500 bg-red-500" : "border-gray-300"}`}
            >
              {isUrgent && <X size={16} className="text-white rotate-45" />}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-[#1e3a8a] hover:bg-[#2a4ec2] text-white font-bold text-lg shadow-xl shadow-[#1e3a8a]/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Опубликовать нужду"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
