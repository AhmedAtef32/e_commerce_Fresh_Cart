import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../../../../../shared/services/brands/brands.service';
import { Brand } from '../../../../interface/All_Orders/all-order';

@Component({
  selector: 'app-brand-slider',
  imports: [CarouselModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.scss'
})
export class BrandSliderComponent implements OnInit {

   private readonly _brandsService = inject(BrandsService)
  allbrands!: Brand[]
ngOnInit(): void {
    this.getAllbrands();
}

   getAllbrands(){
    this._brandsService.getAllbrands().subscribe({
      next: (res) => {
        this.allbrands = res.data
        console.log(this.allbrands);
      }
    })
  }

  brandOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplaySpeed: 500,     
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
  };





}
