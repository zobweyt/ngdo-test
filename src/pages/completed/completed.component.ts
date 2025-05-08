import { NgdPlaceholderModule } from "@/components/placeholder";
import { TaskListComponent } from "@/components/task-list/task-list.component";
import { TaskService } from "@/services/task";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: "ngd-completed",
  imports: [
    MatButtonModule,
    NgdPlaceholderModule,
    MatIconModule,
    RouterLink,
    TaskListComponent,
  ],
  templateUrl: "./completed.component.html",
  styleUrl: "./completed.component.scss",
})
export class CompletedComponent {
  readonly taskService = inject(TaskService);
}
