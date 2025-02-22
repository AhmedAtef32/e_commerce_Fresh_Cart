import { Component, inject, OnInit } from '@angular/core';
import { PopularCategorService } from '../../../shared/services/categories/popular-categor.service';
import { PopularCateigory } from '../../../shared/interfaces/categories/popular-cateigory';
import { GetSpecificCategoryService } from '../../../shared/services/categories/get-specific-category.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _popularCategorService = inject(PopularCategorService);
  private readonly _getSpecificCategoryService = inject(GetSpecificCategoryService);
  categoriesData!:PopularCateigory[]
  specificCatergory:PopularCateigory[] = [];
  categoryName : string = ""
  ngOnInit(): void {
    this.getPopularCategories()
  }


  getPopularCategories(){
    this._popularCategorService.getPopularCategory().subscribe({
      next : (res) => {
        this.categoriesData = res.data
      }
    })
  }

  getSpecificCatergory(id:string){
    this._getSpecificCategoryService.getSpecificCategory(id).subscribe({
      next : (res) => {
        this.specificCatergory = res.data
        console.log(this.specificCatergory);
      }
    })
  }


}
