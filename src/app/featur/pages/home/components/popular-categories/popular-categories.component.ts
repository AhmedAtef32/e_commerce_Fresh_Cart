import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopularCategorService } from '../../../../../shared/services/categories/popular-categor.service';
import { Subscription } from 'rxjs';
import { PopularCateigory } from '../../../../../shared/interfaces/categories/popular-cateigory';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit , OnDestroy {
  private readonly _popularCategoriesService =inject(PopularCategorService)

  popularCategories: PopularCateigory[] = []
  subGetPopularCategories!:Subscription;

ngOnInit(): void {
  this.getPopularCategories();
}
  getPopularCategories(){
  this.subGetPopularCategories =  this._popularCategoriesService.getPopularCategory().subscribe({
      next:(res)=>{

        this.popularCategories=res.data;
      }
    })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: false,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
  }


  ngOnDestroy(): void {
    this.subGetPopularCategories.unsubscribe();
  }
}
