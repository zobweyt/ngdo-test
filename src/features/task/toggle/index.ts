import { SettingsService } from "@/entities/settings";
import { Task, TaskService } from "@/entities/task";
import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class NgdTaskToggleService {
  private readonly service = inject(TaskService);
  private readonly settings = inject(SettingsService);
  private readonly snackBar = inject(MatSnackBar);

  private completeTasks: Task[] = [];
  private completeTasksTimeout: NodeJS.Timeout | null = null;

  public updateTaskCompleted(id: string | null, value: boolean): void {
    const task = this.service.getTaskById(id);

    if (!task) {
      return;
    }
    if (!this.completeTasks.includes(task)) {
      this.completeTasks.push(task);
    }
    if (this.completeTasksTimeout) {
      clearTimeout(this.completeTasksTimeout);
    }

    this.completeTasksTimeout = setTimeout(() => {
      for (const deleteTask of this.completeTasks) {
        this.service.updateTask({ ...deleteTask, completed: value });
      }

      if (this.settings.showTaskCompletionSnackbar) {
        if (this.completeTasks.length === 1) {
          const bar = this.snackBar.open(
            `Task "${task.title}" completed!`,
            "Cancel",
            { duration: 3000 },
          );
          bar.onAction().subscribe(() => {
            task.completed = task.completed;
            this.service.updateTask(task);
          });
        } else {
          const bar = this.snackBar.open(
            `${this.completeTasks.length} tasks completed!`,
            "Cancel",
            { duration: 3000 },
          );
          const cached = structuredClone(this.completeTasks);
          bar.onAction().subscribe(() => {
            for (const completeTask of cached) {
              completeTask.completed = completeTask.completed;
              this.service.updateTask(completeTask);
            }
          });
        }
      }

      this.completeTasks = [];
    }, this.settings.delayAfterCheckMark);
  }
}
