"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getProfile, fetchInstitutionById } from "@/lib/api";
import { User, Mail, Phone, Building } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("dashboardSettings");
  const [user, setUser] = useState<{
    full_name: string;
    role: string;
    email: string;
    phone?: string;
    institution_id?: number;
  } | null>(null);
  const [institutionName, setInstitutionName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);

        if (data.institution_id) {
          const inst = await fetchInstitutionById(String(data.institution_id));
          if (inst) setInstitutionName(inst.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-[#1e3a8a] font-bold">{t("loading")}</div>
    );
  }

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

      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-gray-100">
        <form className="space-y-6">
          {/* Аватар (Заглушка) */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#3b5cb8] text-white flex items-center justify-center border-2 border-blue-100">
              <User size={28} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">
                {user?.full_name}
              </h3>
              <p className="text-sm text-gray-500">
                {user?.role === "employee"
                  ? t("roleEmployee")
                  : t("roleVolunteer")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> {t("fullNameLabel")}
              </label>
              <input
                type="text"
                value={user?.full_name || ""}
                disabled
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> {t("emailLabel")}
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Phone size={14} /> {t("phoneLabel")}
              </label>
              <input
                type="text"
                value={user?.phone || t("phoneNotProvided")}
                disabled
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Building size={14} /> {t("organizationLabel")}
              </label>
              <input
                type="text"
                value={
                  institutionName ||
                  (user?.institution_id
                    ? t("organizationLoading")
                    : t("organizationNotLinked"))
                }
                disabled
                className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button
              disabled
              className="opacity-50 cursor-not-allowed bg-[#1e3a8a] text-white"
            >
              {t("saveChangesSoon")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
