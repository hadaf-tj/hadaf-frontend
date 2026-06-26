// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: app/dashboard/promises/page.tsx */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartHandshake, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fetchMyBookings, cancelMyBooking, updateMyBooking } from "@/lib/api";
import { useErrorTranslator } from "@/lib/errorMessages";
import { useTranslations } from "next-intl";

interface Booking {
  id: number;
  need_name: string;
  institution_name: string;
  institution_id: number;
  quantity: number;
  status: string;
  note?: string;
  planned_date?: string;
}

export default function PromisesPage() {
  const t = useTranslations("dashboardPromises");
  const tCommon = useTranslations("common");
  const translateError = useErrorTranslator();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleCancel = async (id: number) => {
    if (!confirm(t("cancelConfirm"))) return;
    try {
      setIsProcessing(id);
      await cancelMyBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
      );
    } catch (err: any) {
      alert(
        err instanceof Error ? translateError(err.message) : translateError(""),
      );
    } finally {
      setIsProcessing(null);
    }
  };

  const handleSaveEdit = async (id: number) => {
    if (editQty <= 0) {
      alert(t("quantityMin"));
      return;
    }
    try {
      setIsProcessing(id);
      await updateMyBooking(id, editQty);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, quantity: editQty } : b)),
      );
      setEditingId(null);
    } catch (err: any) {
      alert(
        err instanceof Error ? translateError(err.message) : translateError(""),
      );
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a8a]">
          {t("title")}
        </h1>
        <p className="text-gray-500 font-medium text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="text-center py-16">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>{tCommon("retry")}</Button>
        </div>
      )}

      {/* */}
      {!isLoading && !error && bookings.length === 0 && (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartHandshake size={40} className="text-[#1e3a8a]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("emptyTitle")}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {t("emptyDescription")}
          </p>
          <Link href="/institutions">
            <Button className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold px-8">
              <ExternalLink size={16} className="mr-2" />
              {t("findInstitutions")}
            </Button>
          </Link>
        </div>
      )}

      {/* Bookings List */}
      {!isLoading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {b.need_name || t("unknownNeed")}
                  </h3>
                  <div className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-1">
                    {b.institution_name ? (
                      <Link
                        href={`/institutions/${b.institution_id}`}
                        className="hover:text-[#1e3a8a] hover:underline transition-colors"
                      >
                        {b.institution_name}
                      </Link>
                    ) : (
                      t("institutionFallback")
                    )}
                    <span>· {t("quantityUnit", { count: b.quantity })}</span>
                  </div>
                  {(b.planned_date || b.note) && (
                    <p className="text-xs text-gray-400 mt-1">
                      {t("plannedDate", {
                        date: b.planned_date || b.note || "",
                      })}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                    b.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : b.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : b.status === "rejected"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-[#1e3a8a]"
                  }`}
                >
                  {b.status === "completed"
                    ? t("statusCompleted")
                    : b.status === "cancelled"
                      ? t("statusCancelled")
                      : b.status === "rejected"
                        ? t("statusRejected")
                        : t("statusActive")}
                </span>
              </div>

              {/* Действия для активных (pending) бронирований */}
              {editingId === b.id ? (
                <div className="mt-4 flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 font-bold mb-1 block uppercase tracking-wider">
                      {t("newQuantityLabel")}
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full border-gray-200 rounded-lg text-sm bg-white"
                      value={editQty}
                      onChange={(e) => setEditQty(Number(e.target.value))}
                      disabled={isProcessing === b.id}
                    />
                  </div>
                  <div className="flex gap-2 items-end pt-5">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(b.id)}
                      disabled={isProcessing === b.id}
                      className="bg-[#1e3a8a]"
                    >
                      {isProcessing === b.id ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        tCommon("save")
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      disabled={isProcessing === b.id}
                    >
                      {tCommon("cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                b.status === "pending" && (
                  <div className="mt-5 flex gap-3 pt-4 border-t border-gray-100">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(b.id);
                        setEditQty(b.quantity);
                      }}
                      disabled={isProcessing === b.id}
                      className="text-[#1e3a8a] border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5"
                    >
                      {t("editButton")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCancel(b.id)}
                      disabled={isProcessing === b.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {isProcessing === b.id && (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      )}
                      {t("cancelButton")}
                    </Button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
