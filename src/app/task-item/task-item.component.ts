import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../interfaces/tasks';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: ITask;
  @Output() edit = new EventEmitter<ITask>();
  @Output() delete = new EventEmitter<ITask>();

  public subtasks?: ITask[];

  ngOnInit() {
    this.subtasks = [
      { title: 'title 1', description: 'description 2' },
      { title: 'title 1', description: 'description 2' },
      { title: 'title 1', description: 'description 2' },
      { title: 'title 1', description: 'description 2' },
      { title: 'title 1', description: 'description 2' }
    ];
  }

  editTask() {
    this.edit.emit(this.task);
  }

  deleteTask() {
    this.delete.emit(this.task);
  }
}