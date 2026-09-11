// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

export type BeneficiaryStatus =
  | "pending"
  | "verified"
  | "active"
  | "rejected";

export type Beneficiary = {
  id: number;
  childName: string;
  diagnosis?: string;
  status: BeneficiaryStatus;
  submittedAt: string;
  rejectionReason: string | null;
};
