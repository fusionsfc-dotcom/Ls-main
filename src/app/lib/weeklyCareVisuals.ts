import type { EmotionGridItem } from '../components/reports/EmotionGrid';
import type { StrategyAccent } from '../components/reports/StrategyBlock';
import type { WeeklyCareReportData, WeeklyCareSection } from '../../data/reports/weekly-care/types';

export const STAGE_COLORS: Record<string, string> = {
  '수술후': '#185FA5',
  '항암중': '#E24B4A',
  '방사선중': '#B45309',
  '면역재활': '#0F6E56',
};

const SECTION_ACCENTS: StrategyAccent[] = ['blue', 'coral', 'amber', 'teal', 'purple', 'green'];

const accentStyles: Record<
  StrategyAccent,
  { colorBg: string; colorText: string; colorSub: string; hex: string }
> = {
  blue: { colorBg: '#E6F1FB', colorText: '#185FA5', colorSub: '#134175', hex: '#185FA5' },
  coral: { colorBg: '#FCEBEB', colorText: '#A32D2D', colorSub: '#791F1F', hex: '#E24B4A' },
  amber: { colorBg: '#FAEEDA', colorText: '#854F0B', colorSub: '#633806', hex: '#B45309' },
  teal: { colorBg: '#E1F5EE', colorText: '#0F6E56', colorSub: '#085041', hex: '#0F6E56' },
  purple: { colorBg: '#EEEDFE', colorText: '#534AB7', colorSub: '#3B3480', hex: '#6B21A8' },
  green: { colorBg: '#EAF3DE', colorText: '#3B6D11', colorSub: '#2A4F0C', hex: '#166534' },
};

export type StageRow = { label: string; count: number; color: string; pct: string };

export function isHospitalStrategyReport(slug: string): boolean {
  return slug.includes('hospital-strategy');
}

export function parseStageBreakdown(dataBasis: string): StageRow[] {
  const matches = [...dataBasis.matchAll(/(수술후|항암중|방사선중|면역재활)\s*(\d+)건/g)];
  if (matches.length === 0) return [];

  const rows = matches.map((m) => ({
    label: m[1],
    count: Number(m[2]),
    color: STAGE_COLORS[m[1]] ?? '#64748B',
    pct: '',
  }));
  const total = rows.reduce((s, r) => s + r.count, 0);
  return rows.map((r) => ({ ...r, pct: total > 0 ? `${Math.round((r.count / total) * 100)}%` : '0%' }));
}

export function getSectionEmotionGrid(sections: WeeklyCareSection[]): EmotionGridItem[] {
  const totalVoices = sections.reduce((s, sec) => s + sec.voices.length, 0);

  return sections.map((section, i) => {
    const accent = SECTION_ACCENTS[i % SECTION_ACCENTS.length];
    const style = accentStyles[accent];
    const title = section.title.replace(/^\d+\.\s*/, '');

    return {
      pct: totalVoices > 0 ? `${Math.round((section.voices.length / totalVoices) * 100)}%` : '—',
      title,
      keywords: `PVM ${section.voices.length}건 · 연결 ${section.departments.length}건`,
      colorBg: style.colorBg,
      colorText: style.colorText,
      colorSub: style.colorSub,
    };
  });
}

export function buildKpiItems(data: WeeklyCareReportData) {
  const { meta, sections } = data;
  const totalVoices = sections.reduce((s, sec) => s + sec.voices.length, 0);
  const totalDepts = sections.reduce((s, sec) => s + sec.departments.length, 0);
  const isStrategy = isHospitalStrategyReport(meta.slug);

  if (isStrategy) {
    return [
      { num: `${meta.totalCases.toLocaleString()}건`, label: 'PVM 니즈 신호', color: 'blue' as const },
      { num: `${sections.length}개`, label: '병원 준비 접점', color: 'teal' as const },
      { num: `${totalVoices}건`, label: '환자 니즈 사례', color: 'amber' as const },
      { num: `${totalDepts}개`, label: '실행 준비 포인트', color: 'coral' as const },
    ];
  }

  const stages = parseStageBreakdown(meta.dataBasis);
  const topStage = [...stages].sort((a, b) => b.count - a.count)[0];

  return [
    { num: `${meta.totalCases.toLocaleString()}건`, label: 'PVM 분석 건수', color: 'blue' as const },
    {
      num: topStage ? `${topStage.count}건` : `${sections.length}단계`,
      label: topStage ? `최다 ${topStage.label}` : '치료 단계',
      color: 'coral' as const,
    },
    { num: `${totalVoices}건`, label: '현장 목소리 인용', color: 'teal' as const },
    { num: `${totalDepts}개`, label: '부서 연결 포인트', color: 'amber' as const },
  ];
}

export function getSectionAccent(index: number): StrategyAccent {
  return SECTION_ACCENTS[index % SECTION_ACCENTS.length];
}

export function getSectionAccentHex(index: number): string {
  return accentStyles[getSectionAccent(index)].hex;
}

export function getSectionPartLabel(index: number): string {
  return `PART ${index + 1}`;
}
