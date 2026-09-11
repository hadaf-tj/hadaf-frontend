"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ClipboardList, Loader2, Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { getMyBeneficiaries, uploadBeneficiaryMedia } from "@/lib/api";
import { useErrorTranslator } from "@/lib/errorMessages";
import { cn } from "@/lib/utils";
import type { Beneficiary, BeneficiaryStatus } from "@/types/medical";

const STATUS_STYLES: Record<BeneficiaryStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  verified: "bg-emerald-100 text-emerald-800",
  active: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

function formatSubmittedAt(value: string, locale: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ApplicationsPage() {
  const t = useTranslations("dashboardApplications");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const translateError = useErrorTranslator();

  const [applications, setApplications] = useState<Beneficiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await getMyBeneficiaries();
      setApplications(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? translateError(err.message)
          : translateError("ERR_LOAD_APPLICATIONS");
      setError(message);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  }, [translateError]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpload = async (beneficiaryId: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError("");
    setUploadingId(beneficiaryId);

    try {
      for (const file of Array.from(files)) {
        await uploadBeneficiaryMedia(beneficiaryId, file);
      }
      await load();
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error
          ? translateError(err.message)
          : translateError("ERR_UPLOAD_FAILED"),
      );
    } finally {
      setUploadingId(null);
    }
  };

  const statusLabel = (status: BeneficiaryStatus) => {
    switch (status) {
      case "pending":
        return t("statusPending");
      case "verified":
        return t("statusVerified");
      case "active":
        return t("statusActive");
      case "rejected":
        return t("statusRejected");
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

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-16">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <Button
            onClick={() => {
              setIsLoading(true);
              void load();
            }}
          >
            {tCommon("retry")}
          </Button>
        </div>
      )}

      {!isLoading && !error && applications.length === 0 && (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClipboardList size={40} className="text-[#1e3a8a]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("emptyTitle")}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {t("emptyDescription")}
          </p>
          <Link href="/need-help">
            <Button className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold px-8">
              {t("applyButton")}
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && applications.length > 0 && (
        <div className="space-y-4">
          {uploadError && (
            <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {uploadError}
            </p>
          )}
          {applications.map((application) => (
            <article
              key={application.id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {application.childName}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {t("submittedAt", {
                      date: formatSubmittedAt(application.submittedAt, locale),
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold px-3 py-1 rounded-full shrink-0",
                    STATUS_STYLES[application.status],
                  )}
                >
                  {statusLabel(application.status)}
                </span>
              </div>

              {application.status === "rejected" && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                  <div className="flex items-start gap-2 text-red-800">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold">{t("rejectionTitle")}</p>
                      <p className="text-sm font-medium mt-1">
                        {application.rejectionReason || t("rejectionFallback")}
                      </p>
                    </div>
                  </div>
                  <ReuploadButton
                    beneficiaryId={application.id}
                    disabled={uploadingId === application.id}
                    isUploading={uploadingId === application.id}
                    label={t("reuploadButton")}
                    onFiles={(files) => handleUpload(application.id, files)}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ReuploadButton({
  beneficiaryId,
  disabled,
  isUploading,
  label,
  onFiles,
}: {
  beneficiaryId: number;
  disabled: boolean;
  isUploading: boolean;
  label: string;
  onFiles: (files: FileList | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        id={`reupload-${beneficiaryId}`}
        type="file"
        accept="image/*,.pdf,application/pdf"
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          onFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <Button
        type="button"
        size="sm"
        className="mt-4 bg-[#1e3a8a] text-white hover:bg-[#2a4ec2]"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        {label}
      </Button>
    </>
  );
}
