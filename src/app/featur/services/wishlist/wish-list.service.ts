import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/enviroments/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor() { }
  private readonly _httpClient = inject(HttpClient);

  wishListNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  wishIDs: string[] = [];
  addProductToWishlist(id:string):Observable<any>{
   return  this._httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
    })
  }

  GetUserWishlist(){
    return this._httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  removeProductFromWishlist(id:string){
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }

}
