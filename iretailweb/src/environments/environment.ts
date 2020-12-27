// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'https://localhost:44365/api/',
  googleClientID: '771036786867-e8324hg8qleeqatmce3uv0ri4maddifv.apps.googleusercontent.com',
  firebaseConfig: {
    apiKey: "AIzaSyChfBFm-WiNIe6igmsWlzWT8PTLCk7lXo8",
    authDomain: "iretaildb.firebaseapp.com",
    projectId: "iretaildb",
    storageBucket: "iretaildb.appspot.com",
    messagingSenderId: "191214866148",
    appId: "1:191214866148:web:2fe3ca6847cce86bfb66f1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
