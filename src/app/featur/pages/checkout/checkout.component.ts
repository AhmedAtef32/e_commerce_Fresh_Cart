import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {



  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _cartService = inject(CartService);
  private readonly _router = inject(Router);
  paymentForm!:FormGroup;
  iscalingApi:boolean = false
  iscalingApicash:boolean = false
  cartId!:string;

  ngOnInit(): void {
    this.paymentForm = this._formBuilder.group({
      details : [null , [Validators.required]],
      phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city : [null , [Validators.required]]
    });

    this.getIdParme();
  }


  getIdParme(){
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
         this.cartId = res.get('id')!;
      }
    })
  }

  submitOnlinePaymentForm(){

    this.iscalingApi = true


    if(this.paymentForm.valid){

      this._orderService.onlinePayment(this.paymentForm.value , this.cartId).subscribe({
          next: (res) => {
            if(res.status == "success"){
              console.log(res);
              open(res.session.url , "_self");
            }
            this.iscalingApi = false;
          },error: (err) => {
            this.iscalingApi = false;
          }

      })

  }else{
    this.iscalingApi = false
    this.paymentForm.markAllAsTouched()
  }


}

submitCashPaymentForm(){

  this.iscalingApicash = true


  if(this.paymentForm.valid){

    this._orderService.cashPayment(this.paymentForm.value , this.cartId).subscribe({
        next: (res) => {
          if(res.status == "success"){
            this._cartService.cartnumber.next(0);
            this._toastrService.success(res.status,"Fresh Cart");
            setTimeout(()=>{
              this._router.navigate(["/allorders"])
            },500)
            this._router.navigate(["/allorders"])
          }
          this.iscalingApicash = false;
        },error: (err) => {
          this.iscalingApicash = false;
        }

    })

}else{
  this.iscalingApicash = false
  this.paymentForm.markAllAsTouched()
}


}


}
