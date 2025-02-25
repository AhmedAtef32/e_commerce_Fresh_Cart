import { Routes } from '@angular/router';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { notLoggedGuard } from './core/guards/not-logged.guard';

export const routes: Routes = [
  {path:"" , redirectTo:"home" , pathMatch:"full"},
  {path:""  ,canActivate:[isLoggedGuard], loadComponent: ()=> import("./core/layout/auth/auth.component").then(c=>c.AuthComponent), children: [
    {path:"" , redirectTo:"register",pathMatch:"full"},
    {path:"register" , loadComponent: ()=> import("./core/page/register/register.component").then(c=>c.RegisterComponent)},
    {path:"login" , loadComponent: ()=> import("./core/page/login/login.component").then(c=>c.LoginComponent)},
    {path:"forget" , loadComponent: ()=> import("./core/page/forget-password/forget-password.component").then(c=>c.ForgetPasswordComponent)},
  ]},

  {path:"" , canActivate:[notLoggedGuard]  , loadComponent: ()=> import("./core/layout/blank/blank.component").then(c=>c.BlankComponent), children: [
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:"home" , loadComponent: ()=> import("./featur/pages/home/home.component").then(c=>c.HomeComponent) ,title:"Home"},
    {path:"cart" , loadComponent: ()=> import("./featur/pages/cart/cart.component").then(c=>c.CartComponent),title:"Cart"},
    {path:"categories" , loadComponent: ()=> import("./featur/pages/categories/categories.component").then(c=>c.CategoriesComponent),title:"Categories"},
    {path:"brands" , loadComponent: ()=> import("./featur/pages/brands/brands.component").then(c=>c.BrandsComponent),title:"Brands"},
    {path:"products" , loadComponent: ()=> import("./featur/pages/products/products.component").then(c=>c.ProductsComponent),title:"Product "},
    {path:"wishlist" , loadComponent: ()=> import("./featur/pages/wishlist/wishlist.component").then(c=>c.WishlistComponent),title:"Wishlist"},
    {path:"allorders" , loadComponent: ()=> import("./featur/pages/allorders/allorders.component").then(c=>c.AllordersComponent),title:"All Orders"},
    {path:"setting" , loadComponent: ()=> import("./featur/pages/profile-setting/profile-setting.component").then(c=>c.ProfileSettingComponent),title:"Setting", children: [
      {path:"" , redirectTo:"account-setting",pathMatch:"full"},
      {path:"account-setting" , loadComponent: ()=> import("./featur/pages/profile-setting/components/account-setting/account-setting.component").then(c=>c.AccountSettingComponent)},
      {path:"privacy-setting" , loadComponent: ()=> import("./featur/pages/profile-setting/components/privacy-setting/privacy-setting.component").then(c=>c.PrivacySettingComponent)},
    ]},
    {path:"checkout/:id" , loadComponent: ()=> import("./featur/pages/checkout/checkout.component").then(c=>c.CheckoutComponent),title:"Checkout"},
    {path:"product-detalis/:id" , loadComponent: ()=> import("./featur/pages/product-detalis/product-detalis.component").then(c=>c.ProductDetalisComponent),title:"Product Detalis"},
    {path:"**", loadComponent: ()=> import("./featur/pages/not-found/not-found.component").then(c=>c.NotFoundComponent),title:"Not Found Page"}
  ]},


];
