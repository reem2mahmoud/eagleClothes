import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
  });
  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });

  get name() {
    return this.registerForm.get('name');
  }
  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}
  register() {
    console.log(this.registerForm.value);
    this.registerForm.value.userType = 3;
    this._userService.register(this.registerForm.value).subscribe(
      (result) => {
        console.log('result is ::', result);
      },
      (err) => {
        console.log('err is ::', err);
      },
      () => this._router.navigateByUrl('/')
    );
  }
  login() {
    this._userService.login(this.loginForm.value).subscribe(
      (result) => {
        console.log('result for login',result.data)
        localStorage.setItem('token', `Bearer ${result.data.token}`);
        localStorage.setItem("wishlist", result.data.user.wishlist);
        localStorage.setItem("cart", result.data.user.cart);
        
      },
      (err) => {
        console.log('err is ::', err);
      },
      () => {
        this._userService.isLoggedIn = true;
        this._router.navigateByUrl('/');
      }
    );
  }
}
