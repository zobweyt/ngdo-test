import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { NgdTaskDeleteSnackBarData } from "./model";

@Component({
  selector: "ngd-task-delete-snack-bar",
  templateUrl: "component.html",
  styleUrl: "component.scss",
  imports: [
    MatButtonModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
  ],
})
export class NgdTaskDeleteSnackBar {
  data = inject<NgdTaskDeleteSnackBarData>(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef<NgdTaskDeleteSnackBar>);
}
