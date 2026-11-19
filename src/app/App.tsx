import { MedicalMotion } from './components/medical/MedicalMotion';
import { SiteExperience } from './components/experience/SiteExperience';
import { ExperienceProvider } from './components/experience/ExperienceProvider';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ReportDocument } from './components/reports/ReportDocument';
const ArchivedFebruaryReport = lazy(() => import('./pages/ReportDetail').then(m => ({ default: m.ReportDetail })));
const InsightsReportRoute = lazy(() => import('./components/auth/InsightsReportRoute').then(m => ({ default: m.InsightsReportRoute })));

// 핵심 마케팅 페이지 — 즉시 로드
import { Home } from './pages/Home';
import { Healthcare } from './pages/Healthcare';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
const AiConsult = lazy(() => import('./pages/AiConsult').then(m => ({ default: m.AiConsult })));
import { Ax } from './pages/Ax';
import { AxMedical } from './pages/AxMedical';
import { AxCases } from './pages/AxCases';
import { Contact } from './pages/Contact';
import { JejuHealthcare } from './pages/JejuHealthcare';
import { medicalMarketingPaths } from './data/siteNavigation';
import { SEO } from './components/SEO';
import { isReportPathRequiringPassword } from './constants/reportAccess';
import { LegacyRedirect } from './components/medical/LegacyRedirect';

