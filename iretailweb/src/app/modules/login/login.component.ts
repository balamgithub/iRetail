
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  constructor(
    private OAuth: SocialAuthService,
    private router: Router
  ) { }

  public socialSignIn(socialProvider: string) {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
      this.Savesresponse(socialusers);
    });
  }
  Savesresponse(socialusers) {
    localStorage.setItem('userdetails', JSON.stringify(socialusers));
    this.router.navigate(['/view/dashboard']);
  }
}  