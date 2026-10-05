import { ReviewedBusinessReportPage } from '../../components/reports/ReviewedBusinessReportPage';
import { reviewedBusinessReports } from '../../data/reviewedBusinessReports';
import { useParams, Navigate } from 'react-router';
import { BusinessReportPage } from '../../components/reports/BusinessReportPage';
import { BusinessAnalysisReportPage } from '../../components/reports/BusinessAnalysisReportPage';
import { businessReports, businessAnalysisReports } from '../../../data/reports/business';

export function BusinessReportRoute() {
  const { slug } = useParams();

  const reviewed = slug ? reviewedBusinessReports[slug] : undefined;
  if (reviewed) return <ReviewedBusinessReportPage report={reviewed} canonicalPath={`/reports/business/${slug}`} />;

  const structured = slug ? businessReports[slug] : undefined;
  if (structured) {
    return <BusinessReportPage data={structured} canonicalPath={`/reports/business/${slug}`} />;
  }

  const analysis = slug ? businessAnalysisReports[slug] : undefined;
  if (analysis) {
    return <BusinessAnalysisReportPage data={analysis} canonicalPath={`/reports/business/${slug}`} />;
  }

  return <Navigate to="/insights" replace />;
}
