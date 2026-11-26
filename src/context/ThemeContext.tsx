import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export type ThemeStyle = 'royal-gold' | 'garden-bloom' | 'midnight-gala' | 'modern-minimal';

export interface StyleDefinition {
  id: ThemeStyle;
  name: string;
  tagline: string;
  swatches: [string, string, string, string];
  dividerVariant: 'diamond' | 'floral' | 'gala' | 'editorial';
}

export const THEME_STYLES: StyleDefinition[] = [
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    tagline: 'Champagne, Burgundy & Ivory',
    swatches: ['#FAF7F0', '#541C2B', '#C5A46D', '#292929'],
    dividerVariant: 'diamond',
  },
  {
    id: 'garden-bloom',
    name: 'Garden Bloom',
    tagline: 'Sage, Blush, Cream & Forest',
    swatches: ['#F9F5F0', '#2D5A43', '#C9827C', '#ECF1EA'],
    dividerVariant: 'floral',
  },
  {
    id: 'midnight-gala',
    name: 'Midnight Gala',
    tagline: 'Obsidian, Gold & Violet Glow',
    swatches: ['#08080F', '#E8C55A', '#A779FF', '#181728'],
    dividerVariant: 'gala',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    tagline: 'Editorial White, Black & Crimson',
    swatches: ['#FFFFFF', '#111111', '#B91C1C', '#F7F7F7'],
    dividerVariant: 'editorial',
  },
];

interface ThemeContextValue {
  mode: ThemeMode;
  style: ThemeStyle;
  /** Alias preserved for backward compatibility */
  theme: ThemeMode;
  toggleMode: () => void;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  setTheme: (mode: ThemeMode) => void;
  setStyle: (style: ThemeStyle) => void;
  activeStyleMeta: StyleDefinition;
  isSwitchingStyle: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_STORAGE_KEY = 'kk-decor-theme';
const STYLE_STORAGE_KEY = 'kk-decor-style';

const VALID_STYLES: ThemeStyle[] = [
  'royal-gold',
  'garden-bloom',
  'midnight-gala',
  'modern-minimal',
];

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }
  try {
    const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Storage unavailable
  }
  return 'light';
}

function getInitialStyle(): ThemeStyle {
  if (typeof window === 'undefined') {
    return 'royal-gold';
  }
  try {
    const stored = window.localStorage.getItem(STYLE_STORAGE_KEY) as ThemeStyle | null;
    if (stored && VALID_STYLES.includes(stored)) {
      return stored;
    }
  } catch {
    // Storage unavailable
  }
  return 'royal-gold';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [style, setStyleState] = useState<ThemeStyle>(getInitialStyle);
  const [isSwitchingStyle, setIsSwitchingStyle] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // Ignore storage write errors
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-style', style);
    try {
      window.localStorage.setItem(STYLE_STORAGE_KEY, style);
    } catch {
      // Ignore storage write errors
    }
  }, [style]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      try {
        const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
        if (!stored) {
          setModeState(event.matches ? 'dark' : 'light');
        }
      } catch {
        setModeState(event.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (next: ThemeMode) => {
    setModeState(next);
  };

  const setStyle = (next: ThemeStyle) => {
    if (next === style) return;
    setIsSwitchingStyle(true);
    setStyleState(next);
    // Automatically recommend dark mode if user switches to Midnight Gala while in light?
    // Keep user's explicit mode choice intact, only smoothly cross-fade visual transition.
    window.setTimeout(() => {
      setIsSwitchingStyle(false);
    }, 260);
  };

  const activeStyleMeta =
    THEME_STYLES.find((item) => item.id === style) ?? THEME_STYLES[0];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        style,
        theme: mode,
        toggleMode,
        toggleTheme: toggleMode,
        setMode,
        setTheme: setMode,
        setStyle,
        activeStyleMeta,
        isSwitchingStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
