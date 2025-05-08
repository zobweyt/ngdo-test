import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { TaskListComponent } from "@/widgets/task/task-list/task-list.component";
import { fade } from "@/shared/lib/animations";
import { TaskService } from "@/entities/task";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "ngd-home",
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    NgdPlaceholderModule,
    TaskListComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  animations: [fade],
})
export class HomeComponent {
  newTask: string = "";
  taskService = inject(TaskService);
}
