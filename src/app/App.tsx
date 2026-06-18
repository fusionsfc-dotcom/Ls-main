import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ReportPasswordGate } from './components/auth/ReportPasswordGate';
import { InsightsReportRoute } from './components/auth/InsightsReportRoute';

// 핵심 마케팅 페이지 — 즉시 로드
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Healthcare } from './pages/Healthcare';
import { Business } from './pages/Business';
import { About } from './pages/About';
import { Consultation } from './pages/Consultation';
import { AiConsult } from './pages/AiConsult';

// 보조 페이지 · 리포트 — 지연 로드(코드 스플리팅)
const Research = lazy(() => import('./pages/Research').then((m) => ({ default: m.Research })));
const Strategy = lazy(() => import('./pages/Strategy').then((m) => ({ default: m.Strategy })));
const Execution = lazy(() => import('./pages/Execution').then((m) => ({ default: m.Execution })));
const Experience = lazy(() => import('./pages/Experience').then((m) => ({ default: m.Experience })));
const Insights = lazy(() => import('./pages/Insights').then((m) => ({ default: m.Insights })));
const Patients = lazy(() => import('./pages/Patients').then((m) => ({ default: m.Patients })));
const HospitalSwitchResearch = lazy(() => import('./pages/HospitalSwitchResearch').then((m) => ({ default: m.HospitalSwitchResearch })));
const PatientPersonaExecution = lazy(() => import('./pages/PatientPersonaExecution').then((m) => ({ default: m.PatientPersonaExecution })));
const PvmKpiExecutionReport = lazy(() => import('./pages/PvmKpiExecutionReport').then((m) => ({ default: m.PvmKpiExecutionReport })));
const BreastCancerReport = lazy(() => import('./pages/BreastCancerReport').then((m) => ({ default: m.BreastCancerReport })));
const StomachCancerReport = lazy(() => import('./pages/StomachCancerReport').then((m) => ({ default: m.StomachCancerReport })));
const ColonCancerReport = lazy(() => import('./pages/ColonCancerReport').then((m) => ({ default: m.ColonCancerReport })));
const CancerJourneyExecutionManual = lazy(() => import('./pages/CancerJourneyExecutionManual').then((m) => ({ default: m.CancerJourneyExecutionManual })));
const CancerAnxietyVoiceExecution = lazy(() => import('./pages/CancerAnxietyVoiceExecution').then((m) => ({ default: m.CancerAnxietyVoiceExecution })));
const LungCancerInsight202602 = lazy(() => import('./pages/reports/LungCancerInsight202602').then((m) => ({ default: m.LungCancerInsight202602 })));
const StomachCancerPvmAnalysis = lazy(() => import('./pages/reports/StomachCancerPvmAnalysis').then((m) => ({ default: m.StomachCancerPvmAnalysis })));
const PatientDischargeTransferStructure = lazy(() => import('./pages/reports/PatientDischargeTransferStructure').then((m) => ({ default: m.PatientDischargeTransferStructure })));
const CancerTreatmentTypeCareStrategy = lazy(() => import('./pages/reports/CancerTreatmentTypeCareStrategy').then((m) => ({ default: m.CancerTreatmentTypeCareStrategy })));
const RadiotherapyPatientAnalysis = lazy(() => import('./pages/reports/RadiotherapyPatientAnalysis').then((m) => ({ default: m.RadiotherapyPatientAnalysis })));
const BreastCancerStageCareStrategyReport = lazy(() => import('./pages/reports/BreastCancerStageCareStrategyReport').then((m) => ({ default: m.BreastCancerStageCareStrategyReport })));
const LiverCancerReport202603 = lazy(() => import('./pages/reports/LiverCancerReport202603').then((m) => ({ default: m.LiverCancerReport202603 })));
const LungCancerReport202603 = lazy(() => import('./pages/reports/LungCancerReport202603').then((m) => ({ default: m.LungCancerReport202603 })));
const BreastCancerCommunityReport202604 = lazy(() => import('./pages/reports/BreastCancerCommunityReport202604').then((m) => ({ default: m.BreastCancerCommunityReport202604 })));
const WeeklyCareReportRoute = lazy(() => import('./pages/reports/WeeklyCareReportRoute').then((m) => ({ default: m.WeeklyCareReportRoute })));
const PvmReport = lazy(() => import('../pages/PvmReport').then((m) => ({ default: m.PvmReport })));
const ReportGenerator = lazy(() => import('../pages/ReportGenerator').then((m) => ({ default: m.ReportGenerator })));

