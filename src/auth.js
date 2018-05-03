import Auth0 from 'auth0-js';
import Auth0Cordova from '@auth0/cordova';

import isCordova from './is-cordova';

function onAuthenticated(callback) {
  return (err, authResult) => {
    if (err) {
      console.error(err);
      return;
    }
    if (authResult) {
      const expiresIn = authResult.expiresIn * 1000;
      const expiresAt = JSON.stringify(expiresIn + Date.now());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      callback();
    }
  };
}

export function handleAuthentication(callback) {
  if (isCordova()) {
    window.handleOpenURL = url => Auth0Cordova.onRedirectUri(url);
  } else {
    new Auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.CALLBACK_URL,
    }).parseHash(onAuthenticated(callback));
  }
}

export function login(callback) {
  const client = isCordova()
    ? new Auth0Cordova({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      packageIdentifier: process.env.PACKAGE_ID,
    })
    : new Auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.CALLBACK_URL,
    });

  const options = {
    responseType: 'token id_token',
    scope: 'openid profile',
    audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
  };

  client.authorize(options, onAuthenticated(callback));
}

export function logout(callback) {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  callback();
}

export function isAuthenticated() {
  const expiresAt = localStorage.getItem('expires_at');
  if (!expiresAt) {
    return false;
  }
  return Date.now() < JSON.parse(expiresAt);
}
