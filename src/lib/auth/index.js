import { route } from 'preact-router';
import Auth0 from 'auth0-js';
import Auth0Cordova from '@auth0/cordova';
import { promisify } from 'es6-promisify';

import isCordova from '../util/is-cordova';

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';
const EXPIRES_AT = 'expires_at';
const REFRESH_TOKEN = 'refresh_token';

function onAuthenticated(authResult) {
  if (!authResult) {
    throw new Error('No authentication result available');
  }
  const expiresIn = authResult.expiresIn * 1000;
  const expiresAt = JSON.stringify(expiresIn + Date.now());
  localStorage.setItem(ACCESS_TOKEN, authResult.accessToken);
  localStorage.setItem(ID_TOKEN, authResult.idToken);
  localStorage.setItem(EXPIRES_AT, expiresAt);
  if (authResult.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, authResult.refreshToken);
  }
  route('/home');
}

function onAuthenticationError(error) {
  console.error(error);
  throw error;
}

export function handleAuthentication() {
  const client = new Auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.CALLBACK_URL,
  });
  const parseHash = promisify(client.parseHash.bind(client));
  return parseHash()
    .then(onAuthenticated)
    .catch(onAuthenticationError);
}

export function login() {
  const options = {
    responseType: 'token id_token',
    scope: 'openid offline_access',
    audience: process.env.AUTH0_AUDIENCE,
  };
  if (isCordova()) {
    window.handleOpenURL = url => Auth0Cordova.onRedirectUri(url);
    const client = new Auth0Cordova({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      packageIdentifier: process.env.PACKAGE_ID,
    });
    const authorize = promisify(client.authorize.bind(client));
    authorize(options)
      .then(onAuthenticated)
      .catch(onAuthenticationError);
  } else {
    const client = new Auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.CALLBACK_URL,
    });
    client.authorize(options);
  }
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(EXPIRES_AT);
  localStorage.removeItem(REFRESH_TOKEN);
  route('/login');
}

export function isAuthenticated() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    return false;
  }
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (refreshToken) {
    return true;
  }
  const expiresAt = localStorage.getItem(EXPIRES_AT);
  if (!expiresAt) {
    return false;
  }
  return Date.now() < JSON.parse(expiresAt);
}

export function refresh() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken) {
    throw new Error('No refresh token stored, could not refresh authentication');
  }

  const client = new Auth0.Authentication({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
  });

  const oauthToken = promisify(client.oauthToken.bind(client));
  return oauthToken({
    grantType: 'refresh_token',
    refreshToken,
  })
    .then(onAuthenticated)
    .catch(onAuthenticationError);
}
