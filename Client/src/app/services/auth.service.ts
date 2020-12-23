import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'Identity/Login';
  private registerPath = environment.apiUrl + 'Identity/Register';
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(this.loginPath, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(){
    if(this.isAuthenticated()){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerPath, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUsername(username: string): void{
    localStorage.setItem('username', username)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  isAuthenticated(){
    if(this.getToken()){
      return true;
    }
    return false;
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
