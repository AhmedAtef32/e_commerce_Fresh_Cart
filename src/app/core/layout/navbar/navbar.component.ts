import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../featur/services/cart/cart.service';
import { WishListService } from '../../../featur/services/wishlist/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @Input({required: true}) isAuth!: boolean;
   readonly  _authService= inject(AuthService);
    readonly  _wishListService= inject(WishListService);

  private readonly  _cartService= inject(CartService);
  private readonly  _router= inject(Router);

  cartnumber:number = 0;
  wishNumber:number = 0;

  ngOnInit(): void {

  if(this.isAuth){
    this.getcartData();
    this.getWishData();
    this._cartService.cartnumber.subscribe((res) => this.cartnumber = res);
    this._wishListService.wishListNumber.subscribe((res) => this.wishNumber = res);
  }


  }


  getcartData(){



      this._cartService.getAllCart().subscribe({
        next: (res)=>{
          this._cartService.cartnumber.next(res.numOfCartItems);
        }
      });

    }


    getWishData(){
      this._wishListService.GetUserWishlist().subscribe({
        next: (res : any) =>{
          this._wishListService.wishListNumber.next(res.count);
        }
      })
    }



}
