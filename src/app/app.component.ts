import { ListCreateService } from "@/features/list/create";
import { NgdSidenavService } from "@/features/sidenav";
import { NgdTaskDeleteService } from "@/features/task/delete";
import { NgdTaskSelectService } from "@/features/task/select";
import { NgdTaskEditForm } from "@/features/task/update";
import { NgdPlaceholderModule } from "@/shared/ui/placeholder";
import { NgdListNavList } from "@/widgets/list/nav-list";
import { NgdTaskNavList } from "@/widgets/task/nav-list";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { Router, RouterOutlet } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "ngd-root",
  imports: [
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
    NgdListNavList,
    NgdPlaceholderModule,
    NgdTaskEditForm,
    NgdTaskNavList,
    RouterOutlet,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdRoot implements AfterViewInit {
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  readonly taskDeleteService = inject(NgdTaskDeleteService);
  readonly taskSelectService = inject(NgdTaskSelectService);
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

  constructor() {
    this.router.events.subscribe(() => {
      if (this.isHandset()) {
        this.primarySidenav.close();
      }
    });

    effect(() => {
      if (!this.taskSelectService.selectedTask() && this.isWebLandscape()) {
        this.closeSecondaryFullView();
      }
    });
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
    this.sidenavService.primary.set(this.primarySidenav);
    this.sidenavService.secondary.set(this.secondarySidenav);
  }
}
