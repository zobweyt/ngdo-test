import { Component, inject, model } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export interface DialogData {
  name?: string | null | undefined;
}

@Component({
  selector: "create-new-list-dialog",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./create-new-list-dialog.html",
})
export class CreatenewListDialog {
  readonly dialog = inject(MatDialogRef<CreatenewListDialog>);
  readonly data = inject<DialogData | null>(MAT_DIALOG_DATA);

  readonly form = new FormGroup({
    name: new FormControl(this.data?.name || "", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
  });

  get name() {
    return this.form.get("name")!;
  }
}
