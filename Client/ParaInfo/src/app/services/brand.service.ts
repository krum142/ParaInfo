import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private createPath = environment.apiUrl + 'brand'
  constructor(private http: HttpClient) { }

  create(brand:any):Observable<Brand>{
    console.log(this.createPath);
    return this.http.post<Brand>(this.createPath,brand);
  }
}
