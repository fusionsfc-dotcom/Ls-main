import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './app/components/Header';
import { Footer } from './app/components/Footer';
import { Home } from './app/pages/Home';
import { Healthcare } from './app/pages/Healthcare';
import { Projects } from './app/pages/Projects';
import { About } from './app/pages/About';
import { Insights } from './app/pages/Insights';
import { Ax } from './app/pages/Ax';
import { AxMedical } from './app/pages/AxMedical';
import { AxCases } from './app/pages/AxCases';
import { Contact } from './app/pages/Contact';
import { JejuHealthcare } from './app/pages/JejuHealthcare';

// Deliberately allowlist public marketing pages. Never import report bodies or gates here.
const pages = {
  '/': Home,
  '/healthcare': Healthcare,
  '/projects': Projects,
  '/about': About,
  '/insights': Insights,
  '/ax': Ax,
  '/ax/medical': AxMedical,
  '/ax/cases': AxCases,
  '/ax/medical/jeju': JejuHealthcare,
  '/contact': Contact
};
export function renderPublicMarketingPages() {
  return Object.entries(pages).map(([path, Page]) => {
    const context: Record<string, any> = {};
    const body = renderToString(<HelmetProvider context={context}><StaticRouter location={path}><div className="min-h-screen bg-white flex flex-col"><Header /><main id="main-content" className="flex-1" tabIndex={-1}><Page /></main><Footer hidePricing /></div></StaticRouter></HelmetProvider>);
    const {
      helmet
    } = context;
    return {
      path,
      body,
      head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
    };
  });
}
