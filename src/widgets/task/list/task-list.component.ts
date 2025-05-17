import { SettingsService } from "@/entities/settings";
import { Task, TaskService } from "@/entities/task";
import { NgdTaskSelectService } from "@/features/task/select";
import { NgdTaskToggleScheduler } from "@/features/task/toggle";
import { fade } from "@/shared/lib/animations";
import { MarkdownPipe } from "@/shared/lib/markdown";
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DatePipe } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Directive,
  inject,
  Input,
  OnDestroy,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { map } from "rxjs";

@Directive({
  selector: "[ngdTaskListPlaceholder]",
  host: {
    "class": "ngd-task-list__placeholder",
    "style": "position: absolute; inset: 0; margin: auto; display: flex",
  },
})
export class NgdTaskListPlaceholder {}

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
  animations: [
    fade,
    trigger("heightAnimation", [
      transition(":enter", [
        group([
          query(".animation-height-handler", [
            style({ height: 0 }),
            animate(
              "300ms cubic-bezier(0.34, 0.88, 0.34, 1.00)",
              style({ height: "*" }),
            ),
          ], { optional: true }),
          query(".animation-item", [
            style({
              position: "absolute",
              opacity: 0,
            }),
            animate(
              "300ms cubic-bezier(0.34, 0.88, 0.34, 1.00)",
              style({ opacity: 1 }),
            ),
          ], { optional: true }),
        ]),
      ]),
      transition(":leave", [
        group([
          query(".animation-height-handler", [
            animate(
              "650ms cubic-bezier(0.39, 1.29, 0.35, 0.98)",
              style({ height: 0 }),
            ),
          ], { optional: true }),
          query(".animation-item", [
            style({
              position: "absolute",
              opacity: 1,
            }),
            animate(
              "650ms cubic-bezier(0.39, 1.29, 0.35, 0.98)",
              style({ opacity: 0 }),
            ),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class NgdTaskList implements AfterViewInit {
  @Input({ required: true })
  public tasks!: Task[];

  settings = inject(SettingsService);
  taskService = inject(TaskService);
  taskSelector = inject(NgdTaskSelectService);
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
