import { ListService } from "@/entities/list";
import { fadeHeight } from "@/shared/lib/animations";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { AfterViewInit, Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "ngd-list-nav-list",
  templateUrl: "component.html",
  styleUrl: "component.scss",
  imports: [
    MatListModule,
    MatIconModule,
    CdkDrag,
    CdkDropList,
  ],
  animations: [fadeHeight],
})
export class NgdListNavList implements AfterViewInit {
  public readonly service = inject(ListService);

  public viewInitialized: boolean = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.service.lists(),
      event.previousIndex,
      event.currentIndex,
    );
  }
}
