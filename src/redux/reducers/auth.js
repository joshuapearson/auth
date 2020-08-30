import { AUTH_TYPES, ACC_TYPES } from '../actionTypes';
import { setCID } from '../../utils/network';

const defaultAuth = {
  cid: null,
  uid: null,
  created: null,
  renewed: null,
  auth: false
};

const defaultAcc = {
  uid: null,
  uname: null,
  fname: null,
  lname: null,
  email: null,
  created: null
};

const defaultState = {
  auth: defaultAuth,
  authError: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isDeauthenticating: false,
  isCheckingStatus: true,
  acc: defaultAcc,
  accError: null,
  isFetchingAcc: false,
  isCreatingAcc: false,
  isUpdatingAcc: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    // ACCOUNT ACTIONS
    case ACC_TYPES.ACC_REQUEST_ACCOUNT: {
      return {
        ...state,
        isFetchingAcc: true
      };
    }
    case ACC_TYPES.ACC_RECEIVE_ACCOUNT: {
      const { payload = { acc: defaultAcc } } = action;
      const { acc, err } = payload;
      return {
        ...state,
        acc: acc,
        accError: err,
        isFetchingAcc: false
      };
    }
    case ACC_TYPES.ACC_REQUEST_ACCOUNT_CREATE: {
      return {
        ...state,
        isCreatingAcc: true
      };
    }
    case ACC_TYPES.ACC_RECEIVE_ACCOUNT_CREATE: {
      const { payload = { acc: defaultAcc } } = action;
      const { acc, err } = payload;
      return {
        ...state,
        acc: acc,
        accError: err,
        isCreatingAcc: false
      };
    }
    case ACC_TYPES.ACC_REQUEST_ACCOUNT_UPDATE: {
      return {
        ...state,
        isUpdatingAcc: true
      };
    }
    case ACC_TYPES.ACC_RECEIVE_ACCOUNT_UPDATE: {
      const { payload = { acc: defaultAcc } } = action;
      const { acc, err } = payload;
      return {
        ...state,
        acc: acc,
        accError: err,
        isUpdatingAcc: false
      };
    }

    // AUTH ACTIONS
    case AUTH_TYPES.AUTH_REQUEST_AUTHENTICATE: {
      return {
        ...state,
        isDeauthenticating: false,
        isAuthenticating: true,
        isCheckingStatus: false
      };
    }
    case AUTH_TYPES.AUTH_REQUEST_DEAUTHENTICATE: {
      return {
        ...state,
        isDeauthenticating: true,
        isAuthenticating: false,
        isCheckingStatus: false
      };
    }
    case AUTH_TYPES.AUTH_REQUEST_STATUS: {
      return {
        ...state,
        isDeauthenticating: false,
        isAuthenticating: false,
        isCheckingStatus: true
      };
    }
    case AUTH_TYPES.AUTH_RECEIVE_AUTHENTICATE: {
      const { payload = defaultAuth } = action;
      const { auth = false, cid } = payload;
      const acc = auth ? state.acc : defaultAcc;
      const { isAuthenticating: wasAuthenticating } = state;
      let authError = null;
      if (wasAuthenticating && !auth) {
        authError = { message: 'Invalid Credentials' };
      }
      setCID(cid);

      return {
        ...state,
        acc,
        authError,
        auth: payload,
        isAuthenticated: auth,
        isDeauthenticating: false,
        isAuthenticating: false,
        isCheckingStatus: false
      };
    }
    default:
      return state;
  }
}
