import { TaskService } from "@/entities/task";
import { NgdTaskDeleteService } from "@/features/task/delete";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { NgdTaskList } from "@/widgets/task/list";
import { NgdToolbar } from "@/widgets/toolbar/component";
import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

@Component({
  selector: "ngd-completed",
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    NgdPlaceholderModule,
    NgdToolbar,
    RouterLink,
    NgdTaskList,
  ],
  templateUrl: "./completed.component.html",
  styleUrl: "./completed.component.scss",
})
export class CompletedComponent {
  readonly taskService = inject(TaskService);
  readonly taskDeleteService = inject(NgdTaskDeleteService);
  readonly tasks = computed(() => this.taskService.completedTasks());
}
