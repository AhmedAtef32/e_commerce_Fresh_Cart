import { Component } from '@angular/core';
import { HomeProductsComponent } from "./components/home-products/home-products.component";
import { HomeOverviewComponent } from "./components/home-overview/home-overview.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { IntroWebsiteComponent } from "./components/intro-website/intro-website.component";
import { BrandSliderComponent } from "./components/brand-slider/brand-slider.component";
import { ImgShowMoreComponent } from "./components/img-show-more/img-show-more.component";

@Component({
  selector: 'app-home',
  imports: [HomeProductsComponent, HomeOverviewComponent, PopularCategoriesComponent, IntroWebsiteComponent, BrandSliderComponent, ImgShowMoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
