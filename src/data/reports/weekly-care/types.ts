export type WeeklyCareVoice = {
  quote: string;
  ref: string;
  need: string;
};

export type WeeklyCareDepartment = {
  dept: string;
  content: string;
};

export type WeeklyCareSection = {
  title: string;
  summary: string;
  voices: WeeklyCareVoice[];
  departments: WeeklyCareDepartment[];
  note: string;
};

export type WeeklyCareReportMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  issue: string;
  dataBasis: string;
  intro: string;
  totalCases: number;
};

export type WeeklyCareReportData = {
  meta: WeeklyCareReportMeta;
  sections: WeeklyCareSection[];
};
