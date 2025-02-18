import { RouterLink } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { Allproducts } from '../../../interfaces/allproducts/allproducts';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../../../core/pipe/term.pipe';
import { CartService } from '../../../../featur/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, TermPipe,RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input({required: true}) product!: Allproducts;

  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);

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

}
