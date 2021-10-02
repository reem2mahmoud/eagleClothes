import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = localStorage.getItem("token")?true:false 
  URL = "http://localhost:1000/user/"
 

  constructor(private _http:HttpClient) {}
   register(data:any):Observable<any>{
      return this._http.post(`${this.URL}register`, data)
   }
   login(data:any):Observable<any>{
    return this._http.post(`${this.URL}login` , data)
   }
   me():Observable<any>{
    return this._http.get(`${this.URL}me`)
   }
   logOut():Observable<any>{
    return this._http.post(`${this.URL}logout`,null)
   }
   logOutAll():Observable<any>{
    return this._http.post(`${this.URL}logout-all`,null)
   }
   editMyProfile(data:any):Observable<any>{
    return this._http.post(`${this.URL}editMyProfile`,data)
   }
}
