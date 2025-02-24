import { AllOrder } from './../../interface/All_Orders/all-order';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../services/order/order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe , CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  implements OnInit{

  private readonly _authService= inject(AuthService);
  private readonly _orderService= inject(OrderService);

  AllOrders: AllOrder[] = [];

  ngOnInit(): void {
    this._authService.getUserData();
    this.getAllOrders();
  }

  getAllOrders(){
    this._orderService.getAllUserOrders(this._authService.userId).subscribe({
      next: (res) => {
        this.AllOrders = res;
        console.log(this.AllOrders);
        this._orderService.ordersNumber.next(res.length);
      }
    });
  }
}
