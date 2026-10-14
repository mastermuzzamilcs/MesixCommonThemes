/** Semantic color tokens for Mesix themes. Consumers may override any field. */
export interface MxPalette {
  primary: string;
  primaryContrast: string;
  accent: string;
  warn: string;
  success: string;
  warning: string;
  bg: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  overlay: string;
  overlayLight: string;
  successBg: string;
  successBorder: string;
  warningBg: string;
  warningBorder: string;
  errorBg: string;
  errorBorder: string;
  focusRing: string;
}

export interface MxThemeMeta {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  palette: MxPalette;
}

/**
 * Google Drive — Light
 * Brand Blue #1A73E8 | Surface #FFFFFF | Canvas #F8F9FA | Ink #202124
 */
export const MX_PALETTE_LIGHT: MxPalette = {
  primary: '#1A73E8',
  primaryContrast: '#ffffff',
  accent: '#1967D2',
  warn: '#D93025',
  success: '#188038',
  warning: '#F9AB00',
  bg: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#202124',
  textMuted: '#5F6368',
  border: '#DADCE0',
  overlay: 'rgba(32, 33, 36, 0.48)',
  overlayLight: 'rgba(32, 33, 36, 0.24)',
  successBg: '#E6F4EA',
  successBorder: '#A8DAB5',
  warningBg: '#FEF7E0',
  warningBorder: '#FDD663',
  errorBg: '#FCE8E6',
  errorBorder: '#F6AEA9',
  focusRing: 'rgba(26, 115, 232, 0.28)',
};

/**
 * Google Drive — Dark
 * Brand Blue #8AB4F8 | Surface #2D2E30 | Canvas #1B1B1B | Ink #E8EAED
 */
export const MX_PALETTE_DARK: MxPalette = {
  primary: '#8AB4F8',
  primaryContrast: '#062e6f',
  accent: '#AECBFA',
  warn: '#F28B82',
  success: '#81C995',
  warning: '#FDD663',
  bg: '#1B1B1B',
  surface: '#2D2E30',
  surfaceElevated: '#35363A',
  text: '#E8EAED',
  textMuted: '#9AA0A6',
  border: '#3C4043',
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',
  successBg: '#0D3B1E',
  successBorder: '#137333',
  warningBg: '#3C2F00',
  warningBorder: '#F9AB00',
  errorBg: '#3C1210',
  errorBorder: '#D93025',
  focusRing: 'rgba(138, 180, 248, 0.35)',
};

/** @deprecated Use MX_PALETTE_LIGHT */
export const MX_PALETTE_MATERIAL = MX_PALETTE_LIGHT;
/** @deprecated Use MX_PALETTE_LIGHT */
export const MX_PALETTE_CORPORATE = MX_PALETTE_LIGHT;
/** @deprecated Use MX_PALETTE_LIGHT */
export const MX_PALETTE_SLATE = MX_PALETTE_LIGHT;
/** @deprecated Use MX_PALETTE_LIGHT */
export const MX_PALETTE_INDIGO = MX_PALETTE_LIGHT;
/** @deprecated Use MX_PALETTE_DARK */
export const MX_PALETTE_NIGHT = MX_PALETTE_DARK;

/** Primary themes: light + dark (Google Drive style) */
export const MX_THEMES: Record<string, MxThemeMeta> = {
  light: { id: 'light', name: 'Drive Light', mode: 'light', palette: MX_PALETTE_LIGHT },
  dark: { id: 'dark', name: 'Drive Dark', mode: 'dark', palette: MX_PALETTE_DARK },
  // Aliases so older themeIds keep working
  material: { id: 'light', name: 'Drive Light', mode: 'light', palette: MX_PALETTE_LIGHT },
  corporate: { id: 'light', name: 'Drive Light', mode: 'light', palette: MX_PALETTE_LIGHT },
  slate: { id: 'light', name: 'Drive Light', mode: 'light', palette: MX_PALETTE_LIGHT },
  indigo: { id: 'light', name: 'Drive Light', mode: 'light', palette: MX_PALETTE_LIGHT },
  night: { id: 'dark', name: 'Drive Dark', mode: 'dark', palette: MX_PALETTE_DARK },
};

export type MxThemeId = 'light' | 'dark';

/** Maps palette fields to CSS custom property names */
export const MX_PALETTE_CSS_VARS: Record<keyof MxPalette, string> = {
  primary: '--mx-primary',
  primaryContrast: '--mx-primary-contrast',
  accent: '--mx-accent',
  warn: '--mx-warn',
  success: '--mx-success',
  warning: '--mx-warning',
  bg: '--mx-bg',
  surface: '--mx-surface',
  surfaceElevated: '--mx-surface-elevated',
  text: '--mx-text',
  textMuted: '--mx-text-muted',
  border: '--mx-border',
  overlay: '--mx-overlay',
  overlayLight: '--mx-overlay-light',
  successBg: '--mx-success-bg',
  successBorder: '--mx-success-border',
  warningBg: '--mx-warning-bg',
  warningBorder: '--mx-warning-border',
  errorBg: '--mx-error-bg',
  errorBorder: '--mx-error-border',
  focusRing: '--mx-focus-ring',
};
