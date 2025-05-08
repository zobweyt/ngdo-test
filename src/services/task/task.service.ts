import { SettingsService } from "@/services/settings";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskListType } from "./task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  readonly settings = inject(SettingsService);

  readonly selectedTask = signal<Task | null>(null);
  readonly tasks = signal<Task[]>(this.loadTasks());
  readonly completedTasks = computed<Task[]>(() =>
    this.tasks().filter((task) => task.completed)
  );
  readonly activeTasks = computed<Task[]>(() =>
    this.tasks().filter((task) => !task.completed)
  );
  readonly todayTasks = computed<Task[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to the start of tomorrow

    return this.activeTasks().filter((task) => {
      const taskDate = task.date ? new Date(task.date) : null;
      return taskDate && taskDate >= today && taskDate < tomorrow;
    });
  });

  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private lists: Record<TaskListType, () => Task[]> = {
    "all": () => this.tasks(),
    "today": () => this.todayTasks(),
    "completed": () => this.completedTasks(),
    "active": () => this.activeTasks(),
  };

  constructor() {
    this.loadTasks();

    effect(() => {
      localStorage.setItem("tasks", JSON.stringify(this.tasks()));
    });

    effect(() => {
      const task = this.selectedTask();

      if (task && !this.tasks().map((task) => task.id).includes(task.id)) {
        this.selectedTask.set(null);
      }
    });
  }

  isSelectedTask(task: Task) {
    return this.selectedTask()?.id === task.id;
  }

  getTasks(type: TaskListType = "all"): Task[] {
    return this.lists[type]();
  }

  addTask(newTask: string | Task) {
    const t: Task = typeof newTask === "string"
      ? {
        id: uuidv4(),
        title: newTask.trim(),
        completed: false,
      }
      : newTask;

    this.tasks.set([t, ...this.tasks()]);
  }

  getTaskById(id: string | null): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }

  editTask(id: string | null) {
    const task = this.getTaskById(id);

    if (!task) {
      return;
    }

    this.selectedTask.set(task);
  }

  loadTasks(): Task[] {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks);
      } catch {
        return [];
      }
    }
    return [];
  }

  public deleteTaskById(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasks();
    const taskIndex = currentTasks.findIndex((task) =>
      task.id === updatedTask.id
    );

    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.tasks.set([...currentTasks]);
    }
  }

  private completeTasks: Task[] = [];
  private completeTasksTimeout: NodeJS.Timeout | null = null;

  updateTaskCompleted(id: string | null, value: boolean) {
    const task = this.getTaskById(id);

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
        this.updateTask({ ...deleteTask, completed: value });
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
            this.updateTask(task);
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
              this.updateTask(completeTask);
            }
          });
        }
      }

      this.completeTasks = [];
    }, this.settings.delayAfterCheckMark);
  }

  deleteCompleted() {
    this.tasks.set(this.activeTasks());
  }

  getTasksLengthByRouteName(path: string | undefined): number | undefined {
    switch (path) {
      case "":
        return this.activeTasks().length || undefined;
      case "today":
        return this.todayTasks().length || undefined;
      case "completed":
        return this.completedTasks().length || undefined;
      default:
        return undefined;
    }
  }

  resetSelectedTask() {
    requestAnimationFrame(() => {
      this.selectedTask.set(null);
    });
  }
}
