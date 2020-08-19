import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combinedReducers from './reducers';

export default function configureStore(preloadedState) {
  return createStore(
    combinedReducers,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
}
