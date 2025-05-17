import { Task, TaskService } from "@/entities/task";
import { effect, inject, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NgdTaskSelectService {
  private readonly service = inject(TaskService);

  readonly selectedTask = signal<Task | null>(null);

  constructor() {
    effect(() => {
      const task = this.selectedTask();
      if (task && !this.service.tasks().some(({ id }) => id === task.id)) {
        this.selectedTask.set(null);
      }
    });
  }

  public isSelectedTaskId(id: string | null): boolean {
    return this.selectedTask()?.id === id;
  }

  public select(id: string | null): void {
    const task = this.service.getTaskById(id);

    if (!task) {
      return;
    }

    this.selectedTask.set(task);
  }

  public resetSelectedTask(): void {
    requestAnimationFrame(() => {
      this.selectedTask.set(null);
    });
  }
}
