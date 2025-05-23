import { computed, effect, Injectable, signal } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { LOCAL_STORAGE_TASKS_KEY } from "./task.config";
import { Task } from "./task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  readonly tasks = signal<Task[]>(this.load());
  readonly completedTasks = computed<Task[]>(() =>
    this.tasks().filter((task) => task.completed)
  );
  readonly activeTasks = computed<Task[]>(() =>
    this.tasks().filter((task) => !task.completed)
  );
  readonly todayTasks = computed<Task[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.activeTasks().filter((task) => {
      const taskDate = task.date ? new Date(task.date) : null;
      return taskDate && taskDate >= today && taskDate < tomorrow;
    });
  });

  constructor() {
    effect(() => {
      this.save(this.tasks());
    });
  }

  public createTask(title: string): void {
    this.tasks.update((prev) => [{
      id: uuidv4(),
      title: title.trim(),
      completed: false,
    }, ...prev]);
  }

  public createTaskToday(title: string): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.tasks.update((prev) => [{
      id: uuidv4(),
      title: title.trim(),
      date: today,
      completed: false,
    }, ...prev]);
  }

  public addTask(task: Task): void {
    this.tasks.update((prev) => [task, ...prev]);
  }

  public getTaskById(id: string | null): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }

  public getTasksByIds(ids: string[]): Task[] {
    return this.tasks().filter(({ id }) => ids.includes(id));
  }

  public toggle(ids: string | string[] | null): void {
    this.update(ids, ({ completed }) => ({ completed: !completed }));
  }

  public update(
    ids: string | string[] | null,
    updater: ((prev: Task) => Partial<Task>) | Partial<Task>,
  ): void {
    for (const id of Array.isArray(ids) ? ids : ids ? [ids] : []) {
      this.tasks.update((tasks) =>
        tasks.map((
          task,
        ) => (task.id === id
          ? {
            ...task,
            ...(typeof updater === "function" ? updater(task) : updater),
          }
          : task)
        )
      );
    }
  }

  public deleteTask(task: Task): void {
    this.deleteTaskById(task.id);
  }

  public deleteTaskById(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  public deleteTasks(tasks: Task[]): void {
    this.deleteTasksByIds(tasks.map(({ id }) => id));
  }

  public deleteTasksByIds(ids: string[]): void {
    this.tasks.update((tasks) => tasks.filter(({ id }) => !ids.includes(id)));
  }

  protected load(): Task[] {
    const tasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (tasks) {
      try {
        return JSON.parse(tasks);
      } catch (error) {
        console.error("Failed to load tasks from local storage", error);
      }
    }
    return [];
  }

  protected save(tasks: Task[]): void {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }
}
