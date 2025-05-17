import { TaskService } from "@/entities/task";
import { NgdTaskCreateForm } from "@/features/task/create";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { NgdTaskListModule } from "@/widgets/task/list";
import { NgdToolbar } from "@/widgets/toolbar/component";
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "ngd-home-page-task-list-placeholder",
  templateUrl: "placeholder.html",
  imports: [
    MatButtonModule,
    MatIconModule,
    NgdPlaceholderModule,
  ],
})
export class NgdHomePageTaskListPlaceholder {
  @Output()
  protected readonly action = new EventEmitter();
}

@Component({
  selector: "ngd-home",
  imports: [
    NgdTaskCreateForm,
    NgdTaskListModule,
    NgdToolbar,
    NgdHomePageTaskListPlaceholder,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  readonly taskService = inject(TaskService);
  readonly tasks = computed(() => this.taskService.activeTasks());
}
