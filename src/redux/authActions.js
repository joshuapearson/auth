import { AUTH_TYPES } from './actionTypes';
import {
  AUTHENTICATE_ENDPOINT,
  DEAUTHENTICATE_ENDPOINT,
  AUTHENTICATION_STATUS_ENDPOINT
} from '../endpoints';

const requestAuthenticationStatus = () => ({
  type: AUTH_TYPES.AUTH_REQUEST_STATUS
});

const requestAuthenticate = (credentials) => ({
  type: AUTH_TYPES.AUTH_REQUEST_AUTHENTICATE,
  payload: credentials
});

const receiveAuthenticate = (authorization) => ({
  type: AUTH_TYPES.AUTH_RECEIVE_AUTHENTICATE,
  payload: authorization
});

const requestDeauthenticate = () => ({
  type: AUTH_TYPES.AUTH_REQUEST_DEAUTHENTICATE
});

export const checkAuthStatus = () => {
  return (dispatch) => {
    dispatch(requestAuthenticationStatus());
    return fetch(AUTHENTICATION_STATUS_ENDPOINT)
      .then((response) => response.json())
      .then((json) => dispatch(receiveAuthenticate(json)));
  };
};

export const authenticate = (credentials) => {
  return (dispatch) => {
    dispatch(requestAuthenticate(credentials));
    return fetch(AUTHENTICATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveAuthenticate(json)));
  };
};

export const deauthenticate = () => {
  return (dispatch) => {
    dispatch(requestDeauthenticate());
    return fetch(DEAUTHENTICATE_ENDPOINT)
      .then((response) => response.json())
      .then((json) => dispatch(receiveAuthenticate(json)));
  };
};
