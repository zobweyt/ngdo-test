import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, inject, Input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { map } from "rxjs";
import { fadeHeight } from "../../lib/animations";
import { TaskListType, TaskService } from "../../services/task";

@Component({
  selector: "ngd-task-list",
  imports: [
    DatePipe,
    MatCheckboxModule,
    MatListModule,
  ],
  templateUrl: "./task-list.component.html",
  styleUrl: "./task-list.component.scss",
  animations: [fadeHeight],
})
export class TaskListComponent implements AfterViewInit {
  @Input("type")
  public type: TaskListType = "all";

  taskService = inject(TaskService);
  breakpointObserver = inject(BreakpointObserver);
  viewInitialized: boolean = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  readonly isWebLandscape = toSignal(
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape,
    ]).pipe(
      map((result) => result.matches),
    ),
    { requireSync: true },
  );
}
