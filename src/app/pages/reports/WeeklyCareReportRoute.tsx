import { useParams, Navigate } from 'react-router';
import { WeeklyCareReportPage } from '../../components/reports/WeeklyCareReportPage';
import { weeklyCareReports } from '../../../data/reports/weekly-care';

const HOSPITAL_STRATEGY_SLUG = 'hospital-strategy-2026-06-w4';

export function WeeklyCareReportRoute() {
  const { slug } = useParams();
  const data = slug ? weeklyCareReports[slug] : undefined;

  if (!data) {
    return <Navigate to="/insights" replace />;
  }

  const isHospitalStrategy = slug === HOSPITAL_STRATEGY_SLUG;

  return (
    <WeeklyCareReportPage
      data={data}
      canonicalPath={`/reports/weekly/${slug}`}
      voicesLabel={isHospitalStrategy ? '환자 니즈 신호' : '현장의 목소리 (환자 PVM)'}
      deptLabel={isHospitalStrategy ? '원장님 병원이 준비해볼 수 있는 것' : '부서별 케어 연결 정보'}
    />
  );
}
