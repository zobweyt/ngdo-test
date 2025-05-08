export type Task = {
  id: string;
  title: string;
  description?: string | null | undefined;
  completed: boolean;
  date?: Date | null | undefined;
};

export type TaskListType = "all" | "today" | "completed" | "active";
