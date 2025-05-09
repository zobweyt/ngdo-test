import { TaskService } from "@/entities/task";
import { NgdTaskCreateForm } from "@/features/task/create";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { TaskListComponent } from "@/widgets/task/task-list/task-list.component";
import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "ngd-today",
  imports: [
    MatButtonModule,
    MatIconModule,
    NgdPlaceholderModule,
    NgdTaskCreateForm,
    TaskListComponent,
  ],
  templateUrl: "./today.component.html",
  styleUrl: "./today.component.scss",
})
export class TodayComponent {
  readonly taskService = inject(TaskService);
  readonly tasks = computed(() => this.taskService.todayTasks());
}
