import { effect, inject, Injectable } from "@angular/core";
import { ColorSchemeService } from "../color-scheme";
import { SettingsService } from "../settings/settings.service";
import { THEME_DISPLAY_NAMES } from "./theme.constants";
import { Theme } from "./theme.model";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private settings = inject(SettingsService);
  private colorScheme = inject(ColorSchemeService);

  public get value(): Theme {
    return this.settings.theme;
  }

  public get preferred(): Theme {
    return this.value === "system" ? this.colorScheme.preferred() : this.value;
  }

  constructor() {
    effect(() => {
      document.documentElement.dataset["theme"] = this.preferred;
    });
  }

  public getThemeDisplayName(theme: Theme): string {
    return THEME_DISPLAY_NAMES[theme];
  }
}
