import { AUTH_TYPES } from './actionTypes';
import {
  AUTHENTICATE_ENDPOINT,
  DEAUTHENTICATE_ENDPOINT,
  AUTHENTICATION_STATUS_ENDPOINT
} from '../endpoints';
import { generateFetchOptions } from '../utils/network';

const requestAuthenticationStatus = () => ({
  type: AUTH_TYPES.AUTH_REQUEST_STATUS
});

const requestAuthenticate = () => ({
  type: AUTH_TYPES.AUTH_REQUEST_AUTHENTICATE
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
    return fetch(AUTHENTICATION_STATUS_ENDPOINT, generateFetchOptions())
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveAuthenticate(json));
      });
  };
};

export const authenticate = (credentials) => {
  return (dispatch) => {
    dispatch(requestAuthenticate());
    return fetch(AUTHENTICATE_ENDPOINT, {
      ...generateFetchOptions(),
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveAuthenticate(json)));
  };
};

export const deauthenticate = () => {
  return (dispatch) => {
    dispatch(requestDeauthenticate());
    return fetch(DEAUTHENTICATE_ENDPOINT, generateFetchOptions())
      .then((response) => response.json())
      .then((json) => dispatch(receiveAuthenticate(json)));
  };
};
