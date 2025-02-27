import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../core/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private readonly _httpClient = inject(HttpClient);

   specialChar:string = '#';
   encodedChar:string = encodeURIComponent( this.specialChar);
   ordersNumber:BehaviorSubject<number> = new BehaviorSubject(0)

   onlinePayment(data:object , cartId:string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-fresh-cart-rho.vercel.app/${this.encodedChar}`, {
      shippingAddress : data
    });
  }


  cashPayment(data:object , cartId:string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, {
      shippingAddress : data
    });
  }



  getAllUserOrders(id:string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }

}
