export type NavItem = readonly [string, string];

export const navItems: readonly NavItem[] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Properties", "/properties"],
  ["Blog", "/blog"],
  ["Agents", "/agents"],
  ["Contact", "/contact"],
] as const;