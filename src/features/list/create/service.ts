import { ListService } from "@/services/list";
import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { filter } from "rxjs";
import { CreatenewListDialog } from "./create-new-list-dialog/create-new-list-dialog.component";

@Injectable({ providedIn: "root" })
export class ListCreateService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly service = inject(ListService);

  public openCreateListDialog() {
    const dialog = this.dialog.open(CreatenewListDialog);

    dialog.afterClosed().pipe(filter((name) => !!name)).subscribe((name) => {
      this.service.createList(name);
      this.snackBar.open(`List "${name}" created!`);
    });
  }
}
