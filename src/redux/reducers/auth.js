import { AUTH_TYPES } from '../actionTypes';
import { setCID } from '../../utils/network';

const defaultAuth = {
  cid: null,
  uid: null,
  created: null,
  renewed: null,
  auth: false
};

const defaultState = {
  auth: defaultAuth,
  isAuthenticated: false,
  isAuthenticating: false,
  isDeauthenticating: false,
  isCheckingStatus: true
};

export default function (state = defaultState, action) {
  switch (action.type) {
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
      setCID(cid);

      return {
        ...state,
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
