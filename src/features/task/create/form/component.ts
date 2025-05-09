import { fade } from "@/shared/lib/animations";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "ngd-task-create-form",
  templateUrl: "component.html",
  styleUrl: "component.scss",
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  exportAs: "ngdTaskCreateForm",
  animations: [fade],
})
export class NgdTaskCreateForm {
  @ViewChild(MatInput)
  readonly input!: MatInput;

  @Output()
  readonly create = new EventEmitter<string>();

  readonly form = new FormGroup({
    title: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(64),
    ]),
  });

  get title() {
    return this.form.get("title")!;
  }

  handleSubmit() {
    this.create.emit(this.title.value!);
    this.title.setValue("");
  }
}
