import { NgdSidenavService } from "@/features/sidenav";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith, switchMap } from "rxjs";

@Component({
  selector: "ngd-toolbar",
  templateUrl: "component.html",
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class NgdToolbar {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  public readonly sidenav = inject(NgdSidenavService);

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

  private get leaf(): ActivatedRoute {
    let leaf = this.route;
    while (leaf.firstChild) {
      leaf = leaf.firstChild;
    }
    return leaf;
  }
}
