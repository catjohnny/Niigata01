import React, { useState, useEffect } from 'react';
import { WeatherData } from '../types';

const WeatherWidget: React.FC = () => {
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Helper to get day name
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    const d = new Date(date);
    d.setHours(0,0,0,0);
    
    if (d.getTime() === today.getTime()) return '今日';
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return `${date.getMonth() + 1}/${date.getDate()} (${days[date.getDay()]})`;
  };

  // Helper for icons and mapping codes to text
  const getWeatherInfo = (codeStr: string) => {
    const code = parseInt(codeStr);
    if (code >= 100 && code < 200) return { icon: "fa-sun text-yellow-500", label: "晴朗" };
    if (code >= 200 && code < 300) {
        if (code >= 200 && code <= 210) return { icon: "fa-cloud text-gray-400", label: "多雲" };
        if (code >= 211 && code <= 299) return { icon: "fa-cloud-rain text-gray-300", label: "陰有雨" };
        return { icon: "fa-cloud text-gray-400", label: "多雲" };
    } 
    if (code >= 300 && code < 400) return { icon: "fa-umbrella text-blue-400", label: "雨天" };
    if (code >= 400) return { icon: "fa-snowflake text-white animate-pulse", label: "下雪" };
    return { icon: "fa-cloud-sun text-gray-400", label: "多雲時晴" };
  };

  useEffect(() => {
    // Fetch Niigata (150000) forecast from JMA
    fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/150000.json')
      .then(res => res.json())
      .then(data => {
        if (data && data[0] && data[1]) {
            const result: WeatherData[] = [];
            
            // --- Process Weekly Data (data[1]) as the backbone ---
            const weeklySeries = data[1].timeSeries;
            const weeklyDates = weeklySeries[0].timeDefines;
            const weeklyCodes = weeklySeries[0].areas[0].weatherCodes;
            const weeklyMin = weeklySeries[1].areas[0].tempsMin;
            const weeklyMax = weeklySeries[1].areas[0].tempsMax;

            // --- Process Daily Data (data[0]) for more detail on first 2 days ---
            const dailySeries = data[0].timeSeries;
            const dailyDates = dailySeries[0].timeDefines;
            const dailyWeathers = dailySeries[0].areas[0].weathers;
            const dailyPops = dailySeries[1].areas[0].pops; 
            
            // Map Daily Pops to Dates
            const popMap: Record<string, string> = {};
            const popTimeDefines = dailySeries[1].timeDefines;
            
            popTimeDefines.forEach((t: string, i: number) => {
                const dayKey = t.substring(0, 10);
                const val = parseInt(dailyPops[i]);
                if (!popMap[dayKey] || val > parseInt(popMap[dayKey])) {
                    popMap[dayKey] = dailyPops[i] + '%';
                }
            });

            // Combine into final array
            weeklyDates.forEach((dateStr: string, i: number) => {
                const dayKey = dateStr.substring(0, 10);
                
                // Defaults from Weekly
                let code = weeklyCodes[i];
                let minT = weeklyMin[i] === '' ? '-' : weeklyMin[i] + '°';
                let maxT = weeklyMax[i] === '' ? '-' : weeklyMax[i] + '°';
                let text = '';
                let pop = '-';

                // Overlay Daily Data if available
                const dailyIndex = dailyDates.findIndex((d: string) => d.startsWith(dayKey));
                if (dailyIndex !== -1) {
                    text = dailyWeathers[dailyIndex]; 
                }

                if (popMap[dayKey]) {
                    pop = popMap[dayKey];
                }

                // If no text description, generate from code
                if (!text) {
                    text = getWeatherInfo(code.toString()).label;
                }

                result.push({
                    date: dateStr,
                    code: code.toString(),
                    text,
                    pop,
                    minTemp: minT,
                    maxTemp: maxT
                });
            });

            setForecast(result);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Weather fetch failed", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .weather-modal-content {
           animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-luxury-charcoal to-luxury-black border border-gold-500/30 rounded-xl p-4 flex justify-between items-center shadow-lg active:scale-[0.98] transition-all group"
      >
         <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 shadow-inner group-hover:border-gold-500/50 transition-colors">
                <i className="fas fa-location-dot text-gold-500 text-lg"></i>
             </div>
             <div className="text-left">
                <div className="text-base font-bold text-gray-100 group-hover:text-gold-400 transition-colors">新潟市 (Niigata)</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">點擊查看一週天氣</div>
             </div>
         </div>
         
         {!loading && forecast.length > 0 && (
             <div className="flex items-center gap-3 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                 <i className={`fas ${getWeatherInfo(forecast[0].code).icon} text-lg`}></i>
                 <div className="flex flex-col items-end leading-none">
                    <span className="text-xs font-mono text-gray-200">{forecast[0].minTemp}/{forecast[0].maxTemp}</span>
                 </div>
             </div>
         )}
      </button>

      {/* Bottom Sheet Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="weather-modal-content relative w-full sm:max-w-md bg-luxury-gray rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden border-t sm:border border-gold-500/20 max-h-[85vh] flex flex-col mx-auto">
                
                {/* Header */}
                <div className="flex-none bg-luxury-charcoal p-4 flex justify-between items-center border-b border-gray-700 shadow-md z-10">
                    <div className="flex items-center gap-2">
                         <div className="bg-gold-500/10 p-2 rounded-full">
                            <i className="fas fa-cloud-sun text-gold-400"></i>
                         </div>
                         <div>
                            <h3 className="text-white font-bold text-lg">新潟市一週天氣</h3>
                            <p className="text-[10px] text-gray-400">資料來源: 日本氣象廳 (JMA)</p>
                         </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto p-2 pb-8 sm:pb-2 bg-luxury-black/95">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                             <i className="fas fa-circle-notch fa-spin text-2xl text-gold-500 mb-2"></i>
                             <span className="text-xs">更新氣象資料中...</span>
                        </div>
                    ) : (
                        <div className="space-y-2">
                             {forecast.map((day, idx) => {
                                 const info = getWeatherInfo(day.code);
                                 return (
                                     <div key={idx} className="bg-luxury-charcoal/50 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
                                         {/* Date & Icon */}
                                         <div className="flex items-center gap-4 w-1/3">
                                             <div className="flex flex-col">
                                                 <span className={`text-sm font-bold ${idx===0 ? 'text-gold-400' : 'text-gray-300'}`}>
                                                     {getDayName(day.date)}
                                                 </span>
                                                 {idx === 0 && <span className="text-[10px] text-gold-600 font-bold">TODAY</span>}
                                             </div>
                                         </div>

                                         {/* Weather Icon & POP */}
                                         <div className="flex flex-col items-center justify-center w-1/3">
                                              <i className={`fas ${info.icon} text-2xl mb-1`}></i>
                                              {day.pop !== '-' && (
                                                  <span className="text-[10px] font-bold text-blue-400 bg-blue-900/30 px-1.5 rounded-full">
                                                      <i className="fas fa-umbrella mr-1"></i>{day.pop}
                                                  </span>
                                              )}
                                         </div>

                                         {/* Temps & Desc */}
                                         <div className="flex flex-col items-end w-1/3">
                                              <div className="flex items-center gap-1 font-mono font-bold text-base">
                                                  <span className="text-blue-300">{day.minTemp}</span>
                                                  <span className="text-gray-600">/</span>
                                                  <span className="text-red-300">{day.maxTemp}</span>
                                              </div>
                                              <span className="text-[10px] text-gray-500 text-right line-clamp-1 max-w-full">
                                                  {day.text}
                                              </span>
                                         </div>
                                     </div>
                                 );
                             })}
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default WeatherWidget;