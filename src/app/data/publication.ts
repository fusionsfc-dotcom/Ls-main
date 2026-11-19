import type { InsightItem } from './insightsData';
export const publicationOrigin = 'https://www.lsconsulting.co.kr';
export function exactPublicationDate(report: InsightItem): string | undefined {
  if (report.publishedAt) return report.publishedAt;
  const match = report.date.match(/(20\d{2})[.\-/](\d{2})[.\-/](\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : undefined;
}
export function publicationSchema(report: InsightItem) {
  const url = publicationOrigin + report.link;
  const date = exactPublicationDate(report);
  return {
    '@context':'https://schema.org', '@type':'BlogPosting', '@id':url+'#article',
    headline:report.title.replace(/\n/g,' '), description:report.excerpt, url,
    mainEntityOfPage:{'@type':'WebPage','@id':url}, inLanguage:'ko-KR', isAccessibleForFree:true,
    author:{'@type':'Organization',name:'LS AX 컨설팅',url:publicationOrigin+'/about'},
    publisher:{'@type':'Organization','@id':publicationOrigin+'/#org',name:'LS AX 컨설팅',url:publicationOrigin},
    image:[publicationOrigin+'/images/brand-v1/ls-user-logo-20261027.png'],
    articleSection:report.category,
    ...(date ? {datePublished:date} : {}), ...(report.updatedAt ? {dateModified:report.updatedAt} : {})
  };
}
export function publicationSortTime(report: InsightItem) {
  const value=report.updatedAt||exactPublicationDate(report)||report.date;
  return Date.parse(value.replace(/\./g,'-'))||0;
}

/** Breadcrumbs describe the actual public archive hierarchy, without invented categories. */
export function publicationBreadcrumb(report: InsightItem) {
  const business = report.domain === 'business' || report.domain === 'architecture';
  return {
    '@context':'https://schema.org', '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'LS AX 컨설팅',item:publicationOrigin+'/'},
      {'@type':'ListItem',position:2,name:business?'AX 사례':'인사이트',item:publicationOrigin+(business?'/ax/cases':'/insights')},
      {'@type':'ListItem',position:3,name:report.title.replace(/\n/g,' '),item:publicationOrigin+report.link}
    ]
  };
}
/** RSS requires a time and timezone. Do not manufacture either for date-only records. */
export function publicationFeedDate(report: InsightItem): string | undefined {
  const value=report.updatedAt||report.publishedAt;
  if(!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value))return undefined;
  const time=Date.parse(value);
  return Number.isFinite(time)?new Date(time).toUTCString():undefined;
}
