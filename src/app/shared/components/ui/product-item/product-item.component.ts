import { RouterLink } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { Allproducts } from '../../../interfaces/allproducts/allproducts';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../../../core/pipe/term.pipe';
import { CartService } from '../../../../featur/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../../featur/services/wishlist/wish-list.service';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, TermPipe,RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input({required: true}) product!: Allproducts;
  @Input({required: true}) WishIds!: string[];

  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _wishListService = inject(WishListService);



  addProdctToCart(id: string) {
    this._cartService.addToCart(id).subscribe({
      next : (res) => {
        if(res.status == "success") {
          this._cartService.cartnumber.next(res.numOfCartItems);
          this._toastrService.success(res.message , "Fresh Cart");

        }
      }
    }
    );
  }

  addProductToWishlist(id:string) {
    if(this.WishIds.includes(id)) {
      this._wishListService.removeProductFromWishlist(id).subscribe({
        next : (res:any) => {
          this._toastrService.success(res.message, "Fresh Cart");
          this._wishListService.wishListNumber.next(res.data.length);
          this.WishIds = res.data;
          this._wishListService.wishIDs = this.WishIds;

        }
      })
    }else{
      this._wishListService.addProductToWishlist(id).subscribe({
        next : (res) => {
          this._toastrService.success(res.message, "Fresh Cart");
          this._wishListService.wishListNumber.next(res.data.length);
          this.WishIds = res.data;
          this._wishListService.wishIDs = this.WishIds;
          console.log(res)
        }
       });
    }

  }

}
