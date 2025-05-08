import { ThemeSelectDialog } from "@/components/theme-select-dialog/theme-select-dialog.component";
import { SettingsService } from "@/services/settings/settings.service";
import { THEMES, ThemeService } from "@/services/theme";
import { Component, inject } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: "ngd-settings",
  imports: [
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  readonly theme = inject(ThemeService);
  readonly settings = inject(SettingsService);
  readonly dialog = inject(MatDialog);

  readonly themes = THEMES;

  openThemeSelectDialog() {
    this.dialog.open(ThemeSelectDialog);
  }
}
