import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  MX_PALETTE_CSS_VARS,
  MX_PALETTE_LIGHT,
  MX_THEMES,
  MxPalette,
  MxThemeId,
  MxThemeMeta,
} from '../tokens/mx-palette';

export interface MxThemeOptions {
  /** Named built-in theme id */
  themeId?: MxThemeId | string;
  /** Partial or full palette override — wins over the named theme */
  palette?: Partial<MxPalette>;
  /** Element that receives CSS variables. Defaults to documentElement. */
  target?: HTMLElement;
  /** Optional density token: comfortable | compact | dense */
  density?: 'comfortable' | 'compact' | 'dense';
  /** Optional radius scale in px */
  radius?: number;
  /** Optional font stack */
  fontFamily?: string;
}

@Injectable({ providedIn: 'root' })
export class MxThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themeSubject = new BehaviorSubject<MxThemeMeta>({
    id: 'light',
    name: 'Drive Light',
    mode: 'light',
    palette: { ...MX_PALETTE_LIGHT },
  });

  readonly theme$ = this.themeSubject.asObservable();

  get current(): MxThemeMeta {
    return this.themeSubject.value;
  }

  /** Returns the two primary themes: light and dark. */
  listThemes(): MxThemeMeta[] {
    return [MX_THEMES['light'], MX_THEMES['dark']];
  }

  /** Apply a named theme and optional consumer overrides. */
  apply(options: MxThemeOptions = {}): MxThemeMeta {
    const base = MX_THEMES[options.themeId ?? 'light'] ?? MX_THEMES['light'];
    const palette: MxPalette = {
      ...base.palette,
      ...(options.palette ?? {}),
    };
    const meta: MxThemeMeta = {
      id: base.id,
      name: options.palette ? `${base.name} (custom)` : base.name,
      mode: base.mode,
      palette,
    };

    const target = options.target ?? this.document.documentElement;
    this.writePalette(target, palette);
    target.setAttribute('data-mx-theme', meta.id);
    target.setAttribute('data-mx-mode', meta.mode);
    target.style.colorScheme = meta.mode;

    if (options.density) {
      target.style.setProperty('--mx-density', options.density);
      const scale =
        options.density === 'dense' ? '0.85' : options.density === 'compact' ? '0.92' : '1';
      target.style.setProperty('--mx-density-scale', scale);
    }
    if (options.radius != null) {
      target.style.setProperty('--mx-radius', `${options.radius}px`);
      target.style.setProperty('--mx-radius-lg', `${options.radius + 2}px`);
    }
    if (options.fontFamily) {
      target.style.setProperty('--mx-font', options.fontFamily);
    }

    this.themeSubject.next(meta);
    return meta;
  }

  /** Replace or patch only palette fields at runtime. */
  setPalette(partial: Partial<MxPalette>, target?: HTMLElement): MxThemeMeta {
    return this.apply({
      themeId: this.current.id,
      palette: { ...this.current.palette, ...partial },
      target,
    });
  }

  private writePalette(target: HTMLElement, palette: MxPalette): void {
    (Object.keys(MX_PALETTE_CSS_VARS) as (keyof MxPalette)[]).forEach((key) => {
      target.style.setProperty(MX_PALETTE_CSS_VARS[key], palette[key]);
    });

    // Bridge into Angular Material system tokens when present
    target.style.setProperty('--mat-sys-primary', palette.primary);
    target.style.setProperty('--mat-sys-on-primary', palette.primaryContrast);
    target.style.setProperty('--mat-sys-secondary', palette.accent);
    target.style.setProperty('--mat-sys-error', palette.warn);
    target.style.setProperty('--mat-sys-surface', palette.surface);
    target.style.setProperty('--mat-sys-surface-container', palette.surface);
    target.style.setProperty('--mat-sys-surface-container-low', palette.bg);
    target.style.setProperty('--mat-sys-surface-container-high', palette.surfaceElevated);
    target.style.setProperty('--mat-sys-surface-container-highest', palette.surfaceElevated);
    target.style.setProperty('--mat-sys-on-surface', palette.text);
    target.style.setProperty('--mat-sys-on-surface-variant', palette.textMuted);
    target.style.setProperty('--mat-sys-background', palette.bg);
    target.style.setProperty('--mat-sys-outline', palette.border);
    target.style.setProperty('--mat-sys-outline-variant', palette.border);
  }
}
