import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  myCart :any = []
  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getMyCart()

  }
  getMyCart(){
    this._productService.getMyCart().subscribe((data)=>{
     if(data.apiStatus){
      this.myCart = data.data.cart
     }
    })
  }

}
