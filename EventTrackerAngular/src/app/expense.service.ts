import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Expense } from './models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url = environment.baseUrl + '/api/expenses';

  index() {
    return this.http.get<Expense[]>(this.url)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error retrieving expense object ' + err.status);
      })
      );
    }

    public show(id): Observable<Expense> {
      return this.http.get<Expense>(this.url + '/' + id)
           .pipe(
             catchError((err: any) => {
              console.log(err);
              return throwError('Error: ' + err.status);
            })
        );
    }

    create(exps: Expense) {
      console.log(exps.date);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    return this.http.post<any>(this.url, exps, httpOptions)
    .pipe(catchError((err: any) => {
      console.log(err);
      return throwError('error creating expense object' + err.status);
    }));
    }

    public update(exps: Expense) {
      return this.http.put(this.url + '/' + exps.id, exps).pipe(
          catchError((err: any) => {
          console.log(err);
          return throwError('Error: ' + err.status);
        })
      );
   }

    public destroy(id: number) {
      return this.http.delete(this.url + '/' + id).pipe(
          catchError((err: any) => {
          console.log(err);
          return throwError('Error: ' + err.status);
        })
      );
    }

  constructor(private http: HttpClient, private dataPipe: DatePipe) { }
}
