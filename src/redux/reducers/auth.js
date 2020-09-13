import { AUTH_TYPES, ACC_TYPES, ORG_TYPES } from '../actionTypes';
import { setCID, setRegCID, clearCID, clearRegCID } from '../../utils/network';

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

const defaultRegSess = {
  cid: null,
  org: null,
  secret: null,
  uname: null,
  fname: null,
  lname: null,
  email: null,
  created: null,
  renewed: null,
  phase: 'org'
};

const defaultOrg = {
  orgName: null,
  orgMembers: []
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
  regSession: defaultRegSess,
  regErrors: {},
  isFetchingAcc: false,
  isCreatingAcc: false,
  isUpdatingAcc: false,
  org: defaultOrg,
  orgError: null,
  isFetchingOrg: false
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
      const { payload = { regSession: defaultRegSess } } = action;
      const { regSession, regErrors, appSession } = payload;

      if (appSession) {
        const { cid } = appSession;
        clearRegCID();
        setCID(cid);

        return {
          ...state,
          regSession,
          regErrors,
          authError: null,
          auth: appSession,
          isAuthenticated: true,
          isDeauthenticating: false,
          isAuthenticating: false,
          isCheckingStatus: false,
          isCreatingAcc: false
        };
      } else {
        const { cid } = regSession;
        clearCID();
        setRegCID(cid);

        return {
          ...state,
          regSession,
          regErrors,
          isCreatingAcc: false
        };
      }
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

    // ORGANIZATION ACTIONS
    case ORG_TYPES.ORG_REQUEST_ORGANIZATION: {
      return {
        ...state,
        isFetchingOrg: true
      };
    }
    case ORG_TYPES.ORG_RECEIVE_ORGANIZATION: {
      const { payload = { org: defaultOrg } } = action;
      const { org, err } = payload;
      return {
        ...state,
        org,
        orgError: err,
        isFetchingOrg: false
      };
    }

    default:
      return state;
  }
}
