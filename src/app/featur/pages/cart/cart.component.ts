import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart/cart';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit ,OnDestroy {

  private readonly _cartService = inject(CartService)
  private readonly _toastrService = inject(ToastrService)


  cartInfo:Cart = {} as Cart ;
  cartInfoLength:number = 0
  subGetAllCarts!:Subscription;
  ngOnInit(): void {
    this.getAllCarts();
  }

  getAllCarts(){
  this.subGetAllCarts =  this._cartService.getAllCart().subscribe({
      next: (res)=>{
        this.cartInfo = res.data;
        console.log(this.cartInfo);
        this.cartInfoLength = this.cartInfo.products.length
      }
    })
  }


  udateProductQuantity(id:string,quantity:number){
    this._cartService.updateProductQuantity(id,quantity).subscribe({
      next: (res)=>{
        this.cartInfo = res.data;

        this._toastrService.success(res.status , "Fresh Cart");
      }
    })
  }


  deleteItemFromCart(id:string){
    this._cartService.deleteItemFromCart(id).subscribe({
      next: (res)=>{
        this.cartInfo = res.data;
        this._cartService.cartnumber.next(res.numOfCartItems);
        this._toastrService.success(res.status , "Fresh Cart");
        this.cartInfoLength = this.cartInfo.products.length
      }
    })
  }

  deletetAllCart(){
    this._cartService.deleteAllCart().subscribe({
      next: (res)=>{
        this.cartInfo = {} as Cart;
        this._cartService.cartnumber.next(0);
        this._toastrService.success(res.message , "Fresh Cart");
        this.cartInfoLength = 0;
      }
    })
  }


ngOnDestroy(): void {
  this.subGetAllCarts.unsubscribe();
}

}
