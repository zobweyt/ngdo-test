import { effect, Injectable } from "@angular/core";
import { store } from "../../lib/store";
import {
  DEFAULT_SETTINGS,
  LOCAL_STORAGE_SETTINGS_KEY,
} from "./settings.constants";
import { Settings } from "./settings.model";

@Injectable({ providedIn: "root" })
export class SettingsService {
  private state = store<Settings>(this.load());

  constructor() {
    effect(() => {
      this.save(this.state());
    });

    (Object.keys(this.state()) as Array<keyof Settings>).forEach(
      <K extends keyof Settings>(key: K) => {
        Object.defineProperty(this, key, {
          get: () => this.state[key],
          set: (value: Settings[K]) => ((this.state as Settings)[key] = value),
          enumerable: true,
          configurable: false,
        });
      },
    );
  }

  protected load(): Settings {
    try {
      const settings = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      if (settings) {
        return { ...DEFAULT_SETTINGS, ...(JSON.parse(settings) as Settings) };
      }
    } catch (error) {
      console.error("Failed to load settings from local storage", error);
    }
    return DEFAULT_SETTINGS;
  }

  protected save(settings: Settings): void {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  }
}

declare module "./settings.service" {
  interface SettingsService extends Settings {}
}
