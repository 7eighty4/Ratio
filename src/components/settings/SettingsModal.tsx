import { X, Sun, Moon, Volume2, Bell, Download, Trash2 } from 'lucide-react';
import type { UserPreferences } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onExportData: () => void;
  onClearData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onExportData,
  onClearData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
              Preferences & Settings
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Customize your legal gym topic pool, theme, and audio.
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close settings">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-3">
              Theme
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdatePreferences({ theme: 'light' })}
                className={`btn-secondary flex-1 text-xs py-2.5 flex items-center justify-center gap-2 ${
                  preferences.theme === 'light' ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]' : ''
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>

              <button
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`btn-secondary flex-1 text-xs py-2.5 flex items-center justify-center gap-2 ${
                  preferences.theme === 'dark' ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]' : ''
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>

          {/* Sound & Notifications */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                <Volume2 className="w-4 h-4 text-[var(--accent)]" />
                <span>Timer Sound Effects</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => onUpdatePreferences({ soundEnabled: e.target.checked })}
                className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-medium">
                <Bell className="w-4 h-4 text-[var(--accent)]" />
                <span>Browser Notifications</span>
              </div>
              <button
                onClick={() => {
                  if ('Notification' in window) {
                    Notification.requestPermission().then((perm) => {
                      onUpdatePreferences({ notificationsEnabled: perm === 'granted' });
                    });
                  }
                }}
                className="btn-secondary text-xs px-3 py-1"
              >
                {Notification.permission === 'granted' ? 'Enabled' : 'Request Access'}
              </button>
            </div>
          </div>

          {/* Data Export & Clear */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
            <button
              onClick={onExportData}
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Sessions JSON</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all practice session history?')) {
                  onClearData();
                }
              }}
              className="btn-secondary text-xs py-2.5 px-4 text-rose-500 border-rose-500/20 hover:bg-rose-500/10 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
