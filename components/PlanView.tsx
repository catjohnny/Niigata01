import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import { ITINERARY, GUIDE_LOCATIONS } from '../constants';
import { ItineraryDay } from '../types';

const PlanView: React.FC = () => {
  const [activeDay, setActiveDay] = useState<string>(() => {
    return localStorage.getItem('niigata_active_day') || ITINERARY[0].date;
  });

  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('niigata_active_day', activeDay);
  }, [activeDay]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'transport': return 'fa-plane-departure';
      case 'hotel': return 'fa-bed';
      case 'food': return 'fa-utensils';
      case 'activity': return 'fa-camera';
      case 'info': return 'fa-circle-info';
      default: return 'fa-circle';
    }
  };

  const selectedItinerary = ITINERARY.find(d => d.date === activeDay);

  const toggleGuide = (id: string) => {
    setExpandedGuideId(expandedGuideId === id ? null : id);
  }

  return (
    <div className="min-h-full bg-luxury-black">
      {/* Date Selector */}
      <div className="sticky top-0 bg-luxury-black/95 backdrop-blur-md z-20 border-b border-gray-800 py-4 px-2 overflow-x-auto no-scrollbar flex space-x-4">
        {ITINERARY.map((day: ItineraryDay) => (
          <button
            key={day.date}
            onClick={() => setActiveDay(day.date)}
            className={`flex flex-col items-center min-w-[60px] p-2 rounded-xl border transition-all duration-300 ${
              activeDay === day.date
                ? 'bg-gold-500 border-gold-400 text-luxury-black shadow-lg shadow-gold-500/20'
                : 'bg-luxury-charcoal border-gray-700 text-gray-400'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider">{day.dayOfWeek}</span>
            <span className="text-lg font-serif font-bold">{day.date.split('/')[1]}</span>
          </button>
        ))}
      </div>

      {/* Weather Widget (New Upgraded Version) */}
      <div className="px-4 pt-6 pb-2">
           <WeatherWidget />
      </div>

      {/* Timeline */}
      <div className="p-6 relative">
        <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gradient-to-b from-gold-500/0 via-gold-500/30 to-gold-500/0"></div>

        {selectedItinerary ? (
          <div className="space-y-8">
            <div className="ml-10 mb-6">
                <h2 className="text-2xl font-serif text-gold-400">{selectedItinerary.title}</h2>
                <p className="text-gray-500 text-sm italic">{selectedItinerary.date}, 2026</p>
            </div>

            {selectedItinerary.items.map((item, index) => {
              const guideData = item.guideId ? GUIDE_LOCATIONS.find(g => g.id === item.guideId) : null;
              const isExpanded = expandedGuideId === item.guideId;

              return (
                  <div key={index} className="relative flex items-start group">
                  <div className={`absolute left-0 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 bg-luxury-black ${
                      item.highlight ? 'border-gold-400 text-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'border-gray-600 text-gray-600'
                  }`}>
                      <i className={`fas ${getIcon(item.type)} text-xs`}></i>
                  </div>

                  <div className="ml-10 w-full">
                      <div className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                      item.highlight 
                          ? 'bg-gradient-to-br from-luxury-charcoal to-luxury-gray border-gold-400/50 shadow-md' 
                          : 'bg-luxury-charcoal/50 border-gray-800'
                      }`}>
                      <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          item.highlight ? 'bg-gold-500 text-black' : 'bg-gray-700 text-gray-300'
                          }`}>
                          {item.time}
                          </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-100 mt-2 mb-1">{item.title}</h3>
                      {item.description && (
                          <p className="text-sm text-gray-400 leading-relaxed font-sans whitespace-pre-line">{item.description}</p>
                      )}
                      
                      {/* MapCode & Location Link */}
                      <div className="flex flex-wrap gap-2 mt-3">
                          {item.mapCode && (
                              <div className="text-[10px] text-gold-400 font-mono bg-luxury-black/50 px-2 py-1 rounded border border-gold-600/30">
                                  MAPCODE: {item.mapCode}
                              </div>
                          )}
                          {item.locationLink && (
                              <a 
                              href={item.locationLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase border border-gray-700 px-2 py-1 rounded bg-gray-800"
                              >
                              <i className="fas fa-map-marked-alt mr-1"></i> 地圖
                              </a>
                          )}
                          {guideData && (
                               <button 
                                  onClick={() => toggleGuide(item.guideId!)}
                                  className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded border transition-colors ${
                                      isExpanded 
                                      ? 'bg-gold-500 text-black border-gold-500' 
                                      : 'bg-gray-800 text-gold-400 border-gold-400/50 hover:bg-gold-500/10'
                                  }`}
                               >
                                  <i className={`fas ${isExpanded ? 'fa-book-open' : 'fa-book'} mr-1`}></i> 
                                  {isExpanded ? '收起介紹' : '詳細資訊'}
                               </button>
                          )}
                      </div>

                      {/* Expanded Guide Content */}
                      {guideData && isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                              <div className="relative h-40 w-full rounded-lg overflow-hidden mb-3">
                                  <img src={guideData.imagePlaceholder} alt={guideData.title} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                  <div className="absolute bottom-2 left-2">
                                      <div className="text-gold-400 text-xs font-serif italic">{guideData.subtitle}</div>
                                  </div>
                              </div>
                              <div className="text-gray-300 text-sm leading-relaxed text-justify mb-3 whitespace-pre-wrap guide-content font-sans">
                                  {guideData.description}
                              </div>
                              {guideData.details && (
                                  <div className="grid grid-cols-2 gap-2">
                                  {guideData.details.map((detail, i) => (
                                      <div key={i} className="bg-luxury-black/60 p-2 rounded border border-gray-800">
                                      <div className="text-[10px] text-gray-500 uppercase">{detail.label}</div>
                                      <div className="text-xs text-white font-mono">{detail.value}</div>
                                      </div>
                                  ))}
                                  </div>
                              )}
                          </div>
                      )}

                      </div>
                  </div>
                  </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">請選擇日期</div>
        )}
      </div>
    </div>
  );
};

export default PlanView;
