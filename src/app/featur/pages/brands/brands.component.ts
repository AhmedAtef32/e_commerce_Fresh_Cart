import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brand } from '../../../shared/interfaces/allproducts/allproducts';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly _brandsService = inject(BrandsService);
  allBrands!: Brand[]

  ngOnInit(): void {

    this.getBrands();
  }


  getBrands(){
    this._brandsService.getAllbrands().subscribe({
      next: (res) =>{
        this.allBrands = res.data
        console.log(this.allBrands);
      }
    });
  }

}
