import { Injectable, signal } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({ providedIn: "root" })
export class NgdSidenavService {
  public readonly primary = signal<MatSidenav | null>(null);
  public readonly secondary = signal<MatSidenav | null>(null);

  openSecondaryFullView() {
    const primary = this.primary();
    const secondary = this.primary();

    if (primary && secondary) {
      requestAnimationFrame(() => {
        primary.close();
        secondary.mode = "over";
      });
    }
  }

  closeSecondaryFullView() {
    const primary = this.primary();
    const secondary = this.primary();

    if (primary && secondary) {
      requestAnimationFrame(() => {
        primary.open();
        secondary.mode = "side";
      });
    }
  }
}
