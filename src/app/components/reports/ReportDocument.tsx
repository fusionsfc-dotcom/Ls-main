import { RelatedReports } from './RelatedReports';
import './report-editorial.css';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../SEO';
import { insightsData } from '../../data/insightsData';
import { publicationOrigin, publicationSchema, publicationBreadcrumb, exactPublicationDate } from '../../data/publication';
export function ReportDocument({ children }: { children: ReactNode }) {
  const { pathname }=useLocation();
  const report=insightsData.find(item=>item.link===pathname);
  if(!report) return <div className="ls-report-document">{children}</div>;
  const published=exactPublicationDate(report);
  return <><div className="ls-report-document">{children}</div><RelatedReports pathname={pathname}/><SEO publicationMetadata title={`${report.title.replace(/\n/g,' ')} | LS AX 컨설팅`} description={report.excerpt} url={publicationOrigin+report.link} robots="index, follow, max-image-preview:large, max-snippet:-1" jsonLd={[publicationSchema(report),publicationBreadcrumb(report)]}/><Helmet><meta property="og:type" content="article"/>{published&&<meta property="article:published_time" content={published}/ >}{report.updatedAt&&<meta property="article:modified_time" content={report.updatedAt}/>}</Helmet></>;
}
