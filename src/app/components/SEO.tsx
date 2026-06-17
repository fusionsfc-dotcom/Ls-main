import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import ogImageDefault from "figma:asset/5a8a79283bcecb6ed5e53612f8a61afbebe0ef0a.png";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = 'LS AX 컨설팅 - 의료와 기업의 업무를 AI로 전환합니다',
  description = 'LS AX 컨설팅은 의료와 기업 현장의 업무를 AI로 전환(AX)하는 전문 기업입니다. 자체 개발한 플랫폼과 AI 시스템으로 진단부터 운영까지 함께합니다.',
  image,
  url = 'https://www.lsconsulting.co.kr'
}: SEOProps) {
  const [absoluteImageUrl, setAbsoluteImageUrl] = useState('');

  useEffect(() => {
    // 기본 이미지를 절대 URL로 변환
    const img = image || ogImageDefault;
    if (img.startsWith('http')) {
      setAbsoluteImageUrl(img);
    } else {
      // 상대 경로를 절대 URL로 변환
      const origin = window.location.origin;
      setAbsoluteImageUrl(`${origin}${img}`);
    }
  }, [image]);

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph (Facebook, KakaoTalk) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {absoluteImageUrl && <meta property="og:image" content={absoluteImageUrl} />}
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="LS AX 컨설팅" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImageUrl && <meta name="twitter:image" content={absoluteImageUrl} />}
      
      {/* 카카오톡 전용 */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>
  );
}