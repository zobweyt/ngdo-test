import { SettingsService } from "@/entities/settings";
import { inject, Injectable } from "@angular/core";
import { NgdTaskToggler } from "./toggler";

@Injectable({ providedIn: "root" })
export class NgdTaskToggleScheduler {
  private readonly toggler = inject(NgdTaskToggler);
  private readonly settings = inject(SettingsService);

  private readonly batchIdsSet: Set<string> = new Set();
  private batchTimeoutId: number | null = null;

  public schedule(id: string): void {
    this.toggleBatchId(id);
    this.clearBatchTimeout();
    this.scheduleBatchToggle();
  }

  protected toggleBatchId(id: string): void {
    if (this.batchIdsSet.has(id)) {
      this.batchIdsSet.delete(id);
    } else {
      this.batchIdsSet.add(id);
    }
  }

  protected clearBatchTimeout(): void {
    if (this.batchTimeoutId !== null) {
      window.clearTimeout(this.batchTimeoutId);
    }
  }

  protected scheduleBatchToggle(): void {
    if (this.batchIdsSet.size === 0) {
      return;
    }

    this.batchTimeoutId = window.setTimeout(() => {
      this.handleBatchToggle();
    }, this.settings.delayAfterCheckMark);
  }

  protected handleBatchToggle(): void {
    this.toggler.toggle(Array.from(this.batchIdsSet));
    this.batchIdsSet.clear();
  }
}
