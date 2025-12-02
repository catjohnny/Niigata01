import React, { useState } from 'react';
import PlanView from './components/PlanView';
import WalletView from './components/WalletView';
import ListsView from './components/ListsView';
import InfoView from './components/InfoView';

type ViewType = 'PLAN' | 'WALLET' | 'LISTS' | 'INFO';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('PLAN');

  const renderView = () => {
    switch (currentView) {
      case 'PLAN': return <PlanView />;
      case 'WALLET': return <WalletView />;
      case 'LISTS': return <ListsView />;
      case 'INFO': return <InfoView />;
      default: return <PlanView />;
    }
  };

  const NavItem = ({ view, icon, label }: { view: ViewType; icon: string; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-300 ${
        currentView === view ? 'text-gold-400' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <i className={`fas ${icon} text-lg mb-1`}></i>
      <span className="text-[10px] tracking-widest font-sans font-bold">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-luxury-black text-white overflow-hidden">
      {/* Top Bar */}
      <header className="flex-none px-6 py-4 bg-luxury-charcoal border-b border-gold-400/20 shadow-lg z-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif text-gold-400 tracking-wider">NIIGATA</h1>
          <p className="text-[10px] text-gray-400 font-sans tracking-[0.2em] uppercase">2026 冬季奢華之旅</p>
        </div>
        <div className="w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center">
            <i className="fas fa-snowflake text-gold-400 text-xs animate-pulse"></i>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-luxury-black scroll-smooth">
        <div className="pb-20"> 
          {renderView()}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="flex-none fixed bottom-0 w-full bg-luxury-charcoal border-t border-gold-400/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] pb-safe z-50">
        <div className="flex justify-around items-center px-2">
          <NavItem view="PLAN" icon="fa-calendar-days" label="行程" />
          <NavItem view="WALLET" icon="fa-wallet" label="記帳" />
          <NavItem view="LISTS" icon="fa-list-check" label="清單" />
          <NavItem view="INFO" icon="fa-circle-info" label="資訊" />
        </div>
      </nav>
    </div>
  );
};

export default App;
