
export const PartyThemes = [
  "SHRIMP",
  "FROG",
  "GPIC",
  "JUNGLE",
] as const;

export type PartyTheme = typeof PartyThemes[number];

export const CakeFlavors = [
  "CHOCOLATE",
  "VANILLA",
  "STRAWBERRY"
] as const;

export type CakeFlavor = typeof CakeFlavors[number];

export const PartyAddOns = [
  "APPLAUSE",
  "CONFETTI",
  "HEARTS",
  "STARS",
  "DJ",
  "FLOWERS",
  "SURPRISECOMBO"
] as const;

export type PartyAddOn = typeof PartyAddOns[number];