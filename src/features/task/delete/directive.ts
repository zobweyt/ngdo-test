import { Task } from "@/services/task";
import { Directive, HostListener, inject, Input } from "@angular/core";
import { NgdTaskDeleteService } from "./service";

@Directive({ selector: "[ngd-task-delete]" })
export class NgdTaskDelete {
  @Input({ required: true })
  public task!: Task;

  private readonly service = inject(NgdTaskDeleteService);

  @HostListener("click")
  private onClick(): void {
    this.service.deleteTask(this.task);
  }
}
