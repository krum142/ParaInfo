import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GliderService {

  constructor(
    private authService: AuthService,
    private http: HttpClient) {   }

  create():Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${this.authService.getToken()}`);
    return this.http.get("https://localhost:44313/item",{headers})
  }
}
