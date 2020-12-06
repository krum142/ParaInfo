import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  Path = environment.apiUrl;
  categoryPath: any =
    {
      'Paragliders': 'Paraglider',
      'Harnesses': 'Harness',
      'Reserves': 'Reserve',
      'Bags': 'Bag',
      'Accessoars': 'Acessoar'
    }
  constructor(private http: HttpClient) { }



  getAll(category: string,brand:string): Observable<any> {
    return this.http.get(`${this.Path}${this.categoryPath[category]}/${brand}`);
  }
}
