import { useParams } from 'react-router';
import { ReportDetail } from '../../../pages/ReportDetail';
import { ReportPasswordGate } from './ReportPasswordGate';
import { isReportPathRequiringPassword, normalizeReportPath } from '../../constants/reportAccess';

export function InsightsReportRoute() {
  const { id } = useParams();
  const path = normalizeReportPath(`/insights/report/${id ?? ''}`);

  if (!isReportPathRequiringPassword(path)) {
    return <ReportDetail />;
  }

  return (
    <ReportPasswordGate>
      <ReportDetail />
    </ReportPasswordGate>
  );
}
