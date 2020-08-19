import { UI_TYPES } from '../actionTypes';

const defaultState = {
  isLoading: false,
  isErrored: false,
  error: {}
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case UI_TYPES.UI_SET_LOADING: {
      const { isLoading = false } = action.payload;
      return {
        ...state,
        isLoading
      };
    }
    case UI_TYPES.UI_SET_ERROR: {
      const { isErrored = false, error = {} } = action.payload;
      return {
        ...state,
        isErrored,
        error
      };
    }
    default:
      return state;
  }
}
