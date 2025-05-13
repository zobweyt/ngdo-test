import { routes } from "@/app/app.routes";
import { TaskService } from "@/entities/task";
import { fade } from "@/shared/lib/animations";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "ngd-task-nav-list",
  templateUrl: "component.html",
  imports: [
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  animations: [fade],
})
export class NgdTaskNavList {
  public readonly items = routes.filter((route) => route.pathMatch === "full");
  private readonly service = inject(TaskService);

  getTasksLengthByRouteName(path: string | undefined): number | undefined {
    switch (path) {
      case "":
        return this.service.activeTasks().length || undefined;
      case "today":
        return this.service.todayTasks().length || undefined;
      case "completed":
        return this.service.completedTasks().length || undefined;
      default:
        return undefined;
    }
  }
}
