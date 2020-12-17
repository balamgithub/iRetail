import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({ providedIn: 'root' })
export class APIService {

  constructor(private http: HttpClient, private injector: Injector, private _route: Router) { }

  Get(URL: string) {
    return this.http
      .get<any>(environment.apiURL + URL, { headers, observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  httpPost(URL: string, input: any) {
    return this.http
      .post<any>(environment.apiURL + URL, input, { headers, observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  httpGet(URL: string) {
    return this.http
      .get<any>(environment.apiURL + URL, { headers, observe: 'response' })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  httpPostResponseBlob(URL: string, input: any): Observable<any> {
    return this.http.post(environment.apiURL + URL, input, {
      headers,
      responseType: 'blob',
    });
  }
}
