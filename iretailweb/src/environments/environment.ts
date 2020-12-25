// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: '',
  googleClientID : '771036786867-e8324hg8qleeqatmce3uv0ri4maddifv.apps.googleusercontent.com',
  azureServiceBusConnectionString : 'Endpoint=sb://iretailtest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=BacWf1RFNNS8WdtXq+2dMBH6isGoJaH5cdpc6LCvq4s=',
  serviceBusNamespace: 'iRetailTest.servicebus.windows.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
