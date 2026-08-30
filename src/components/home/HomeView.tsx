import { ArrowRight, Layers, Clock, Mic, BookOpen } from 'lucide-react';
import type { TopicCategory } from '../../types';
import { CATEGORIES } from '../../data/categories';

interface HomeViewProps {
  onDraw: () => void;
  onNavigateHistory?: () => void;
  onOpenSettings?: () => void;
  onSelectCategory: (category: TopicCategory | 'all') => void;
  totalAvailable: number;
  selectedCategories: TopicCategory[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onDraw,
  onSelectCategory,
  selectedCategories
}) => {
  const isAllSelected = selectedCategories.length === 0;

  const categoryFilterLabel =
    isAllSelected
      ? 'All Categories'
      : selectedCategories.length === 1
      ? CATEGORIES[selectedCategories[0]]?.title || '1 Category'
      : `${selectedCategories.length} Categories`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-8 py-4 sm:py-8 max-w-5xl mx-auto w-full animate-fade-in relative z-10">
      {/* Editorial Tagline */}
      <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)] text-xs font-semibold uppercase tracking-widest shadow-sm">
        <span>Legal Thinking & Speaking Gym</span>
      </div>

      {/* Main Hero Heading */}
      <h1 className="heading-hero text-[var(--text-primary)] mb-14 tracking-tight">
        Think. Research. Speak.
      </h1>

      {/* 3-Step Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-14 text-left">
        <div className="glass-card p-6 sm:p-7 flex items-start gap-4 border border-[var(--glass-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              1. Draw Concept
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Random legal theory, landmark case, maxim, or fallacy.
            </p>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-7 flex items-start gap-4 border border-[var(--glass-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5 shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              2. 10-Min Research
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Deep dive into legal theory & research analysis.
            </p>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-7 flex items-start gap-4 border border-[var(--glass-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5 shadow-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              3. 60-Sec Synthesis
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Explain clearly as if advocating to a bench or client.
            </p>
          </div>
        </div>
      </div>

      {/* Glassmorphic Category Selection Menu Bar */}
      <div className="w-full max-w-4xl mx-auto mb-14">
        <div className="flex items-center justify-between mb-3 px-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-2 font-mono">
            <Layers className="w-4 h-4 text-[var(--accent)]" />
            Select Practice Category
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 max-h-56 overflow-y-auto p-6 glass-panel border border-[var(--glass-border)] rounded-2xl shadow-xl">
          {/* All Categories Option */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              isAllSelected
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg scale-105'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
            }`}
          >
            ✨ All Categories
          </button>

          {/* Individual Categories */}
          {Object.values(CATEGORIES).map((cat) => {
            if (cat.id === 'mixed') return null;
            const isSelected =
              selectedCategories.length === 1 && selectedCategories[0] === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4.5 py-2 rounded-full text-xs transition-all cursor-pointer border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg scale-105 font-semibold'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] font-medium'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : cat.color }}
                />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onDraw}
          className="btn-primary group text-xl px-16 py-5 shadow-2xl relative overflow-hidden cursor-pointer rounded-full"
          style={{ minWidth: '280px' }}
        >
          <span className="relative z-10 font-serif tracking-wide font-semibold text-2xl flex items-center justify-center gap-3">
            DRAW TOPIC
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform text-white" />
          </span>
        </button>

        <span className="text-xs text-[var(--text-tertiary)] font-medium tracking-wide">
          Drawing from: <strong className="text-[var(--accent)] font-semibold">{categoryFilterLabel}</strong>
        </span>
      </div>
    </div>
  );
};
