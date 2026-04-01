import React from 'react';
import { ExternalLink } from 'lucide-react';

export function OurClients() {
  const clients = [
    { name: '서울힐링요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/heal.jpeg', projects: '개원컨설팅/상담/교육/홍보/홈페이지 등', website: 'https://www.seoulhealinghospital.co.kr/' },
    { name: '흥덕우리요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/hd.jpeg', projects: '홍보/홈페이지 등', website: 'http://hdwoori.com/' },
    { name: '러스크서울병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/rh.jpeg', projects: '암분야도입 컨설팅/교육/홍보/홈페이지 등', website: 'https://ruskseoul.co.kr/' },
    { name: '태동의료재단 춘천태동요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/tae.jpeg', projects: '법인개설 및 개원컨설팅/상담/교육/경영지원/홍보/홈페이지 등', website: 'https://www.taedonghp.co.kr/' },
    { name: '뷰티풀한방병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/bt.jpeg', projects: '컨설팅/교육/홍보/홈페이지 등', website: 'https://www.btful.co.kr/' },
    { name: '네이처요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/nat.jpeg', projects: '홈페이지 등', website: 'https://www.naturehospital.co.kr/' }
  ];

  return (
    <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
      <div className="max-w-[1400px] mx-auto">
        <h2 
          className="text-3xl lg:text-4xl mb-20 tracking-tight text-center"
          style={{ color: 'var(--navy-900)' }}
        >
          Our Clients
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="bg-white overflow-hidden transition-all hover:shadow-xl"
              style={{ 
                border: '1px solid rgba(15, 43, 70, 0.1)'
              }}
            >
              {client.image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 
                  className="text-lg font-semibold leading-relaxed"
                  style={{ color: 'var(--navy-900)' }}
                >
                  {client.name}
                </h3>
                {client.projects && (
                  <p className="text-sm leading-relaxed opacity-60 mt-2" style={{ color: 'var(--navy-900)' }}>
                    {client.projects}
                  </p>
                )}
                {client.website && (
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded transition-all hover:opacity-80"
                    style={{ 
                      backgroundColor: 'var(--navy-900)', 
                      color: 'white' 
                    }}
                  >
                    <ExternalLink size={16} />
                    홈페이지 바로가기
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}