import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paraglider } from '../models/Paraglider';

@Injectable({
  providedIn: 'root'
})
export class ParagliderService {
  private Path = environment.apiUrl + 'Paraglider';
  constructor(private http: HttpClient) { }

  create(data: FormData): Observable<Paraglider> {
    return this.http.post<Paraglider>(this.Path, data);
  }

  update(data: FormData): Observable<Paraglider> {
    return this.http.put<Paraglider>(this.Path, data);
  }

  delete(id:string): Observable<Paraglider>{
    return this.http.delete<Paraglider>(`${this.Path}/${id}`);
  }

  getModel(brand: string, model: string): Observable<Paraglider> {
    if (brand && model) {
      return this.http.get<Paraglider>(`${this.Path}/${brand}/${model}`);
    }
    return EMPTY;
  }

  getAllByCount(count:number):Observable<Array<Paraglider>>{
    return this.http.get<Array<Paraglider>>(`${this.Path}/count/${count}`);
  }
}
