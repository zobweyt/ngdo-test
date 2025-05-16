import { TaskService } from "@/entities/task";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { NgdTaskToggleSnackBarData } from "./model";

@Component({
  selector: "ngd-task-toggle-snack-bar",
  templateUrl: "component.html",
  styleUrl: "component.scss",
  imports: [
    MatButtonModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
  ],
})
export class NgdTaskToggleSnackBar {
  private readonly service = inject(TaskService);
  private readonly data = inject<NgdTaskToggleSnackBarData>(MAT_SNACK_BAR_DATA);
  protected readonly ref = inject(MatSnackBarRef<NgdTaskToggleSnackBar>);
  protected readonly tasks = this.service.getTasksByIds(this.data.ids);
  protected readonly completedTasks = this.tasks.filter(({ completed }) =>
    completed
  );

  constructor() {
    this.ref.onAction().subscribe(() => {
      this.undo();
    });
  }

  protected undo(): void {
    this.service.toggle(this.data.ids);
  }

  protected get type(): "complete" | "active" | "mixed" {
    if (this.completedTasks.length === 0) {
      return "active";
    } else if (this.completedTasks.length === this.tasks.length) {
      return "complete";
    } else {
      return "mixed";
    }
  }
}
