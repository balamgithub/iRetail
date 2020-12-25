import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceBusClient } from "@azure/service-bus";
// import { } from "@azure/identity";
// const { ServiceBusClient } = require("@azure/service-bus");
// const { DefaultAzureCredential } = require("@azure/identity");

// const serviceBusClient = new ServiceBusClient(environment.azureServiceBusConnectionString);

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.css']
})
export class DashboardComponent {

  // credential = new DefaultAzureCredential();

  serviceBusClient = new ServiceBusClient(environment.azureServiceBusConnectionString);
  // serviceBusClient = new ServiceBusClient(environment.serviceBusNamespace, environment.azureServiceBusConnectionString);
  myMessageHandler = async (message) => {
    // your code here
    debugger
    console.log(`message.body: ${message.body}`);
  };
  myErrorHandler = async (args) => {
    debugger
    console.log(
      `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
      args.error
    );
  };
  constructor(private router: Router) { }

  ngOnInit() {
    this.serviceBusClient.fullyQualifiedNamespace = environment.serviceBusNamespace;
    const receiver = this.serviceBusClient.createReceiver("messagetest1");

    receiver.subscribe({
      processMessage: this.myMessageHandler,
      processError: this.myErrorHandler
    });
  }

}
