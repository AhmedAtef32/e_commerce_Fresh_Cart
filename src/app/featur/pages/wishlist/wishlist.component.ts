import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../services/wishlist/wish-list.service';
import { Allproducts } from '../../../shared/interfaces/allproducts/allproducts';
import { TermPipe } from '../../../core/pipe/term.pipe';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe,TermPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _wishListService = inject(WishListService);
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);

  wishListItems!:Allproducts[];


ngOnInit(): void {
  this.getWishListItems();
}

  getWishListItems(){
    this._wishListService.GetUserWishlist().subscribe({
      next : (res : any) => {
      this.wishListItems = res.data;
      this._wishListService.wishListNumber.next(res.count);
      console.log(res);
      }
    });
  }

  addToCart(id:string){
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == "success") {
          this._toastrService.success(res.message, "Fresh Cart");
          this._cartService.cartnumber.next(res.numOfCartItems);
          this.removeProductFromWishlist(id);
        }
      }
    });
  }


  removeProductFromWishlist(id:string) {
    this._wishListService.removeProductFromWishlist(id).subscribe({
      next: (res : any) => {
        if(res.status == "success") {
          this.getWishListItems();
          this._toastrService.success(res.message, "Fresh Cart");
        };
      }
    });
  }

}
