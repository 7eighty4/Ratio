import React from 'react';
import { History, Sliders, Sun, Moon } from 'lucide-react';
import type { AppPhase, UserPreferences } from '../../types';

interface HeaderProps {
  currentPhase: AppPhase;
  onNavigate: (phase: AppPhase) => void;
  onOpenSettings: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhase,
  onNavigate,
  onOpenSettings,
  preferences,
  onUpdatePreferences
}) => {
  const toggleTheme = () => {
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    onUpdatePreferences({ theme: nextTheme });
  };

  return (
    <header className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3 z-20 relative">
      <div className="w-full flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 bg-transparent border-none cursor-pointer text-left focus:outline-none shrink-0"
          aria-label="Ratio Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] font-serif font-bold text-lg sm:text-xl group-hover:scale-105 transition-transform shrink-0">
            R
          </div>
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)] block leading-none">
            Ratio
          </span>
        </button>

        {/* Desktop / Tablet Center Creator Credit */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-xs text-[var(--text-secondary)] font-medium select-none pointer-events-auto">
          <span className="opacity-80">made by</span>
          <a
            href="https://www.instagram.com/just.mayur.784?igsi=YXJpemt5bXFpdm93"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent-border)] backdrop-blur-md shadow-sm hover:scale-105 transition-all group font-mono text-xs font-semibold no-underline"
            title="Open Instagram Profile @just.mayur.784"
          >
            <svg className="w-3.5 h-3.5 text-[var(--accent)] group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>@just.mayur.784</span>
          </a>
        </div>

        {/* Navigation Controls */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('history')}
            className={`btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 ${
              currentPhase === 'history' ? 'border-[var(--accent)] text-[var(--accent)]' : ''
            }`}
            title="Session History"
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">History</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="btn-icon p-2 sm:p-2.5"
            title="Preferences & Settings"
            aria-label="Settings"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="btn-icon p-2 sm:p-2.5"
            title={`Switch to ${preferences.theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {preferences.theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile-Only Compact Creator Credit Badge */}
      <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-[var(--text-secondary)] font-medium select-none pt-0.5">
        <span className="opacity-75">made by</span>
        <a
          href="https://www.instagram.com/just.mayur.784?igsi=YXJpemt5bXFpdm93"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:text-[var(--accent)] backdrop-blur-md font-mono text-[11px] font-semibold no-underline"
          title="Open Instagram Profile @just.mayur.784"
        >
          <svg className="w-3 h-3 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span>@just.mayur.784</span>
        </a>
      </div>
    </header>
  );
};
