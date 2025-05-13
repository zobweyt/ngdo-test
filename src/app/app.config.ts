import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { ThemeService } from "@/entities/theme";
import { provideNativeDateAdapter } from "@angular/material/core";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from "@angular/material/tooltip";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";

export const config: ApplicationConfig = {
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
      useValue: { duration: 3000 } satisfies Partial<MatSnackBarConfig>,
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: { showDelay: 0 } satisfies Partial<MatTooltipDefaultOptions>,
    },
  ],
};
