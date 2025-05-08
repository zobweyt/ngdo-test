import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { TaskListComponent } from "@/widgets/task/task-list/task-list.component";
import { TaskService } from "@/entities/task";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: "ngd-today",
  imports: [
    MatButtonModule,
    NgdPlaceholderModule,
    MatIconModule,
    RouterLink,
    TaskListComponent,
  ],
  templateUrl: "./today.component.html",
  styleUrl: "./today.component.scss",
})
export class TodayComponent {
  readonly taskService = inject(TaskService);
}
