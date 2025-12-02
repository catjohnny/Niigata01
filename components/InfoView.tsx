import React from 'react';

const InfoView: React.FC = () => {
  const ContactCard = ({ icon, title, number, desc }: { icon: string; title: string; number?: string; desc?: string }) => (
    <div className="flex items-center bg-luxury-charcoal p-4 rounded-xl border border-gray-800 mb-3">
      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 border border-gold-500/30">
        <i className={`fas ${icon} text-gold-400`}></i>
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold">{title}</h4>
        {desc && <p className="text-xs text-gray-500">{desc}</p>}
      </div>
      {number && (
        <a href={`tel:${number}`} className="bg-gray-800 text-gold-400 px-3 py-1 rounded text-sm font-mono border border-gray-700">
          {number}
        </a>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-luxury-black min-h-full">
        <h2 className="text-2xl font-serif text-gold-400 mb-6">旅遊資訊</h2>

        <section className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">緊急聯絡 (日本)</h3>
            <ContactCard icon="fa-shield-halved" title="警察局" number="110" />
            <ContactCard icon="fa-truck-medical" title="救護車 / 消防局" number="119" />
            <ContactCard icon="fa-building-columns" title="台北駐日經濟文化代表處" desc="TECO Japan" />
        </section>

        <section className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">違禁品 / 注意事項</h3>
            <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-4">
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start"><i className="fas fa-ban text-red-500 mt-1 mr-2"></i> 禁止攜帶肉類製品 (香腸、肉乾)</li>
                    <li className="flex items-start"><i className="fas fa-ban text-red-500 mt-1 mr-2"></i> 禁止攜帶新鮮蔬果</li>
                    <li className="flex items-start"><i className="fas fa-triangle-exclamation text-yellow-500 mt-1 mr-2"></i> 液體超過 100ml 需託運</li>
                </ul>
            </div>
        </section>

        <div className="mt-12 text-center">
            <p className="text-[10px] text-gray-700 font-serif italic">Designed for 2026 新潟之旅</p>
        </div>
    </div>
  );
};

export default InfoView;
