import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css']
})
export class MyWishlistComponent implements OnInit {
 myWishlist:any = []
  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getMyWishlist()
  }
  getMyWishlist(){
    this._productService.getMyWishlist().subscribe((data)=>{
       if(data.apiStatus){
           this.myWishlist = data.data.wishlist
           console.log('this.myWishlist' ,this.myWishlist)
       }
    })
  }
  deleteProductFromWishlist(id:any){
    const product_id = {product_id:id}
    this._productService.deleteProductFromWishlist(id).subscribe(
       data=>{
        console.log('data',data)
         this.myWishlist.splice(this.myWishlist[id],1)
         localStorage.setItem("wishlist" ,data.data.wishlist)
         
      },err=>{}
    )
  }


}
