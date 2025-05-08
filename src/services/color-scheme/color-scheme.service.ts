import { computed, effect, Injectable, signal } from "@angular/core";
import { Theme } from "../theme";

@Injectable({ providedIn: "root" })
export class ColorSchemeService {
  readonly query = window.matchMedia("(prefers-color-scheme: dark)");
  readonly dark = signal<boolean>(this.query.matches);
  readonly light = computed<boolean>(() => !this.dark());
  readonly preferred = computed<Theme>(() => this.dark() ? "dark" : "light");

  constructor() {
    effect((onCleanup) => {
      const controller = new AbortController();

      this.query.addEventListener("change", (e) => this.dark.set(e.matches), {
        signal: controller.signal,
      });

      onCleanup(() => {
        controller.abort();
      });
    });
  }
}
