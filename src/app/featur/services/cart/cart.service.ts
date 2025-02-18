import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../core/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private readonly _httpClient = inject(HttpClient);

  cartnumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(id:string):Observable<any>{
  return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,{
    productId : id,
  });
  }


  getAllCart():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  updateProductQuantity(id:string,quantity:number):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count : quantity,
      });
  }

  deleteItemFromCart(id:string):Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

deleteAllCart():Observable<any>{
  return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
}

}
