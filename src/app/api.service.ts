import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Todo } from './todo';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {SessionService} from './session.service';
import { RequestOptions } from '@angular/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) { }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos', options)
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
    const options = this.getRequestOptions();
    return this.http
      .post(API_URL + '/todos', todo, options)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError<Todo>('createTodo'))
      );
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .get(API_URL + '/todos/' + todoId, options)
      .pipe(
        map(response => {
          return new Todo(response);
        }),
        catchError(this.handleError<Todo>('getTodoById'))
      );
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo, options)
      .pipe(
        map(response => {
        return new Todo(response);
      }),
        catchError(this.handleError<Todo>('getTodoById'))
      );
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    const options = this.getRequestOptions();
    return this.http
      .delete(API_URL + '/todos/' + todoId, options)
      .pipe(map(response => null),
        catchError(this.handleError<null>('deleteTodoById'))
      );
  }

  public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .pipe(
        map(response => response),
        catchError(this.handleError<null>('signIn'))
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

  private getRequestOptions() {
    return {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.session.accessToken})
    };
  }
}
