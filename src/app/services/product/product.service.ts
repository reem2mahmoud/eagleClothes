import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = 'http://localhost:1000/product/';

  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${this.URL}all_products`);
  }
  getSingleProduct(id: any): Observable<any> {
    return this._httpClient.get(`${this.URL}single_product/${id}`);
  }
  getRecentlyProducts(): Observable<any> {
    return this._httpClient.get(`${this.URL}recently_products`);
  }
  getDiscountPoducts(): Observable<any> {
    return this._httpClient.get(`${this.URL}discount_products`);
  }
  addProductToCart(product_id: any): Observable<any> {
    return this._httpClient.put(`${this.URL}add-to-cart`, product_id);
  }
  addProductToWhishlist(product_id: any): Observable<any> {
    return this._httpClient.put(`${this.URL}add-to-whishlist`, product_id);
  }
  deleteProductFromCart(product_id: any): Observable<any> {
    return this._httpClient.put(`${this.URL}delete-from-cart`, product_id);
  }
  deleteProductFromWishlist(product_id: any): Observable<any> {
    return this._httpClient.put(`${this.URL}delete-from-wishlist`, product_id);
  }
  getMyCart(): Observable<any> {
    return this._httpClient.get(`${this.URL}cart-products`);
  }
  getMyWishlist(): Observable<any> {
    return this._httpClient.get(`${this.URL}wishlist-products`);
  }
}