function AppContent() {
  const showPricing = false;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<Business />} />
            <Route path="/consultation" element={<Consultation />} />
            {/* 작동 중인 AI는 전역 플로팅 위젯 — /consult 진입은 상담으로 안내 */}
            <Route path="/consult" element={<Navigate to="/consultation" replace />} />
            <Route path="/research" element={<Research />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/execution" element={<Execution />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/insights/report/:id" element={<InsightsReportRoute />} />
            <Route path="/research/pvm-hospital-switch" element={<HospitalSwitchResearch />} />
            <Route path="/research/patient-persona-execution" element={<PatientPersonaExecution />} />
            <Route path="/research/pvm-kpi-execution-report" element={<ReportPasswordGate><PvmKpiExecutionReport /></ReportPasswordGate>} />
            <Route path="/disease/breast-cancer-report" element={<ReportPasswordGate><BreastCancerReport /></ReportPasswordGate>} />
            <Route path="/disease/stomach-cancer-report" element={<ReportPasswordGate><StomachCancerReport /></ReportPasswordGate>} />
            <Route path="/disease/colon-cancer-report" element={<ReportPasswordGate><ColonCancerReport /></ReportPasswordGate>} />
            <Route path="/report/cancer-journey-execution-manual" element={<ReportPasswordGate><CancerJourneyExecutionManual /></ReportPasswordGate>} />
            <Route path="/report/cancer-anxiety-voice-execution" element={<ReportPasswordGate><CancerAnxietyVoiceExecution /></ReportPasswordGate>} />
            <Route path="/report/lung-cancer-insight-202602" element={<ReportPasswordGate><LungCancerInsight202602 /></ReportPasswordGate>} />
            <Route path="/report/stomach-cancer-pvm-analysis" element={<ReportPasswordGate><StomachCancerPvmAnalysis /></ReportPasswordGate>} />
            <Route path="/report/patient-discharge-transfer-structure" element={<ReportPasswordGate><PatientDischargeTransferStructure /></ReportPasswordGate>} />
            <Route path="/report/cancer-treatment-type-care-strategy" element={<ReportPasswordGate><CancerTreatmentTypeCareStrategy /></ReportPasswordGate>} />
            <Route path="/report/radiotherapy-patient-analysis" element={<ReportPasswordGate><RadiotherapyPatientAnalysis /></ReportPasswordGate>} />
            <Route path="/report/breast-cancer-stage-care-strategy" element={<BreastCancerStageCareStrategyReport />} />
            <Route path="/reports/liver-cancer-2026-03" element={<LiverCancerReport202603 />} />
            <Route path="/reports/lung-cancer-2026-03" element={<ReportPasswordGate><LungCancerReport202603 /></ReportPasswordGate>} />
            <Route path="/reports/breast-cancer-community-2026-04-w1" element={<ReportPasswordGate><BreastCancerCommunityReport202604 /></ReportPasswordGate>} />
            <Route path="/reports/weekly/:slug" element={<WeeklyCareReportRoute />} />
            <Route path="/insights/pvm-report" element={<PvmReport />} />
            <Route path="/admin/report-generator" element={<ReportGenerator />} />
          </Routes>
        </Suspense>
      </main>
      <Footer hidePricing={!showPricing} />
      <AiConsult />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
