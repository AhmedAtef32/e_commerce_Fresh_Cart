import { Component } from '@angular/core';
import { HomeProductsComponent } from "../home/components/home-products/home-products.component";

@Component({
  selector: 'app-products',
  imports: [HomeProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
