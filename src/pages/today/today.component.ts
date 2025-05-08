import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { NgdPlaceholderModule } from "../../components/placeholder";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskService } from "../../services/task/task.service";

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
