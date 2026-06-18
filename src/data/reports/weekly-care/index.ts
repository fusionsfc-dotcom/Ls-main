import type { WeeklyCareReportData } from './types';
import { report as liver_care_2026_06_w4 } from './liver-care-2026-06-w4';
import { report as colon_care_2026_06_w4 } from './colon-care-2026-06-w4';
import { report as hospital_strategy_2026_06_w4 } from './hospital-strategy-2026-06-w4';
import { report as stomach_care_2026_06_w4 } from './stomach-care-2026-06-w4';
import { report as breast_care_2026_06_w4 } from './breast-care-2026-06-w4';
import { report as lung_care_2026_06_w4 } from './lung-care-2026-06-w4';

export const weeklyCareReports: Record<string, WeeklyCareReportData> = {
  'liver-care-2026-06-w4': liver_care_2026_06_w4,
  'colon-care-2026-06-w4': colon_care_2026_06_w4,
  'hospital-strategy-2026-06-w4': hospital_strategy_2026_06_w4,
  'stomach-care-2026-06-w4': stomach_care_2026_06_w4,
  'breast-care-2026-06-w4': breast_care_2026_06_w4,
  'lung-care-2026-06-w4': lung_care_2026_06_w4,
};

export const weeklyCareReportSlugs = ["liver-care-2026-06-w4", "colon-care-2026-06-w4", "hospital-strategy-2026-06-w4", "stomach-care-2026-06-w4", "breast-care-2026-06-w4", "lung-care-2026-06-w4"] as const;
