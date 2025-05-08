import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { SettingsService } from "../../services/settings";
import { THEMES, ThemeService } from "../../services/theme";

@Component({
  selector: "delete-task-dialog",
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatListModule,
  ],
  templateUrl: "./theme-select-dialog.component.html",
  styleUrl: "./theme-select-dialog.component.scss",
})
export class ThemeSelectDialog {
  readonly dialog = inject(MatDialogRef<ThemeSelectDialog>);
  readonly service = inject(ThemeService);
  readonly settings = inject(SettingsService);
  readonly themes = THEMES;
}
