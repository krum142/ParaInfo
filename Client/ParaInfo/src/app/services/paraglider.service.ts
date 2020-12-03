import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParagliderService {
  private Path = environment.apiUrl + 'Paraglider';
  constructor(private http: HttpClient) { }

  create(data:any):Observable<any>{
    console.log(data)
    return this.http.post(this.Path,data);
  }

  getModel(brand:string,model:string):Observable<any>{
    return this.http.get(`${this.Path}/${brand}/${model}`);
  }
}
