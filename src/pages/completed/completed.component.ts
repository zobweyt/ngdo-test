import { TaskService } from "@/entities/task";
import { NgdTaskDeleteService } from "@/features/task/delete";
import { fade } from "@/shared/lib/animations";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { NgdTaskListModule } from "@/widgets/task/list";
import { NgdToolbar } from "@/widgets/toolbar/component";
import { AfterViewInit, Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "ngd-completed",
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    NgdPlaceholderModule,
    NgdTaskListModule,
    NgdToolbar,
  ],
  templateUrl: "./completed.component.html",
  styleUrl: "./completed.component.scss",
  animations: [fade],
})
export class CompletedComponent implements AfterViewInit {
  readonly taskService = inject(TaskService);
  readonly taskDeleteService = inject(NgdTaskDeleteService);
  readonly tasks = computed(() => this.taskService.completedTasks());

  viewInitialized: boolean = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }
}
