import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../featur/services/cart/cart.service';
import { WishListService } from '../../../featur/services/wishlist/wish-list.service';
import { OrderService } from '../../../featur/services/order/order.service';

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
  private readonly  _orderService= inject(OrderService);
  private readonly  _cartService= inject(CartService);
  private readonly  _router= inject(Router);

  cartnumber:number = 0;
  wishNumber:number = 0;
  OrdersNumber:number = 0;
  username:string = ""



  ngOnInit(): void {



  if(this.isAuth){
    this.getcartData();
    this.getWishData();
    this._cartService.cartnumber.subscribe((res) => this.cartnumber = res);
    this._wishListService.wishListNumber.subscribe((res) => this.wishNumber = res);
    this.getUserDetails();
    this._orderService.ordersNumber.subscribe({
      next : (res) => this.OrdersNumber = res
    });
    this.getOrderNumber();
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
          for (var i = 0; i < res.count; i++) {

            this._wishListService.wishIDs.push(res.data[i].id);
          }

        }
      })
    }


    getOrderNumber(){
      this._orderService.getAllUserOrders(this._authService.userId).subscribe({
        next: (res) => {
          this._orderService.ordersNumber.next(res.length);
        }
      })
    }

    toggleProfileMune(mune:HTMLElement){

      mune.classList.toggle('hidden');


    }

    getUserDetails(){
      this._authService.getUserData();
      this._authService.userName.next(this._authService.userData.name);
      this._authService.userName.subscribe((res) => this.username = res);
      console.log(this.username);
    }


    toggleNavbar(ulList:HTMLElement){

      ulList.classList.toggle('hidden');
    }
}
