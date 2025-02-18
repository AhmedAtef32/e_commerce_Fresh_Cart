import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SpecificProductService {

  constructor() { }
    private readonly _httpClient = inject(HttpClient);


    getSpecificProduct(id: string): Observable<any> {
      return this._httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
    }

}
