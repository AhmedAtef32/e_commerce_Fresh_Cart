import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { ProductItemService } from '../../../../../shared/services/products/product-item.service';
import { Allproducts } from '../../../../../shared/interfaces/allproducts/allproducts';
import { FormsModule } from '@angular/forms';
import { FindPRoductPipe } from '../../../../../core/pipe/find-product.pipe';

@Component({
  selector: 'app-home-products',
  imports: [ProductItemComponent,FormsModule, FindPRoductPipe],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss'
})
export class HomeProductsComponent implements OnInit {

  private readonly _productItemService = inject(ProductItemService);

  allproducts: Allproducts[] = [];

  textSearch : string = "";
  ngOnInit(): void {
    this.getAllProducts();
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

}
