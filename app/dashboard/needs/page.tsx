"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Need } from "@/types/project";
import Link from "next/link";
import { Pencil, Trash2, Loader2, Plus } from "lucide-react";
import { fetchInstitutionById, deleteNeed } from "@/lib/api";

export default function NeedsManagementPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // for institution Navruz
  const loadNeeds = async () => {
    setIsLoading(true);

    setIsLoading(true);

    const inst = await fetchInstitutionById("1"); // Hardcode Navruz ID for demo
    if (inst) {
      setNeeds(inst.needs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadNeeds();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      try {
        await deleteNeed(id);

        setNeeds((prev) => prev.filter((n) => n.id !== id));
      } catch (_err) {
        alert("Ошибка при удалении");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#304663]">
            Управление нуждами
          </h1>
          <p className="text-gray-500">
            Добавляйте и редактируйте потребности.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 shadow-lg shadow-[#1e3a8a]/20"
        >
          <Link href="/dashboard/needs/new">
            <Plus className="mr-2 h-4 w-4" /> Добавить нужду
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="animate-spin text-[#1e3a8a]" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[40%]">Название</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Прогресс</TableHead>
                <TableHead className="text-center w-[120px]">
                  Действия
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {needs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-gray-500"
                  >
                    Список пуст
                  </TableCell>
                </TableRow>
              ) : (
                needs.map((need) => {
                  const isCompleted =
                    need.receivedQuantity >= need.requiredQuantity;
                  return (
                    <TableRow key={need.id}>
                      <TableCell className="font-bold text-gray-700">
                        {need.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isCompleted ? "success" : "secondary"}>
                          {isCompleted ? "Выполнено" : "Активно"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {need.receivedQuantity} / {need.requiredQuantity}{" "}
                        {need.unit}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-[#1e3a8a]"
                          >
                            <Link href={`/dashboard/needs/${need.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-500"
                            onClick={() => handleDelete(need.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
