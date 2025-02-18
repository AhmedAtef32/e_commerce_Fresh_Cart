import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../featur/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @Input({required: true}) isAuth!: boolean;
   readonly  _authService= inject(AuthService);

  private readonly  _cartService= inject(CartService);

  cartnumber:number = 0;

  ngOnInit(): void {
  this._cartService.cartnumber.subscribe((res) => this.cartnumber = res);

    this.getcartData();

  }


  getcartData(){
    this._cartService.getAllCart().subscribe({
      next: (res)=>{
        this._cartService.cartnumber.next(res.numOfCartItems);
      }
    });
  }

}
