import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  private readonly _httpClient = inject(HttpClient);

   specialChar:string = '#';
   encodedChar:string = encodeURIComponent( this.specialChar);


   onlinePayment(data:object , cartId:string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/${this.encodedChar}`, {
      shippingAddress : data
    });
  }


  cashPayment(data:object , cartId:string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, {
      shippingAddress : data
    });
  }

}
