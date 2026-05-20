/**
 * Shiksha Intelligence — Color Design Tokens
 *
 * Derived from the official design theme:
 *   Primary   #0F172A  (Dark Navy)
 *   Secondary #2DD4BF  (Teal / Cyan)
 *   Tertiary  #231500  (Dark Brown)
 *   Neutral   #64748B  (Slate Grey)
 */

export const colors = {
  // ─── Primary palette (Dark Navy) ─────────────────────────────────────────
  primary: {
    DEFAULT: "#0F172A",
    50: "#E8EAF0",
    100: "#C5CAD8",
    200: "#9EA8BC",
    300: "#7786A0",
    400: "#586A8C",
    500: "#3A4E78",
    600: "#2D3D65",
    700: "#1E2D52",
    800: "#0F172A", // base
    900: "#070D1A",
    foreground: "#FFFFFF",
  },

  // ─── Secondary palette (Teal / Cyan) ─────────────────────────────────────
  secondary: {
    DEFAULT: "#2DD4BF",
    50: "#E6FAF8",
    100: "#C3F4EF",
    200: "#9AEDE5",
    300: "#6BE5D9",
    400: "#46DCCF",
    500: "#2DD4BF", // base
    600: "#1DB8A5",
    700: "#148A7D",
    800: "#0D5C54",
    900: "#072E2A",
    foreground: "#0F172A",
  },

  // ─── Tertiary palette (Dark Brown / Warm) ────────────────────────────────
  tertiary: {
    DEFAULT: "#231500",
    50: "#FDF8F0",
    100: "#F5E8CC",
    200: "#E8CC9E",
    300: "#D4A96A",
    400: "#BC8840",
    500: "#8A6020",
    600: "#5C3D0E",
    700: "#3A2308",
    800: "#231500", // base
    900: "#100900",
    foreground: "#FFFFFF",
  },

  // ─── Neutral palette (Slate Grey) ────────────────────────────────────────
  neutral: {
    DEFAULT: "#64748B",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B", // base
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    foreground: "#FFFFFF",
  },

  // ─── Semantic / Surface ───────────────────────────────────────────────────
  background: {
    DEFAULT: "#FFFFFF",
    card: "#FFFFFF",
    surface: "#F8F9FF",
  },

  // ─── Status ───────────────────────────────────────────────────────────────
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

export type ColorToken = typeof colors;
