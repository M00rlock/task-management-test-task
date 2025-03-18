import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TodosService } from '../../api/todos.service';
import { ITask } from '../interfaces/tasks';

interface IResult {
  task: ITask;
  isEdit: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  public tasks: ITask[] = [];
  public isLoading = true; // Track loading state
  public error: string | null = null; // To store error messages, if any

  constructor(
    public dialog: MatDialog,
    public todosService: TodosService
  ) {}

  ngOnInit(): void {
    this._getTasks();
  }

  openTaskDialog(task?: ITask): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result: IResult) => {
      if(!result) {
        return;
      }

      this.isLoading = true;

      if (task) {
        this._updateTask(result.task);
      } else {
        this._createTask(result.task);
      }
    });
  }

  private _createTask(task: ITask) {
    this.todosService.createTask(task).subscribe({
      next: (res) => {
        console.log(`Task with id ${res.id} has been updated`);
        this._getTasks();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false; // Stop loading on error
        this.error = 'Failed to load tasks. Please try again later.';
      },
      complete: () => {
        console.log('Task fetching completed.');
      },
    });
  }

  private _updateTask(task: ITask) {
    this.todosService.updateTask(task.id!, task).subscribe({
      next: (res) => {
        console.log(`Task with id ${res.id} has been updated`);
        this._getTasks();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false; // Stop loading on error
        this.error = 'Failed to load tasks. Please try again later.';
      },
      complete: () => {
        console.log('Task fetching completed.');
      },
    });
  }

  deleteTask(task: ITask) {
    const taskId = task.id!;

    this.todosService.deleteTask(taskId).subscribe({
      next: (res) => {
        console.log(`Task with id ${res.id} has been deleted`);
        this.tasks = this.tasks.filter(t => t.id !== res.id);
        this.isLoading = false; // Set loading state to false once data is received
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false; // Stop loading on error
        this.error = 'Failed to load tasks. Please try again later.';
      },
      complete: () => {
        console.log('Task fetching completed.');
      },
    });
  }

  private _getTasks(): void {
    this.todosService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tasks received:', tasks);
        this.tasks = tasks;  // Assign received tasks to the component's variable
        this.isLoading = false; // Set loading state to false once data is received
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false; // Stop loading on error
        this.error = 'Failed to load tasks. Please try again later.';
      },
      complete: () => {
        console.log('Task fetching completed.');
      },
    });
  }
}