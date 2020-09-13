import { ACC_TYPES, ORG_TYPES } from './actionTypes';
import {
  ACCOUNT_CREATE_ENDPOINT,
  ACCOUNT_DETAIL_ENDPOINT,
  ACCOUNT_UPDATE_ENDPOINT,
  ORGANIZATION_DETAIL_ENDPOINT
} from '../endpoints';
import {
  generateFetchOptions,
  generateRegFetchOptions
} from '../utils/network';

const requestAccount = () => ({
  type: ACC_TYPES.ACC_REQUEST_ACCOUNT
});

const receiveAccount = (account) => ({
  type: ACC_TYPES.ACC_RECEIVE_ACCOUNT,
  payload: account
});

const requestAccountCreate = () => ({
  type: ACC_TYPES.ACC_REQUEST_ACCOUNT_CREATE
});

const receiveAccountCreate = (account) => ({
  type: ACC_TYPES.ACC_RECEIVE_ACCOUNT_CREATE,
  payload: account
});

const requestAccountUpdate = () => ({
  type: ACC_TYPES.ACC_REQUEST_ACCOUNT_UPDATE
});

const receiveAccountUpdate = (account) => ({
  type: ACC_TYPES.ACC_RECEIVE_ACCOUNT_UPDATE,
  payload: account
});

export const fetchAccount = () => {
  return (dispatch) => {
    dispatch(requestAccount());
    return fetch(ACCOUNT_DETAIL_ENDPOINT, generateFetchOptions())
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveAccount(json));
      });
  };
};

export const createAccount = (account) => {
  return (dispatch) => {
    dispatch(requestAccountCreate());
    return fetch(ACCOUNT_CREATE_ENDPOINT, {
      ...generateRegFetchOptions(),
      method: 'POST',
      body: JSON.stringify(account)
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveAccountCreate(json)));
  };
};

export const updateAccount = (account) => {
  return (dispatch) => {
    dispatch(requestAccountUpdate());
    return fetch(ACCOUNT_UPDATE_ENDPOINT, {
      ...generateFetchOptions(),
      method: 'POST',
      body: JSON.stringify(account)
    })
      .then((response) => response.json())
      .then((json) => dispatch(receiveAccountUpdate(json)));
  };
};

const requestOrganization = () => ({
  type: ORG_TYPES.ORG_REQUEST_ORGANIZATION
});

const receiveOrganization = (organization) => ({
  type: ORG_TYPES.ORG_RECEIVE_ORGANIZATION,
  payload: organization
});

export const fetchOrganization = () => {
  return (dispatch) => {
    dispatch(requestOrganization());
    return fetch(ORGANIZATION_DETAIL_ENDPOINT, generateFetchOptions())
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveOrganization(json));
      });
  };
};
