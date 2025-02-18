import { environment } from './../../../core/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor() { }
  private readonly _httpClient = inject(HttpClient);


  getAllProducts() : Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/products`);
  }
}
