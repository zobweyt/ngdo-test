import { ListService } from "@/entities/list";
import { TaskService } from "@/entities/task/task.service";
import { ListCreateService } from "@/features/list/create";
import { NgdSidenavService } from "@/features/sidenav";
import { NgdTaskDeleteService } from "@/features/task/delete";
import { NgdTaskSelectService } from "@/features/task/select";
import { TaskEditFormComponent } from "@/features/task/update/task-edit-form/task-edit-form.component";
import { fade, fadeHeight } from "@/shared/lib/animations";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  ViewChild,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { map } from "rxjs";
import { routes } from "./app.routes";

@Component({
  selector: "ngd-root",
  imports: [
    CdkDrag,
    CdkDropList,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    NgdPlaceholderModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TaskEditFormComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  animations: [fade, fadeHeight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdRoot implements AfterViewInit {
  readonly navItems = routes.filter((route) => route.pathMatch === "full");

  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  readonly taskService = inject(TaskService);
  readonly taskDeleteService = inject(NgdTaskDeleteService);
  readonly taskSelectService = inject(NgdTaskSelectService);
  readonly listService = inject(ListService);
  readonly listCreateService = inject(ListCreateService);
  readonly sidenavService = inject(NgdSidenavService);

  readonly isHandset = toSignal(
    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,
    ]).pipe(map((result) => !result.matches)),
    { requireSync: true },
  );

  readonly isWebLandscape = toSignal(
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape,
    ]).pipe(
      map((result) => result.matches),
    ),
    { requireSync: true },
  );

  @ViewChild("primarySidenav")
  private primarySidenav!: MatSidenav;

  @ViewChild("secondarySidenav")
  private secondarySidenav!: MatSidenav;

  viewInitialized: boolean = false;

  constructor() {
    this.router.events.subscribe(() => {
      if (this.isHandset()) {
        this.primarySidenav.close();
      }
    });

    effect(() => {
      if (
        this.taskSelectService.selectedTask() === null && this.isWebLandscape()
      ) {
        this.closeSecondaryFullView();
      }
    });
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listService.lists(),
      event.previousIndex,
      event.currentIndex,
    );
  }

  openSecondaryFullView() {
    requestAnimationFrame(() => {
      this.primarySidenav.close();
      this.secondarySidenav.mode = "over";
    });
  }

  closeSecondaryFullView() {
    requestAnimationFrame(() => {
      this.primarySidenav.open();
      this.secondarySidenav.mode = "side";
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.sidenavService.primary.set(this.primarySidenav);
    this.sidenavService.secondary.set(this.secondarySidenav);
  }

  getTasksLengthByRouteName(path: string | undefined): number | undefined {
    switch (path) {
      case "":
        return this.taskService.activeTasks().length || undefined;
      case "today":
        return this.taskService.todayTasks().length || undefined;
      case "completed":
        return this.taskService.completedTasks().length || undefined;
      default:
        return undefined;
    }
  }

  @HostListener("window:keydown.delete", ["$event"])
  tryDelete(event: KeyboardEvent) {
    if (
      (event.target as HTMLElement).tagName === "INPUT" ||
      (event.target as HTMLElement).tagName === "TEXTAREA"
    ) {
      return;
    }

    const selectedTask = this.taskSelectService.selectedTask();
    if (selectedTask) {
      this.taskDeleteService.deleteTasks([selectedTask]);
    }
  }
}
