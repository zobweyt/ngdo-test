import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgdPlaceholderModule } from "../../components/placeholder";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { fade } from "../../lib/animations";
import { TaskService } from "../../services/task/task.service";

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
