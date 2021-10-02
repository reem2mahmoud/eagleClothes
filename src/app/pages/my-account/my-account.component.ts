import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userDetails:any 
  editForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
  });
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this.getMyProfileDetails()
  }
  getMyProfileDetails(){
    this._userService.me().subscribe((user)=>{
        if(user.apiStatus){
          this.userDetails = user.data 
          delete this.userDetails["password"] 
          console.log(' this.userDetails', this.userDetails)
          this.editForm.patchValue(this.userDetails)
        }
    },(err)=>{},()=>{})
  }
  editProfile(){
    console.log('userDetails edit',this.editForm.value)
      this._userService.editMyProfile(this.editForm.value).subscribe((user)=>{
        if(user.apiStatus){

          console.log("updated successsfuly")
        }
      })
  }

}
