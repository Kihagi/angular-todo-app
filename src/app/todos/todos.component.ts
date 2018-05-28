import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo';
import {TodoDataService} from '../todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/internal/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoDataService]
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.route.data
      .pipe(
        map((data) => data['todos'])
      ).subscribe(
      (todos) => {
        this.todos = todos;
      }
    );
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  doSignOut() {
    this.auth.doSignOut();
    this.router.navigate(['/sign-in']);
  }
}
