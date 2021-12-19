import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { urlPath } from './url';
import { Item } from './employee';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  section = 'employees';
  url = urlPath + this.section;
  private log(message: string) {
    this.messageService.add(`Сотрудники: ${message}`);
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.log(`не удалось ${operation}`);
      return of(result as T);
    };
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url).pipe(
      tap(_ => this.log('список обновлен')),
      catchError(this.handleError<Item[]>('обновить список', []))
    );
  }

  updateItem(item: Item, id: number): Observable<any> {
    const urlFull = `${this.url}/${id}`;

    return this.http.put(urlFull, item, this.httpOptions).pipe(
      tap(_ => this.log(`запись с id ${id} изменена`)),
      catchError(this.handleError<any>('изменить запись'))
    );
  }

  getItem(id: number): Observable<Item> {
    const urlFull = `${this.url}/${id}`;

    return this.http.get<Item>(urlFull).pipe(
      tap(_ => this.log(`запись с id ${id} обновлена`)),
      catchError(this.handleError<Item>(`найти запись с id ${id}`))
    );
  }

  deleteItem(id: number): Observable<Item> {
    const urlFull = `${this.url}/${id}`;

    return this.http.delete<Item>(urlFull, this.httpOptions).pipe(
      tap(_ => this.log(`запись с id ${id} удалена`)),
      catchError(this.handleError<Item>('удалить запись'))
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`добавлена новая запись с id ${newItem.id}`)),
      catchError(this.handleError<Item>('добавить новую запись'))
    );
  }
}
