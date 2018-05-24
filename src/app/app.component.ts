import { Component } from '@angular/core';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  newTodo: Todo = new Todo();
  constructor(private todoDataService: TodoDataService) {
  }
  addTodo(todo) {
    this.todoDataService.addTodo(todo);
    this.newTodo = new todo;
  }
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }
  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
