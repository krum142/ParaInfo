import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'Identity/Login'
  constructor(private http: HttpClient) { }

  login(data:any): Observable<any>{
    return this.http.post(this.loginPath,data);
  }

  

  saveToken(token:string): void{
    localStorage.setItem('token',token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
