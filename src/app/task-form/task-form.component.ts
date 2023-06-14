import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  formTask: FormGroup;
  task: Task;
  isSubmitted: boolean = false;
  isCreatedTask: boolean = true;
  isTaskCheck: boolean = false;
  checked = false;
  tasks: Task[] = [];
  isChecked = false;
  status = 'Pending';
  taskSearch: string = '';


  constructor(private _fb: FormBuilder, private _taskService: TaskService) {
    this.createForm();
  }

  ngOnInit() {
    this.getTask();
  }
  
  createForm() {
    this.formTask = this._fb.group({
      title: ['', [Validators.required]],
      dueDate: ['', [Validators.required]]
    })
  }

  uId;
  OnSubmit() {
    if (this.formTask.valid) {

      if (this.isCreatedTask) {
        this.task = new Task();
        this.task.title = this.formTask.controls['title'].value
        this.task.dueDate = this.formTask.controls['dueDate'].value
        this.task.status = 'pending'
        this._taskService.createTask(this.task).subscribe(res => {
          console.log('Task created', res);
          this.getTask();
        })
      } else {
        let updatedTask = {
          'id': this.uId,
          'title': this.formTask.controls['title'].value,
          'dueDate': this.formTask.controls['dueDate'].value
        }
        console.log('updated task', updatedTask);

        this._taskService.updateTask(updatedTask.id, updatedTask).subscribe(res => {
          this.getTask();
        })
      }
    }
  }

  updateTask(task) {
    this.isCreatedTask = false;
    this.uId = task.id;
    console.log('updateTask', task);
    this.formTask.setValue({
      'title': task.title,
      'dueDate': task.dueDate
    });
  }

  getTask() {
    this._taskService.getTask().subscribe(res => {
      this.tasks = res;
    })
  }

  onSwitchMode() {
    this.isCreatedTask = !this.isCreatedTask;
  }

  checkStatus(task) {
    task.status = 'completed';
    console.log('check data', task);
    this._taskService.completTask(task.id, task.status).subscribe(res => {
      this.getTask();
    })
  }

  changeStatus(data, task) {
    console.log('task data', task);
    task.status = 'completed';
    this._taskService.updateTask(task.id, task).subscribe(res => {
      this.getTask();
    })
  }
}


