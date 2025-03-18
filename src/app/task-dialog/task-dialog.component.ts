import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../interfaces/tasks';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  public task: ITask = { title: '', description: '' };
  public isEdit: boolean = false;
  public taskTitle?: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.taskTitle = data.title;
      this.task = { ...data };
      this.isEdit = true;
    }
  }

  updateTaskTitle(event: Event): void {
    const element = event.currentTarget as HTMLInputElement

    this.taskTitle = element.value;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.isEdit) {
      this.dialogRef.close({ task: this.task, isEdit: true });
    } else {
      this.dialogRef.close({ task: this.task, isEdit: false });
    }
  }
}
