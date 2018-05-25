import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Todo } from './todo';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(
        map(response => {
          const todos = <any[]> response;
          return todos.map((todo) => new Todo(todo));
        }),
        catchError(this.handleError<Todo[]>('getAllTodos'))
      );
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError<Todo>('createTodo'))
      );
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError<Todo>('getTodoById'))
      );
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map(response => {
        return new Todo(response);
      }),
        catchError(this.handleError<Todo>('getTodoById'))
      );
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null),
        catchError(this.handleError<Todo[]>('deleteTodoById'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