// 보조 페이지 · 리포트 — 지연 로드(코드 스플리팅)
const Research = lazy(() => import('./pages/Research').then(m => ({
  default: m.Research
})));
const Strategy = lazy(() => import('./pages/Strategy').then(m => ({
  default: m.Strategy
})));
const Execution = lazy(() => import('./pages/Execution').then(m => ({
  default: m.Execution
})));
const Experience = lazy(() => import('./pages/Experience').then(m => ({
  default: m.Experience
})));
const Insights = lazy(() => import('./pages/Insights').then(m => ({
  default: m.Insights
})));
const Patients = lazy(() => import('./pages/Patients').then(m => ({
  default: m.Patients
})));
const HospitalSwitchResearch = lazy(() => import('./pages/HospitalSwitchResearch').then(m => ({
  default: m.HospitalSwitchResearch
})));
const PatientPersonaExecution = lazy(() => import('./pages/PatientPersonaExecution').then(m => ({
  default: m.PatientPersonaExecution
})));
const PvmKpiExecutionReport = lazy(() => import('./pages/PvmKpiExecutionReport').then(m => ({
  default: m.PvmKpiExecutionReport
})));
const BreastCancerReport = lazy(() => import('./pages/BreastCancerReport').then(m => ({
  default: m.BreastCancerReport
})));
const StomachCancerReport = lazy(() => import('./pages/StomachCancerReport').then(m => ({
  default: m.StomachCancerReport
})));
const ColonCancerReport = lazy(() => import('./pages/ColonCancerReport').then(m => ({
  default: m.ColonCancerReport
})));
const CancerJourneyExecutionManual = lazy(() => import('./pages/CancerJourneyExecutionManual').then(m => ({
  default: m.CancerJourneyExecutionManual
})));
const CancerAnxietyVoiceExecution = lazy(() => import('./pages/CancerAnxietyVoiceExecution').then(m => ({
  default: m.CancerAnxietyVoiceExecution
})));
const LungCancerInsight202602 = lazy(() => import('./pages/reports/LungCancerInsight202602').then(m => ({
  default: m.LungCancerInsight202602
})));
const StomachCancerPvmAnalysis = lazy(() => import('./pages/reports/StomachCancerPvmAnalysis').then(m => ({
  default: m.StomachCancerPvmAnalysis
})));
const PatientDischargeTransferStructure = lazy(() => import('./pages/reports/PatientDischargeTransferStructure').then(m => ({
  default: m.PatientDischargeTransferStructure
})));
const CancerTreatmentTypeCareStrategy = lazy(() => import('./pages/reports/CancerTreatmentTypeCareStrategy').then(m => ({
  default: m.CancerTreatmentTypeCareStrategy
})));
const RadiotherapyPatientAnalysis = lazy(() => import('./pages/reports/RadiotherapyPatientAnalysis').then(m => ({
  default: m.RadiotherapyPatientAnalysis
})));
const BreastCancerStageCareStrategyReport = lazy(() => import('./pages/reports/BreastCancerStageCareStrategyReport').then(m => ({
  default: m.BreastCancerStageCareStrategyReport
})));
const LiverCancerReport202603 = lazy(() => import('./pages/reports/LiverCancerReport202603').then(m => ({
  default: m.LiverCancerReport202603
})));
const LungCancerReport202603 = lazy(() => import('./pages/reports/LungCancerReport202603').then(m => ({
  default: m.LungCancerReport202603
})));
const BreastCancerCommunityReport202604 = lazy(() => import('./pages/reports/BreastCancerCommunityReport202604').then(m => ({
  default: m.BreastCancerCommunityReport202604
})));
const WeeklyCareReportRoute = lazy(() => import('./pages/reports/WeeklyCareReportRoute').then(m => ({
  default: m.WeeklyCareReportRoute
})));
const BusinessReportRoute = lazy(() => import('./pages/reports/BusinessReportRoute').then(m => ({
  default: m.BusinessReportRoute
})));
const PvmReport = lazy(() => import('../pages/PvmReport').then(m => ({
  default: m.PvmReport
})));
const ReportGenerator = lazy(() => import('../pages/ReportGenerator').then(m => ({
  default: m.ReportGenerator
})));
function AppContent() {
  const {
    pathname
  } = useLocation();
  const legacyExperience = !medicalMarketingPaths.includes(pathname) && !["/services", "/business", "/consultation"].includes(pathname);
  return <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <MedicalMotion />
      {legacyExperience && <SiteExperience />}
      {(pathname.startsWith("/admin") || isReportPathRequiringPassword(pathname)) && <SEO title="제한된 페이지 | LS AX 컨설팅" robots="noindex, nofollow" />}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<div className="med-site med-section"><div className="med-wrap" role="status">페이지를 불러오고 있습니다.</div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<LegacyRedirect kind="services" />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<LegacyRedirect kind="business" />} />
            <Route path="/ax" element={<Ax />} />
            <Route path="/ax/medical" element={<AxMedical />} />
            <Route path="/ax/cases" element={<AxCases />} />
            <Route path="/ax/medical/jeju" element={<JejuHealthcare />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<LegacyRedirect kind="consultation" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/execution" element={<Execution />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/insights/report/202602" element={<ReportDocument><ArchivedFebruaryReport /></ReportDocument>} />
            <Route path="/insights/report/:id" element={<ReportDocument><InsightsReportRoute /></ReportDocument>} />
            <Route path="/research/pvm-hospital-switch" element={<ReportDocument><HospitalSwitchResearch /></ReportDocument>} />
            <Route path="/research/patient-persona-execution" element={<ReportDocument><PatientPersonaExecution /></ReportDocument>} />
            <Route path="/research/pvm-kpi-execution-report" element={<ReportDocument><PvmKpiExecutionReport /></ReportDocument>} />
            <Route path="/disease/breast-cancer-report" element={<ReportDocument><BreastCancerReport /></ReportDocument>} />
            <Route path="/disease/stomach-cancer-report" element={<ReportDocument><StomachCancerReport /></ReportDocument>} />
            <Route path="/disease/colon-cancer-report" element={<ReportDocument><ColonCancerReport /></ReportDocument>} />
            <Route path="/report/cancer-journey-execution-manual" element={<ReportDocument><CancerJourneyExecutionManual /></ReportDocument>} />
            <Route path="/report/cancer-anxiety-voice-execution" element={<ReportDocument><CancerAnxietyVoiceExecution /></ReportDocument>} />
            <Route path="/report/lung-cancer-insight-202602" element={<ReportDocument><LungCancerInsight202602 /></ReportDocument>} />
            <Route path="/report/stomach-cancer-pvm-analysis" element={<ReportDocument><StomachCancerPvmAnalysis /></ReportDocument>} />
            <Route path="/report/patient-discharge-transfer-structure" element={<ReportDocument><PatientDischargeTransferStructure /></ReportDocument>} />
            <Route path="/report/cancer-treatment-type-care-strategy" element={<ReportDocument><CancerTreatmentTypeCareStrategy /></ReportDocument>} />
            <Route path="/report/radiotherapy-patient-analysis" element={<ReportDocument><RadiotherapyPatientAnalysis /></ReportDocument>} />
            <Route path="/report/breast-cancer-stage-care-strategy" element={<ReportDocument><BreastCancerStageCareStrategyReport /></ReportDocument>} />
            <Route path="/reports/liver-cancer-2026-03" element={<ReportDocument><LiverCancerReport202603 /></ReportDocument>} />
            <Route path="/reports/lung-cancer-2026-03" element={<ReportDocument><LungCancerReport202603 /></ReportDocument>} />
            <Route path="/reports/breast-cancer-community-2026-04-w1" element={<ReportDocument><BreastCancerCommunityReport202604 /></ReportDocument>} />
            <Route path="/reports/weekly/:slug" element={<ReportDocument><WeeklyCareReportRoute /></ReportDocument>} />
            <Route path="/reports/business/:slug" element={<ReportDocument><BusinessReportRoute /></ReportDocument>} />
            <Route path="/insights/pvm-report" element={<PvmReport />} />
            <Route path="/admin/report-generator" element={<ReportGenerator />} />
            <Route path="*" element={<div className="med-site med-section"><SEO title="페이지를 찾을 수 없습니다 | LS AX 컨설팅" robots="noindex, follow" /><div className="med-wrap"><h1>페이지를 찾을 수 없습니다.</h1><p className="med-lead">주소를 확인하거나 상단 메뉴에서 필요한 정보를 찾아보세요.</p><a className="med-text-link" href="/">홈으로 이동 →</a></div></div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer hidePricing />
      {pathname === '/patients' && <Suspense fallback={null}><AiConsult /></Suspense>}
    </div>;
}
export default function App() {
  return <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ExperienceProvider><AppContent /></ExperienceProvider>
      </BrowserRouter>
    </HelmetProvider>;
}
