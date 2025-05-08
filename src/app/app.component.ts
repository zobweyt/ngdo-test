import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, effect, inject, ViewChild } from "@angular/core";
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
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { filter, map, startWith, switchMap } from "rxjs";
import { NgdPlaceholderModule } from "@/components/placeholder";
import { TaskEditFormComponent } from "@/components/task-edit-form/task-edit-form.component";
import { NgdTaskDelete } from "@/features/task/delete";
import { fade } from "@/lib/animations";
import { ListService } from "@/services/list";
import { TaskService } from "@/services/task/task.service";
import { ngdoRoutes } from "./app.routes";

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
    NgdTaskDelete,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TaskEditFormComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  animations: [fade],
})
export class AppComponent {
  readonly name = "ngdo";
  readonly navItems = ngdoRoutes;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  readonly taskService = inject(TaskService);
  readonly listService = inject(ListService);

  readonly title = toSignal(
    this.router.events.pipe(
      filter((evt) => evt instanceof NavigationEnd),
      startWith(null),
      switchMap(() => this.leaf.title),
    ),
    { requireSync: true },
  );

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

  get leaf(): ActivatedRoute {
    let leaf = this.route;
    while (leaf.firstChild) {
      leaf = leaf.firstChild;
    }
    return leaf;
  }

  constructor() {
    this.router.events.subscribe(() => {
      if (this.isHandset()) {
        this.primarySidenav.close();
      }
    });

    effect(() => {
      if (this.taskService.selectedTask() === null && this.isWebLandscape()) {
        this.closeSecondaryFullView();
      }
    });
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listService.lists,
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
}
