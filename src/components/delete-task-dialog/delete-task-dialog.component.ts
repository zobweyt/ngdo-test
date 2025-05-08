import { SettingsService } from "@/services/settings";
import { Task } from "@/services/task";
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

export interface DialogData {
  task: Task;
}

@Component({
  selector: "delete-task-dialog",
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: "./delete-task-dialog.component.html",
  styleUrl: "./delete-task-dialog.component.scss",
})
export class DeleteTaskDialog {
  readonly dialog = inject(MatDialogRef<DeleteTaskDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly settingsService = inject(SettingsService);
}
