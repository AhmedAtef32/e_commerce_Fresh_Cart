import { Component } from '@angular/core';
import { HomeProductsComponent } from "./components/home-products/home-products.component";
import { HomeOverviewComponent } from "./components/home-overview/home-overview.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";

@Component({
  selector: 'app-home',
  imports: [HomeProductsComponent, HomeOverviewComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
