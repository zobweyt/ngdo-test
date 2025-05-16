import { SettingsService } from "@/entities/settings";
import { TaskService } from "@/entities/task";
import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgdTaskToggleSnackBar, NgdTaskToggleSnackBarData } from "./snack-bar";

@Injectable({ providedIn: "root" })
export class NgdTaskToggler {
  private readonly service = inject(TaskService);
  private readonly settings = inject(SettingsService);
  private readonly snackBar = inject(MatSnackBar);

  public toggle(ids: string[]): void {
    if (ids.length === 0) {
      return;
    }

    this.service.toggle(ids);
    this.tryOpenTaskToggleSnackBar(ids);
  }

  protected tryOpenTaskToggleSnackBar(ids: string[]): void {
    if (this.settings.showTaskCompletionSnackbar) {
      this.openTaskToggleSnackBar(ids);
    }
  }

  protected openTaskToggleSnackBar(ids: string[]): void {
    this.snackBar.openFromComponent(NgdTaskToggleSnackBar, {
      data: { ids } satisfies NgdTaskToggleSnackBarData,
    });
  }
}
