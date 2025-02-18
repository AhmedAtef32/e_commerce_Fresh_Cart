import { Routes } from '@angular/router';
import path from 'path';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { notLoggedGuard } from './core/guards/not-logged.guard';

export const routes: Routes = [
  {path:"" , redirectTo:"home" , pathMatch:"full"},
  {path:""  ,canActivate:[isLoggedGuard], loadComponent: ()=> import("./core/layout/auth/auth.component").then(c=>c.AuthComponent), children: [
    {path:"" , redirectTo:"register",pathMatch:"full"},
    {path:"register" , loadComponent: ()=> import("./core/page/register/register.component").then(c=>c.RegisterComponent)},
    {path:"login" , loadComponent: ()=> import("./core/page/login/login.component").then(c=>c.LoginComponent)},
  ]},

  {path:"" , canActivate:[notLoggedGuard]  , loadComponent: ()=> import("./core/layout/blank/blank.component").then(c=>c.BlankComponent), children: [
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:"home" , loadComponent: ()=> import("./featur/pages/home/home.component").then(c=>c.HomeComponent)},
    {path:"cart" , loadComponent: ()=> import("./featur/pages/cart/cart.component").then(c=>c.CartComponent)},
    {path:"categories" , loadComponent: ()=> import("./featur/pages/categories/categories.component").then(c=>c.CategoriesComponent)},
    {path:"brands" , loadComponent: ()=> import("./featur/pages/brands/brands.component").then(c=>c.BrandsComponent)},
    {path:"products" , loadComponent: ()=> import("./featur/pages/products/products.component").then(c=>c.ProductsComponent)},
    {path:"product-detalis" , loadComponent: ()=> import("./featur/pages/product-detalis/product-detalis.component").then(c=>c.ProductDetalisComponent)},
    {path:"wishlist" , loadComponent: ()=> import("./featur/pages/wishlist/wishlist.component").then(c=>c.WishlistComponent)},
    {path:"allorders" , loadComponent: ()=> import("./featur/pages/allorders/allorders.component").then(c=>c.AllordersComponent)},
    {path:"checkout/:id" , loadComponent: ()=> import("./featur/pages/checkout/checkout.component").then(c=>c.CheckoutComponent)},
    {path:"product-detalis/:id" , loadComponent: ()=> import("./featur/pages/product-detalis/product-detalis.component").then(c=>c.ProductDetalisComponent)},
  ]},
  {path:"**", loadComponent: ()=> import("./featur/pages/not-found/not-found.component").then(c=>c.NotFoundComponent)}

];
