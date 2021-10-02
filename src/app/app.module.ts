import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http' ;
import { ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SliderComponent } from './partials/slider/slider.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BrandsComponent } from './partials/brands/brands.component';
import { FeaturesComponent } from './partials/features/features.component';
import { AboutUsComponent } from './partials/about-us/about-us.component';
import { ProductsComponent } from './partials/products/products.component';
import { UserInterceptor } from './providors/user.interceptor';

import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { EventsComponent } from './pages/events/events.component';
import { Error404Component } from './pages/error404/error404.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { MyWishlistComponent } from './pages/my-wishlist/my-wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SliderComponent,
    HomeComponent,
    AccountComponent,
    ContactUsComponent,
    BrandsComponent,
    FeaturesComponent,
    AboutUsComponent,
    ProductsComponent,
    SearchProductsComponent,
    MyAccountComponent,
    EventsComponent,
    Error404Component,
    SingleProductComponent,
    MyCartComponent,
    MyWishlistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule ,
    SlickCarouselModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass : UserInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
