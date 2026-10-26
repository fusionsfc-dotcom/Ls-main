import { Navigate, useLocation } from 'react-router';
export function LegacyRedirect({
  kind
}: {
  kind: 'services' | 'business' | 'consultation';
}) {
  const {
    hash,
    search
  } = useLocation();
  if (kind === 'consultation') return <Navigate replace to={'/contact' + search + hash} />;
  const target = kind === 'services' ? hash === '#cases' ? '/ax/cases' : '/ax' : hash === '#how' ? '/ax' : '/ax/cases';
  return <Navigate replace to={target + search + (hash === '#how' ? '#process' : '')} />;
}
