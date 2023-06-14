import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task_api_url = 'http://localhost:3000/task';

  //Injected HttpClient to send the request to server
  constructor(private _httpClient: HttpClient) { }

  // this method will crate a task
  createTask(task: Task): Observable<any> {
    return this._httpClient.post(`${this.task_api_url}`, task);
  }

  // to get a tasks
  getTask(): Observable<any> {
    return this._httpClient.get(`${this.task_api_url}`);
  }

  // to update a task
  updateTask(id: any, task: any): Observable<any> {
    let API_URL = `${this.task_api_url}/${id}`;
    return this._httpClient.put(`${API_URL}`, task);
  }

  completTask(id: any, status: any): Observable<any> {
    let API_URL = `${this.task_api_url}/${id}`;
    return this._httpClient.patch(`${API_URL}`, status);
  }

}
