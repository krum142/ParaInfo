import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  Path = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  getAll(type: string, brand: string): Observable<any> {
    return this.http.get(`${this.Path}${type}/${brand}`);
  }

  getOne(type: string, brand: string, model: string): Observable<any> {
    return this.http.get(`${this.Path}${type}/${brand}/${model}`);
  }
}
