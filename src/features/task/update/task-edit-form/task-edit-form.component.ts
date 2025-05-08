import { Task, TaskService } from "@/entities/task";
import { Component, inject, Input, OnChanges, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "ngd-task-edit-form",
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTimepickerModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./task-edit-form.component.html",
  styleUrl: "./task-edit-form.component.scss",
})
export class TaskEditFormComponent implements OnInit, OnChanges {
  @Input("task")
  public task!: Task;

  readonly taskService = inject(TaskService);

  titleFormControl = new FormControl();
  descriptionFormControl = new FormControl();
  dateFormControl = new FormControl();

  form = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    date: this.dateFormControl,
    time: this.dateFormControl,
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((data) => {
      // todo form.hasErrors
      if (this.titleFormControl.value?.length < 2) {
        return;
      }

      // todo partial update accept param
      this.taskService.updateTask({
        id: this.task.id,
        title: data.title || this.task.title,
        description: data.description,
        date: data.date,
        completed: this.task.completed,
      });
    });
  }

  ngOnChanges(): void {
    this.titleFormControl.setValue(this.task.title);
    this.descriptionFormControl.setValue(this.task.description);
    this.dateFormControl.setValue(this.task.date);
  }
}
