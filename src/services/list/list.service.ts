import { inject, Injectable, signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreatenewListDialog } from "../../components/create-new-list-dialog/create-new-list-dialog.component";

@Injectable({ providedIn: "root" })
export class ListService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly newListName = signal("");

  public readonly lists: string[] = [
    "List 1",
    "List 2",
    "List 3",
  ];

  public openCreateNewListDialog() {
    const dialog = this.dialog.open(CreatenewListDialog, {
      data: { name: this.newListName() },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.newListName.set(result);
        this.snackBar.open(this.newListName(), undefined, { duration: 1000 });
      }
    });
  }
}
