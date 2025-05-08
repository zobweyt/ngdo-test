import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { ThemeService } from "@/services/theme";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      inject(ThemeService);
    }),
    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideExperimentalZonelessChangeDetection(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
  ],
};
