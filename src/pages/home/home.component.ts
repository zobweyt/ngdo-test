import { TaskService } from "@/entities/task";
import { NgdTaskCreateForm } from "@/features/task/create";
import { fade } from "@/shared/lib/animations";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { NgdTaskList } from "@/widgets/task/list";
import { NgdToolbar } from "@/widgets/toolbar/component";
import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "ngd-home",
  imports: [
    MatButtonModule,
    MatIconModule,
    NgdPlaceholderModule,
    NgdTaskCreateForm,
    NgdToolbar,
    NgdTaskList,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  animations: [fade],
})
export class HomeComponent {
  readonly taskService = inject(TaskService);
  readonly tasks = computed(() => this.taskService.activeTasks());
}
