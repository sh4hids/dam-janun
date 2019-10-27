import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as reducers from './';
import { apiService } from '../helpers';

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = {
      ...state,
      auth: {
        isAuthenticated: false,
        token: '',
      },
    };
  }
  return appReducer(state, action);
};

export default function configureStore(preloadedState) {
  const middlewares = [apiService, thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = rootReducer.default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
