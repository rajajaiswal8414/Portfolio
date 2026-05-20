/**
 * Shiksha Intelligence — Typography Design Tokens
 *
 * Headline font : Plus Jakarta Sans  (display / headings)
 * Body font     : Inter              (body / labels / captions)
 */

export const fontFamilies = {
  // Plus Jakarta Sans — headlines
  headline: {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semiBold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
    extraBold: "PlusJakartaSans_800ExtraBold",
  },

  // Inter — body & labels
  body: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
} as const;

/**
 * Font-size reference (in px).
 * NOTE: Do NOT use text-md — Tailwind v4 has no such utility.
 *       16px body text → text-base
 */
export const fontSizes = {
  xs: 10,    // text-xs
  sm: 12,    // text-sm
  base: 14,  // text-base  (NativeWind default base)
  lg: 18,    // text-lg
  xl: 20,    // text-xl
  "2xl": 24, // text-2xl
  "3xl": 30, // text-3xl
  "4xl": 36, // text-4xl
  "5xl": 48, // text-5xl
} as const;

/** Font weight constants */
export const fontWeights = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
} as const;

/** Line height scale */
export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;
