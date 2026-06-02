"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { NeedForm } from "@/components/specific/NeedForm";
import { createNeed } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewNeedPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleCreateNeed = async (data: {
    name?: string;
    unit?: string;
    requiredQuantity?: number;
    receivedQuantity?: number;
  }) => {
    try {
      // TODO: Populate institution parameter dynamically via authentication context

      const payload = {
        institution_id: 1,
        category_id: null,
        name: data.name,
        description: data.name,
        unit: data.unit,
        required_qty: Number(data.requiredQuantity),
        received_qty: Number(data.receivedQuantity),
        urgency: "medium",
      };

      await createNeed(payload);
      router.push("/dashboard/needs");
    } catch (err) {
      console.error(err);
      setError("Не удалось создать нужду. Проверьте авторизацию.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a8a]">
        Добавить новую потребность
      </h2>
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      <NeedForm onSubmit={handleCreateNeed} />
    </div>
  );
};

export default NewNeedPage;
