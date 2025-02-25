import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SpecificProductService } from '../../../shared/services/products/specific-product.service';
import { Allproducts } from '../../../shared/interfaces/allproducts/allproducts';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../services/wishlist/wish-list.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';

@Component({
  selector: 'app-product-detalis',
  imports: [CarouselModule, CurrencyPipe ],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.scss'
})
export class ProductDetalisComponent {


  private readonly   _activatedRoute = inject(ActivatedRoute);
  private readonly   _SpecificProductService = inject(SpecificProductService);
  private readonly   _cartService = inject(CartService);
  private readonly   _toastrService= inject(ToastrService);
  private readonly  _wishListService= inject(WishListService);
  product:Allproducts| null = null;

  sliderimgs!:string[]
  WishDataIDs:string[] = this._wishListService.wishIDs
  id!:string
  ngOnInit(): void {



    this._activatedRoute.paramMap.subscribe({
      next:(res)=>{
      const  id : string | null= res.get('id');

        this._SpecificProductService.getSpecificProduct(id!).subscribe({
          next:(res)=>{
            this.product = res.data;
            this.sliderimgs = res.data.images
          },
          error:(err)=>{
            console.log(err)
          },
        })


      }
    })
  }


  addTocart(id: string) {
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        this._cartService.cartnumber.next(res.numOfCartItems)
        this._toastrService.success(res.message, "Fresh Cart");
      },

    })
  }



  add_And_remove_Wishlist(id: string) {
    if(this.WishDataIDs.includes(id)){
      this._wishListService.removeProductFromWishlist(id).subscribe({
        next: (res : any) => {
          this.WishDataIDs = res.data;
          this._wishListService.wishListNumber.next(res.data.length);
          this._toastrService.success(res.message, "Fresh Cart");
        }
      })
    }else{
      this._wishListService.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.WishDataIDs = res.data;
          this._wishListService.wishListNumber.next(res.data.length);
          this._toastrService.success(res.message, "Fresh Cart");
        }
      })
    }

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }




}
