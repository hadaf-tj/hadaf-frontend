// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

export type Need = {
  id: string;
  name: string;
  unit: string;
  requiredQuantity: number;
  receivedQuantity: number;
  bookedQuantity: number;
  urgency: string;
};

export type Institution = {
  id: string;
  name: string;
  city: string;
  address: string;
  type: "Children" | "Elderly";
  contactPhone: string;
  contactEmail: string;
  needsCount: number;
  wardsCount?: number;
  lastUpdated: string;
  needs: Need[];
  activityHours?: string;
  latitude?: number;
  longitude?: number;
};

export type User = {
  id: string;
  email: string;
  role: "employee" | "super_admin" | "volunteer";
  institutionId?: string;
  is_approved?: boolean;
};
