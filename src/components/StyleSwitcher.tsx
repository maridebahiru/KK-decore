import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Moon, Palette, Sun, X } from 'lucide-react';
import { THEME_STYLES, useTheme } from '../context/ThemeContext';

export const StyleSwitcher: React.FC = () => {
  const { mode, style, toggleMode, setStyle, activeStyleMeta } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="style-switcher-panel"
            aria-label="Design Template and Theme Switcher"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[min(calc(100vw-2rem),310px)] border border-[var(--border-strong)] bg-[var(--surface)] p-4 text-[var(--text)] shadow-[var(--shadow)]"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  Visual Style
                </p>
                <p className="font-display text-lg font-semibold leading-tight text-[var(--text)]">
                  Select Template
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close style switcher"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text)] hover:border-[var(--accent-2)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* 4 Templates Grid */}
            <div className="mt-3 space-y-2" role="radiogroup" aria-label="Visual template">
              {THEME_STYLES.map((item) => {
                const isSelected = style === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setStyle(item.id)}
                    className={`flex min-h-[48px] w-full items-center justify-between gap-3 border px-3 py-2.5 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--surface-alt)]'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                    }`}
                    style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-xs font-semibold text-[var(--text)]">
                          {item.name}
                        </span>
                        {isSelected && (
                          <Check
                            className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Live Preview Swatches */}
                    <div className="flex shrink-0 items-center -space-x-1" aria-hidden="true">
                      {item.swatches.map((hex, i) => (
                        <span
                          key={`${item.id}-${i}`}
                          className="h-4 w-4 rounded-full border border-black/20 dark:border-white/25"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Light / Dark Mode Switch */}
            <div className="mt-3 border-t border-[var(--border)] pt-3">
              <button
                type="button"
                onClick={toggleMode}
                className="flex min-h-[44px] w-full items-center justify-between border border-[var(--border)] bg-[var(--surface-alt)] px-3.5 py-2 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent-2)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <span>Appearance Mode</span>
                <span className="inline-flex items-center gap-1.5 text-[var(--accent)]">
                  {mode === 'dark' ? (
                    <>
                      <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Light</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Collapsible Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={isOpen}
        aria-controls="style-switcher-panel"
        aria-label={`Customize visual template (current: ${activeStyleMeta.name})`}
        className="inline-flex min-h-[44px] items-center gap-2.5 border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text)] shadow-[var(--shadow)] hover:border-[var(--accent)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        style={{ borderRadius: 'var(--radius-btn)' }}
      >
        <Palette className="h-4 w-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline whitespace-nowrap">{activeStyleMeta.name}</span>
        <span className="flex items-center gap-0.5" aria-hidden="true">
          <span
            className="h-2.5 w-2.5 rounded-full border border-black/15"
            style={{ backgroundColor: activeStyleMeta.swatches[1] }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full border border-black/15"
            style={{ backgroundColor: activeStyleMeta.swatches[2] }}
          />
        </span>
      </motion.button>
    </div>
  );
};
