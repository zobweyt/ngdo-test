import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { TaskListComponent } from "@/widgets/task/task-list/task-list.component";
import { TaskService } from "@/entities/task";
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
