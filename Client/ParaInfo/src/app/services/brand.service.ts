import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private Path = environment.apiUrl + 'brand'
  constructor(private http: HttpClient) { }

  create(brand:any):Observable<Brand>{
    return this.http.post<Brand>(this.Path,brand);
  }

  getAll():Observable<Array<Brand>>{
    return this.http.get<Array<Brand>>(this.Path);
  }

  getBrand(name: any):Observable<Brand>{
    return this.http.get<Brand>(`${this.Path}/${name}`)
  }
}
