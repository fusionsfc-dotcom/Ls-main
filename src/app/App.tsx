import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Research } from './pages/Research';
import { Strategy } from './pages/Strategy';
import { Execution } from './pages/Execution';
import { Experience } from './pages/Experience';
import { Insights } from './pages/Insights';
import { Patients } from './pages/Patients';
import { Consultation } from './pages/Consultation';
import { AiConsult } from './pages/AiConsult';
import { InsightsReportRoute } from './components/auth/InsightsReportRoute';
import { ReportPasswordGate } from './components/auth/ReportPasswordGate';
import { HospitalSwitchResearch } from './pages/HospitalSwitchResearch';
import { PatientPersonaExecution } from './pages/PatientPersonaExecution';
import { PvmKpiExecutionReport } from './pages/PvmKpiExecutionReport';
import { BreastCancerReport } from './pages/BreastCancerReport';
import { StomachCancerReport } from './pages/StomachCancerReport';
import { ColonCancerReport } from './pages/ColonCancerReport';
import { CancerJourneyExecutionManual } from './pages/CancerJourneyExecutionManual';
import { CancerAnxietyVoiceExecution } from './pages/CancerAnxietyVoiceExecution';
import { LungCancerInsight202602 } from './pages/reports/LungCancerInsight202602';
import { StomachCancerPvmAnalysis } from './pages/reports/StomachCancerPvmAnalysis';
import { PatientDischargeTransferStructure } from './pages/reports/PatientDischargeTransferStructure';
import { CancerTreatmentTypeCareStrategy } from './pages/reports/CancerTreatmentTypeCareStrategy';
import { RadiotherapyPatientAnalysis } from './pages/reports/RadiotherapyPatientAnalysis';
import { BreastCancerStageCareStrategyReport } from './pages/reports/BreastCancerStageCareStrategyReport';
import { LiverCancerReport202603 } from './pages/reports/LiverCancerReport202603';
import { LungCancerReport202603 } from './pages/reports/LungCancerReport202603';
import { PvmReport } from '../pages/PvmReport';
import { ReportGenerator } from '../pages/ReportGenerator';

function AppContent() {
  const location = useLocation();
  // PricingSection은 랜딩페이지와 의뢰하기 페이지에서만 표시
  const showPricing = location.pathname === '/' || location.pathname === '/consultation';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/execution" element={<Execution />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/insights/report/:id" element={<InsightsReportRoute />} />
          <Route path="/research/pvm-hospital-switch" element={<HospitalSwitchResearch />} />
          <Route path="/research/patient-persona-execution" element={<PatientPersonaExecution />} />
          <Route
            path="/research/pvm-kpi-execution-report"
            element={
              <ReportPasswordGate>
                <PvmKpiExecutionReport />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/disease/breast-cancer-report"
            element={
              <ReportPasswordGate>
                <BreastCancerReport />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/disease/stomach-cancer-report"
            element={
              <ReportPasswordGate>
                <StomachCancerReport />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/disease/colon-cancer-report"
            element={
              <ReportPasswordGate>
                <ColonCancerReport />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/cancer-journey-execution-manual"
            element={
              <ReportPasswordGate>
                <CancerJourneyExecutionManual />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/cancer-anxiety-voice-execution"
            element={
              <ReportPasswordGate>
                <CancerAnxietyVoiceExecution />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/lung-cancer-insight-202602"
            element={
              <ReportPasswordGate>
                <LungCancerInsight202602 />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/stomach-cancer-pvm-analysis"
            element={
              <ReportPasswordGate>
                <StomachCancerPvmAnalysis />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/patient-discharge-transfer-structure"
            element={
              <ReportPasswordGate>
                <PatientDischargeTransferStructure />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/cancer-treatment-type-care-strategy"
            element={
              <ReportPasswordGate>
                <CancerTreatmentTypeCareStrategy />
              </ReportPasswordGate>
            }
          />
          <Route
            path="/report/radiotherapy-patient-analysis"
            element={
              <ReportPasswordGate>
                <RadiotherapyPatientAnalysis />
              </ReportPasswordGate>
            }
          />
          <Route path="/report/breast-cancer-stage-care-strategy" element={<BreastCancerStageCareStrategyReport />} />
          <Route path="/reports/liver-cancer-2026-03" element={<LiverCancerReport202603 />} />
          <Route
            path="/reports/lung-cancer-2026-03"
            element={
              <ReportPasswordGate>
                <LungCancerReport202603 />
              </ReportPasswordGate>
            }
          />
          <Route path="/insights/pvm-report" element={<PvmReport />} />
          <Route path="/admin/report-generator" element={<ReportGenerator />} />
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
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
