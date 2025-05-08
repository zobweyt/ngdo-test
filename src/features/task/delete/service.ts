import { SettingsService } from "@/entities/settings";
import { Task, TaskService } from "@/entities/task";
import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgdTaskDeleteDialog } from "./dialog/component";
import { NgdTaskDeleteSnackBar } from "./snack-bar/component";

@Injectable({ providedIn: "root" })
export class NgdTaskDeleteService {
  private readonly dialog = inject(MatDialog);
  private readonly service = inject(TaskService);
  private readonly settings = inject(SettingsService);
  private readonly snackBar = inject(MatSnackBar);

  public deleteTask(task: Task) {
    if (this.settings.confirmTaskDeletion) {
      this.tryDeleteTask(task);
    } else {
      this.forceDeleteTask(task);
    }
  }

  private tryDeleteTask(task: Task) {
    const dialog = this.dialog.open(NgdTaskDeleteDialog, {
      data: { task: task },
    });

    dialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.forceDeleteTask(task);
      }
    });
  }

  private forceDeleteTask(task: Task) {
    this.service.deleteTaskById(task.id);

    if (this.settings.showTaskDeletionSnackbar) {
      this.openTaskDeleteSnackBar(task);
    }
  }

  private openTaskDeleteSnackBar(task: Task) {
    const snackBar = this.snackBar.openFromComponent(NgdTaskDeleteSnackBar, {
      data: { task },
    });

    snackBar.onAction().subscribe(() => {
      this.service.addTask(task);
    });
  }
}
