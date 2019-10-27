import fetch from '../utils/axios';
import { api } from '../config/';
import * as types from '../state/auth/types';
import AuthService from './auth-service';

const Auth = new AuthService();
const loginActions = [types.LOGIN_STARTED, types.SIGNUP_STARTED];
const apiService = () => next => action => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const { path, method = 'GET', body, type, jwt } = action.meta;

  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  const url = `${api}${path}`;

  return fetch(url, method, body, type, jwt).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next)
  );
};

function handleErrors(err, action, next) {
  if (action.type === types.LOGOUT_STARTED) {
    Auth.removeToken();
  }

  if (err.status === 401) {
    next({
      type: types.SET_USER_UNAUTHORIZED,
      payload: err,
      meta: action.meta,
    });
  } else {
    next({
      type: `${action.type}_failed`,
      payload: err,
      meta: action.meta,
    });
  }

  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  if (loginActions.includes(action.type)) {
    let { user, token } = res;
    user = {
      ...user,
    };
    Auth.setToken(token);
    Auth.setUser(user);
  } else if (action.type === 'auth/logout') {
    Auth.removeToken();
  }

  next({
    type: `${action.type}_completed`,
    payload: res,
    meta: action.meta,
  });

  return res;
}

export default apiService;
