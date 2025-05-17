import { NgModule } from "@angular/core";
import { NgdTaskList, NgdTaskListPlaceholder } from "./task-list.component";

@NgModule({
  imports: [
    NgdTaskList,
    NgdTaskListPlaceholder,
  ],
  exports: [
    NgdTaskList,
    NgdTaskListPlaceholder,
  ],
})
export class NgdTaskListModule {}
