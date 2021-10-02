import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  discountItems:any = {}
  recentlyItems:any = {}
  product:any = {}
  wishlist:any= []
  cart:any=[]
  show:Boolean = false 
  cartClass:String =""
  wishListClass:String=""
  constructor(private _productService:ProductService) {}

  ngOnInit(): void {
    this.getRecentlyProduct()
    this.getDiscountProduct()
    this.wishlist = localStorage.getItem("wishlist")
    this.cart = localStorage.getItem("cart")
  }
  slideConfig = { slidesToShow: 3, slidesToScroll:3 };
  
  getRecentlyProduct() {
    this._productService.getRecentlyProducts().subscribe(
      (result) => {
        this.recentlyItems = result.data
      },
      (err) => {}
    );
  }
  getDiscountProduct() {
    this._productService.getDiscountPoducts().subscribe(
      (result) => {
        this.discountItems = result.data
      },
      (err) => {}
    );
  }
  showProduct(product_id:any){
 
    this._productService.getSingleProduct(product_id).subscribe(data=>{

       this.product = data.data
       this.wishListClass = this.wishlist.includes(this.product._id)? 
             "fas fa-heart fa-lg text-danger" : "far fa-heart fa-lg text-danger"
       this.cartClass =this.cart.includes(this.product._id) ? 
             "fas fa-cart-plus text-primary mx-md-2 mx-sm-1 mx-3 fa-lg":"fas fa-cart-plus text-muted mx-md-2 mx-sm-1 mx-3 fa-lg"

    },err=>{})
  }
  checkCartCase(id:String){

   const product_id = {product_id:id}
   this.cartClass.includes("text-primary")?
      this.deleteProductFromCart(product_id):this.addProductToCart(product_id)
   
  }
  checkWishlistCase(id:String){
    const product_id = {product_id:id}
    console.log('aaaa' , this.wishListClass.includes("fas"))
    this.wishListClass.includes("fas")?
    this.deleteProductFromWishlist(product_id):this.addProductToWhishlist(product_id)
  }
  addProductToWhishlist(id:any){
    this._productService.addProductToWhishlist(id).subscribe(
      data=>{
        localStorage.setItem("wishlist" ,data.data.wishlist )
        this.wishListClass= "fas fa-heart fa-lg text-danger"
      },err=>{},
      ()=>{
      })
  }
  deleteProductFromWishlist(id:any){
    this._productService.deleteProductFromWishlist(id).subscribe(
       data=>{
         localStorage.setItem("wishlist" ,data.data.wishlist)
         this.wishListClass ="far fa-heart fa-lg text-danger"
      },err=>{}
    )
  }
  deleteProductFromCart(id:any){
    this._productService.deleteProductFromCart(id).subscribe(
      data=>{
        if(data.apiStatus) localStorage.setItem("cart", data.data.cart);
        this.cartClass = "fas fa-cart-plus text-muted mx-md-2 mx-sm-1 mx-3 fa-lg"
      },
      err=>{})
  }
  addProductToCart(id:any){
    this._productService.addProductToCart(id).subscribe(
      data=>{
        localStorage.setItem("cart", data.data.cart);
        this.cartClass = "fas fa-cart-plus text-primary mx-md-2 mx-sm-1 mx-3 fa-lg"
      },
      err=>{})
  }
 
 


}
