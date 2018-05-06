import { promisify } from 'es6-promisify';
import { route } from 'preact-router';

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

export function handleAuthentication() {
  const WebAuth = require('auth0-js/src/web-auth'); // eslint-disable-line global-require
  const client = new WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.CALLBACK_URL,
  });
  const parseHash = promisify(client.parseHash.bind(client));
  return parseHash()
    .then(onAuthenticated)
    .catch(() => route('/login'));
}

export function login() {
  if (process.env.IS_CORDOVA) {
    const Auth0Cordova = require('@auth0/cordova'); // eslint-disable-line global-require
    window.handleOpenURL = url => Auth0Cordova.onRedirectUri(url);
    const client = new Auth0Cordova({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      packageIdentifier: process.env.PACKAGE_ID,
    });
    const authorize = promisify(client.authorize.bind(client));
    authorize({
      scope: 'openid profile offline_access',
      audience: process.env.AUTH0_AUDIENCE,
    }).then(onAuthenticated);
  } else {
    const WebAuth = require('auth0-js/src/web-auth'); // eslint-disable-line global-require
    const client = new WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid profile',
      audience: process.env.AUTH0_AUDIENCE,
    });
    client.authorize();
  }
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

function isAccessTokenExpired() {
  const expiresAt = localStorage.getItem(EXPIRES_AT);
  if (!expiresAt) {
    return true;
  }
  return Date.now() > JSON.parse(expiresAt);
}

export function refresh() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return Promise.reject(new Error('No refresh token stored, could not refresh authentication'));
  }

  const Authentication = require('auth0-js/src/authentication'); // eslint-disable-line global-require
  const client = new Authentication({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
  });

  const oauthToken = promisify(client.oauthToken.bind(client));
  return oauthToken({
    grantType: 'refresh_token',
    refreshToken,
  }).then(onAuthenticated);
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(EXPIRES_AT);
  localStorage.removeItem(REFRESH_TOKEN);
  route('/login');
}

export function isAuthenticated() {
  // If no access token is stored, user is not authenticated
  if (!getAccessToken()) {
    return false;
  }
  // If a refresh token is available, authentication can be refreshed
  if (getRefreshToken()) {
    return true;
  }
  // If no refresh token is availble, check if access token expired
  return !isAccessTokenExpired();
}

export async function getAuthorizationHeader() {
  if (isAccessTokenExpired()) {
    await refresh();
  }

  return `Bearer ${getAccessToken()}`;
}
