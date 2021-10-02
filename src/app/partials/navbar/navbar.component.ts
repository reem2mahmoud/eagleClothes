import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}
  logout() {
    this._userService.logOut().subscribe(
      (data) => {
        if (data.apiStatus) {
          localStorage.removeItem('token');
          localStorage.removeItem('wishlist');
        }
      },
      (err) => {},
      () => {
        this._userService.isLoggedIn = false;
        this._router.navigateByUrl('/account');
      }
    );
  }
}
