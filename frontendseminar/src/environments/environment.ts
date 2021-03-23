// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    oidc: {
      clientId: '0oabobmm8QJX0mbQL5d6',
      issuer: 'https://dev-54465192.okta.com/oauth2/default',
      redirectUri: '/login/callback',
      scopes: ['openid', 'profile', 'email'],
      pkce: true,
      postLogoutRedirectUri: 'http://localhost:4200/',
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
  },
  firebase: {
    apiKey: 'AIzaSyAlEYXxPAzv2-Z6pnq0pa-LNsd3WhNFeo8',
    authDomain: 'imagestorge-e2390.firebaseapp.com',
    databaseURL: 'https://imagestorge-e2390-default-rtdb.firebaseio.com',
    projectId: 'imagestorge-e2390',
    storageBucket: 'imagestorge-e2390.appspot.com',
    messagingSenderId: '119384195011',
    appId: '1:119384195011:web:e6f710bed33f1ff0d44776',
    measurementId: 'G-C0GGPTSKLG',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
