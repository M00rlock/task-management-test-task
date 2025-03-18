import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../app/interfaces/tasks';
import { catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

// export interface ITask {
//   id: number;
//   title: string;
//   description: string;
//   
//   subtasks: ITask[];
// }

interface IDeleteRes {
  message: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl).pipe(
      delay(1000),
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    )
  }

  getTask(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching task:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task).pipe(
      catchError((error) => {
        console.error('Error creating task:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

  updateTask(id: string, task: Partial<ITask>): Observable<ITask> {
    console.log(task);
    return this.http.put<ITask>(`${this.apiUrl}/${id}`, task).pipe(
      catchError((error) => {
        console.error('Error updating tasks:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

  deleteTask(id: string): Observable<IDeleteRes> {
    return this.http.delete<IDeleteRes>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting task:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }
}
