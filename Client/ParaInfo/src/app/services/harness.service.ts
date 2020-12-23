import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HarnessService {
  private Path = environment.apiUrl + 'Harness';
  constructor(private http: HttpClient) { }

  create(data: FormData): Observable<any> {
    return this.http.post(this.Path, data);
  }

  update(data: FormData): Observable<any> {
    return this.http.put(this.Path, data);
  }

  delete(id:string): Observable<any>{
    return this.http.delete<any>(`${this.Path}/${id}`);
  }

  getModel(brand: string, model: string): Observable<any> {
    if (brand && model) {
      return this.http.get<any>(`${this.Path}/${brand}/${model}`);
    }
    return EMPTY;
  }
}
