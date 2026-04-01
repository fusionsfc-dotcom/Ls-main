import { useCallback } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

export function usePdfDownload(filename: string, title: string) {
  const handleDownloadPDF = useCallback(() => {
    generatePDF('report-content', {
      filename,
      title,
      excludeSelectors: ['header', 'footer', '.no-pdf']
    });
  }, [filename, title]);

  return handleDownloadPDF;
}
