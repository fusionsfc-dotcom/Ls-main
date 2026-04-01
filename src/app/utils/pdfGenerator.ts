import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface PDFOptions {
  filename: string;
  elementId?: string;
  excludeSelectors?: string[];
}

export async function generatePDF(options: PDFOptions): Promise<void> {
  const { filename, elementId = 'pdf-content', excludeSelectors = [] } = options;

  try {
    // 다운로드 시작 표시
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      alert('PDF 생성 대상 요소를 찾을 수 없습니다.');
      return;
    }

    // 제외할 요소들을 임시로 숨김
    const excludedElements: Array<{ element: HTMLElement; originalDisplay: string }> = [];
    excludeSelectors.forEach(selector => {
      const elements = element.querySelectorAll(selector);
      elements.forEach(el => {
        const htmlEl = el as HTMLElement;
        excludedElements.push({ 
          element: htmlEl, 
          originalDisplay: htmlEl.style.display 
        });
        htmlEl.style.display = 'none';
      });
    });

    // 스크롤 위치를 맨 위로 이동
    const originalScrollPosition = window.scrollY;
    window.scrollTo(0, 0);

    // 잠시 대기하여 렌더링이 완료되도록 함
    await new Promise(resolve => setTimeout(resolve, 100));

    // HTML을 캔버스로 변환
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // 제외했던 요소들 다시 표시
    excludedElements.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay;
    });

    // 스크롤 위치 복원
    window.scrollTo(0, originalScrollPosition);

    // 캔버스를 이미지로 변환
    const imgData = canvas.toDataURL('image/png');
    
    // PDF 생성
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // 여러 페이지가 필요한 경우
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // PDF 다운로드
    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}
