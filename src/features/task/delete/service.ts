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

  public deleteTask(tasks: Task[]) {
    if (this.settings.confirmTaskDeletion || tasks.length !== 1) {
      this.tryDeleteTask(tasks);
    } else {
      this.forceDeleteTask(tasks);
    }
  }

  private tryDeleteTask(tasks: Task[]) {
    const dialog = this.dialog.open(NgdTaskDeleteDialog, {
      data: { tasks },
    });

    dialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.forceDeleteTask(tasks);
      }
    });
  }

  private forceDeleteTask(tasks: Task[]) {
    this.service.deleteTasksByIds(tasks.map(({ id }) => id));

    if (this.settings.showTaskDeletionSnackbar || tasks.length !== 1) {
      this.openTaskDeleteSnackBar(tasks);
    }
  }

  private openTaskDeleteSnackBar(tasks: Task[]) {
    const snackBar = this.snackBar.openFromComponent(NgdTaskDeleteSnackBar, {
      data: { tasks },
    });

    snackBar.onAction().subscribe(() => {
      tasks.forEach((task) => this.service.addTask(task));
    });
  }
}
