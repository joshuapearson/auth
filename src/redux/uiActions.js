import { UI_TYPES } from './actionTypes';

export const startLoading = () => ({
  type: UI_TYPES.UI_SET_LOADING,
  payload: { isLoading: true }
});

export const stopLoading = () => ({
  type: UI_TYPES.UI_SET_LOADING,
  payload: { isLoading: false }
});

export const logError = error => ({
  type: UI_TYPES.UI_SET_ERROR,
  payload: {
    isErrored: true,
    error
  }
});

export const clearError = () => ({
  type: UI_TYPES.UI_SET_ERROR,
  payload: {
    isErrored: false,
    error: {}
  }
});
