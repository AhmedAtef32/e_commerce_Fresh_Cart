import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { ProductItemService } from '../../../../../shared/services/products/product-item.service';
import { Allproducts } from '../../../../../shared/interfaces/allproducts/allproducts';
import { FormsModule } from '@angular/forms';
import { FindPRoductPipe } from '../../../../../core/pipe/find-product.pipe';
import { WishListService } from '../../../../services/wishlist/wish-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-products',
  imports: [ProductItemComponent,FormsModule, FindPRoductPipe],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss'
})
export class HomeProductsComponent implements OnInit {

  private readonly _productItemService = inject(ProductItemService);
  private readonly _wishListService = inject(WishListService);
   readonly _router = inject(Router);

  allproducts: Allproducts[] = [];
  WishlistIds:string[] = [];
  textSearch : string = "";
  ngOnInit(): void {
    this.getAllProducts();
    this.getWishListItems();
  }

  getAllProducts(){
    this._productItemService.getAllProducts().subscribe({
      next: (res) => {
        this.allproducts = res.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  getWishListItems(){
    this._wishListService.GetUserWishlist().subscribe({
      next : (res : any) =>{
        for (var i = 0; i < res.count; i++) {

          this.WishlistIds.push(res.data[i].id);
        }
        this._wishListService.wishIDs = this.WishlistIds;
    }
   })
  }

}
