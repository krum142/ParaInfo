import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      //retry(1),
      catchError((err) => {
        console.log(err);
        switch (err.status) {
          case 404:
            this.router.navigate(['**'])
            break;
          case 401:
            this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
