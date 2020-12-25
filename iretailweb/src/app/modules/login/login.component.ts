
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ServiceBusClient } from "@azure/service-bus";
import { environment } from 'src/environments/environment';

// const { ServiceBusClient } = require("@azure/service-bus");
// const { DefaultAzureCredential } = require("@azure/identity");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMsg = '';
  serviceBusClient = new ServiceBusClient(environment.azureServiceBusConnectionString);
  constructor(
    private OAuth: SocialAuthService,
    private router: Router
  ) { }
  myMessageHandler = async (message) => {
    // your code here
    this.errorMsg += 'message.body : ' + message.body;
    // console.log(`message.body: ${message.body}`);
  };
  myErrorHandler = async (args) => {
    this.errorMsg += ` <br> Error : ${args.error}`;
    // console.log(
    //   `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
    //   args.error
    // );
  };
  ngOnInit() {
    this.serviceBusFunction();
    // receiver.subscribe({
    //   processMessage: this.myMessageHandler,
    //   processError: this.myErrorHandler
    // });
  }

  async serviceBusFunction() {
    this.serviceBusClient.fullyQualifiedNamespace = environment.serviceBusNamespace;
    const receiver = this.serviceBusClient.createReceiver("messagetest1");
    debugger
    receiver.subscribe({
      processMessage: this.myMessageHandler,
      processError: this.myErrorHandler
    });
    debugger
  }
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