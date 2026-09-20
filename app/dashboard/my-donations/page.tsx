"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronUp, Loader2, WalletCards } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { getMyDonations, type DonationItem } from "@/lib/api";

type SortKey = "createdAt" | "campaignTitle" | "amount" | "status";

const statusStyles: Record<DonationItem["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
};

function formatDate(value: string, locale: string): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

export default function MyDonationsPage() {
  const t = useTranslations("dashboardDonations");
  const locale = useLocale();
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortAscending, setSortAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getMyDonations()
      .then((items) => {
        if (isMounted) setDonations(items);
      })
      .catch(() => {
        if (isMounted) setError(t("loadError"));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  const sortedDonations = useMemo(() => {
    return [...donations].sort((left, right) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];
      const comparison =
        sortKey === "amount"
          ? Number(leftValue) - Number(rightValue)
          : String(leftValue).localeCompare(String(rightValue));
      return sortAscending ? comparison : -comparison;
    });
  }, [donations, sortAscending, sortKey]);

  const totalImpact = donations.reduce(
    (total, donation) => total + donation.amount,
    0,
  );

  const changeSort = (nextKey: SortKey) => {
    if (sortKey === nextKey) {
      setSortAscending((current) => !current);
      return;
    }
    setSortKey(nextKey);
    setSortAscending(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1e3a8a] sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-sm font-medium text-gray-500 sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
          {t("totalImpact")}
        </p>
        <p className="mt-2 text-3xl font-black text-[#1e3a8a]">
          {totalImpact.toLocaleString()} TJS
        </p>
        <p className="mt-1 text-sm font-medium text-blue-800">
          {t("campaignCount", {
            count: new Set(donations.map((donation) => donation.campaignId)).size,
          })}
        </p>
      </section>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#1e3a8a]" size={36} />
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <Button
            variant="outline"
            className="mt-4 border-red-300 bg-white text-red-700 hover:bg-red-100 hover:text-red-800"
            onClick={() => window.location.reload()}
          >
            {t("retry")}
          </Button>
        </div>
      )}

      {!isLoading && !error && donations.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <WalletCards className="mx-auto text-[#1e3a8a]" size={40} />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            {t("emptyTitle")}
          </h2>
          <p className="mt-2 text-gray-500">
            {t("emptyDescription")}
          </p>
        </div>
      )}

      {!isLoading && !error && donations.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <SortableHeader label={t("date")} sortKey="createdAt" activeKey={sortKey} ascending={sortAscending} onClick={changeSort} />
                  <SortableHeader label={t("campaign")} sortKey="campaignTitle" activeKey={sortKey} ascending={sortAscending} onClick={changeSort} />
                  <SortableHeader label={t("amount")} sortKey="amount" activeKey={sortKey} ascending={sortAscending} onClick={changeSort} />
                  <SortableHeader label={t("status")} sortKey="status" activeKey={sortKey} ascending={sortAscending} onClick={changeSort} />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedDonations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {formatDate(donation.createdAt, locale)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-[#1e3a8a]">
                      {donation.campaignId ? (
                        <Link className="hover:underline" href={`/campaigns/${donation.campaignId}`}>
                          {donation.campaignTitle}
                        </Link>
                      ) : (
                        donation.campaignTitle
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-bold text-gray-900">
                      {donation.amount.toLocaleString()} {donation.currency}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[donation.status]}`}>
                        {donation.status === "confirmed"
                          ? t("statusConfirmed")
                          : t("statusPending")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SortableHeader({
  label,
  sortKey,
  activeKey,
  ascending,
  onClick,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  ascending: boolean;
  onClick: (sortKey: SortKey) => void;
}) {
  const isActive = sortKey === activeKey;

  return (
    <th className="px-4 py-3">
      <button
        type="button"
        className="inline-flex items-center gap-1 font-bold hover:text-[#1e3a8a]"
        onClick={() => onClick(sortKey)}
      >
        {label}
        {isActive ? (
          ascending ? <ArrowUp size={14} /> : <ArrowDown size={14} />
        ) : (
          <ChevronUp size={14} className="text-gray-300" />
        )}
      </button>
    </th>
  );
}
