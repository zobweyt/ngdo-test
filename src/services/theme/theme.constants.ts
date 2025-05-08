import { Theme } from "./theme.model";

export const THEMES = ["light", "dark", "system"] as const;

export const THEME_DISPLAY_NAMES: Record<Theme, string> = {
  "light": "Light",
  "dark": "Dark",
  "system": "System",
};
