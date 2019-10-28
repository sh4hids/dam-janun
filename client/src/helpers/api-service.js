import fetch from '../utils/axios';
import { api } from '../config/';

const apiService = () => next => action => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const { path, method = 'GET', body } = action.meta;

  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  const url = `${api}${path}`;

  return fetch({ url, method, body }).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next),
  );
};

function handleErrors(err, action, next) {
  next({
    type: `${action.type}_failed`,
    payload: err,
    meta: action.meta,
  });

  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  next({
    type: `${action.type}_done`,
    payload: res.data,
    meta: action.meta,
  });

  return res;
}

export default apiService;
