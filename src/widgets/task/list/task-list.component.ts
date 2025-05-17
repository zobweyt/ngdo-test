import { SettingsService } from "@/entities/settings";
import { Task, TaskService } from "@/entities/task";
import { NgdTaskSelectService } from "@/features/task/select";
import { NgdTaskToggleScheduler } from "@/features/task/toggle";
import { fadeHeight } from "@/shared/lib/animations";
import { MarkdownPipe } from "@/shared/lib/markdown";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, inject, Input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { map } from "rxjs";

@Component({
  selector: "ngd-task-list",
  imports: [
    DatePipe,
    MarkdownPipe,
    MatCheckboxModule,
    MatListModule,
  ],
  templateUrl: "./task-list.component.html",
  styleUrl: "./task-list.component.scss",
  animations: [fadeHeight],
})
export class NgdTaskList implements AfterViewInit {
  @Input({ required: true })
  public tasks!: Task[];

  settings = inject(SettingsService);
  taskService = inject(TaskService);
  taskSelectService = inject(NgdTaskSelectService);
  taskToggleScheduler = inject(NgdTaskToggleScheduler);
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
