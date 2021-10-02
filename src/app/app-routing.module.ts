import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { EventsComponent } from './pages/events/events.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { Error404Component } from './pages/error404/error404.component';
import { MyWishlistComponent } from './pages/my-wishlist/my-wishlist.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';

const routes: Routes = [
  {path:"", component : HomeComponent} ,
  {path:"account"  ,  component:AccountComponent},
  {path:"events", component:EventsComponent},
  {path:"products", component:SearchProductsComponent},
  {path:"contact-us", component:ContactUsComponent},
  {path:"me", component:MyAccountComponent},
  {path:"my-cart", component:MyCartComponent},
  {path:"my-wishlist", component:MyWishlistComponent},
  {path:"*", component:Error404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
