import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  moduleId: 'LayoutComponent',
  selector: 'layout',
  templateUrl: 'layout.page.html',
  styleUrls: ['layout.page.css'],
})
export class LayoutComponent {
  mainViewClass = 'page-container';
  user: SocialUser;
  loggedIn: boolean;
  constructor(private _route: Router, private authService: SocialAuthService) {
  }

  ngOnInit() {
    this.loggedIn = (localStorage.getItem('userdetails') !== undefined && localStorage.getItem('userdetails') !== null);
    if (!this.loggedIn)
      this._route.navigate(['']);
    else {
      this.user = JSON.parse(localStorage.getItem('userdetails'));
    }
  }

  logout() {
    this.authService.signOut().then(data => {
      localStorage.removeItem('userdetails')
      this._route.navigate(['']);
    });
  }
}
