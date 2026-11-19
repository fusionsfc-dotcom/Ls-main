import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { insightsData } from '../data/insightsData';
import { brand } from '../data/medicalPositioning';
import { isReportPathRequiringPassword } from '../constants/reportAccess';
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  robots?: string;
  jsonLd?: object | object[];
  publicationMetadata?: boolean;
}
export function SEO({
  title = `${brand.specialty} | ${brand.name}`,
  description = brand.description,
  keywords,
  image = '/images/brand-v1/ls-user-logo-20261027.png',
  url,
  robots,
  jsonLd,
  publicationMetadata = false
}: SEOProps) {
  const {
    pathname
  } = useLocation();
  const canonical = url || `${brand.origin}${pathname}`;
  const indexing = robots || (pathname.startsWith('/admin') || isReportPathRequiringPassword(pathname) ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  const absoluteImageUrl = new URL(image, brand.origin).href;
  const suppliedSchemas = jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : [];
  // ReportDocument owns article and breadcrumb data for registered public reports.
  // Keep unrelated schemas (e.g. Organization) supplied by nested page components.
  const registeredReport = insightsData.some(report => report.link === pathname);
  const schemas = registeredReport && !publicationMetadata
    ? suppliedSchemas.filter(schema => !['Article', 'BlogPosting', 'NewsArticle', 'BreadcrumbList'].includes((schema as Record<string, any>)['@type']))
    : suppliedSchemas;
  return <><Helmet><title>{title}</title><meta name="description" content={description} />{keywords && <meta name="keywords" content={keywords} />}<link rel="canonical" href={canonical} /><meta name="robots" content={indexing} /><meta property="og:type" content="website" /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:image" content={absoluteImageUrl} /><meta property="og:url" content={canonical} /><meta property="og:locale" content="ko_KR" /><meta property="og:site_name" content={brand.name} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={absoluteImageUrl} /></Helmet>{schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema).replace(/</g, '\\u003c')
    }} />)}</>;
}
