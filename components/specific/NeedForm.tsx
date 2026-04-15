"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Need } from "@/types/project";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface NeedFormProps {
  initialData?: Partial<Need>;
  isSaving?: boolean;
  onSubmit: (data: {
    name?: string;
    unit?: string;
    requiredQuantity?: number;
    receivedQuantity?: number;
  }) => void;
}

export const NeedForm: React.FC<NeedFormProps> = ({
  initialData,
  isSaving,
  onSubmit,
}) => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
    onSubmit({});
  };

  const handleDelete = () => {
    // TODO: Implement robust confirmation modal
    if (
      window.confirm(
        "Вы уверены, что хотите удалить эту нужду? Это действие необратимо.",
      )
    ) {
      // Invoke DELETE API call
      console.log(`Deleting need ${initialData?.id}`);
      router.push("/dashboard/needs");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {initialData?.id ? "Редактировать нужду" : "Добавить новую нужду"}
          </CardTitle>
        </CardHeader>
        {/* ... (CardContent остается без изменений) */}
        <CardContent className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Название нужды</Label>
            <Input
              id="name"
              placeholder='Например, "Теплые носки (размер 42)"'
              defaultValue={initialData?.name}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="requiredQuantity">Требуемое количество</Label>
              <Input
                id="requiredQuantity"
                type="number"
                placeholder="50"
                defaultValue={initialData?.requiredQuantity}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Единица измерения</Label>
              <Input
                id="unit"
                placeholder='Например, "пар", "шт.", "кг"'
                defaultValue={initialData?.unit}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {" "}
          {/* <-- Меняем на justify-between */}
          <div>
            {/* Кнопка "Удалить" появляется только в режиме редактирования */}
            {initialData?.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Удалить
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};
