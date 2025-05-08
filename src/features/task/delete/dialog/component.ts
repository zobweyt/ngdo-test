import { SettingsService } from "@/services/settings/settings.service";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { NgdTaskDeleteDialogData } from "./model";

@Component({
  selector: "ngd-delete-task-dialog",
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: "./component.html",
  styleUrl: "./component.scss",
})
export class NgdTaskDeleteDialog {
  readonly data = inject<NgdTaskDeleteDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<NgdTaskDeleteDialog>);
  readonly settings = inject(SettingsService);
}
