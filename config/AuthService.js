const decode = require('jwt-decode')
// import { browserHistory } from 'react-router';
const Auth0Lock = require('auth0-lock').default
const ID_TOKEN_KEY = 'id_token';
const auth = require('./auth.js')


const lock = new Auth0Lock(auth.audience, auth.domain, {
    auth: {
      redirectUrl: `${window.location.origin}`,
      responseType: 'token'
    }
  }
);

lock.on('authenticated', authResult => {
  setIdToken(authResult.idToken);
  // browserHistory.push('/profile');
});

const login = function login(options) {
  lock.show(options);

  return {
    hide() {
      lock.hide();
    }
  }
}

const logout = function logout() {
  clearIdToken();
  // browserHistory.replace('/');
}

const requireAuth = function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

const isLoggedIn = function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

module.exports = {
  login,
  logout,
  isLoggedIn
}
