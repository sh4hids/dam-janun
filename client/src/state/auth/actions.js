import * as types from './types';

export const signup = data => ({
  type: types.SIGNUP_STARTED,
  meta: {
    async: true,
    blocking: true,
    path: `/signup`,
    method: 'POST',
    body: data,
  },
});

export const login = data => ({
  type: types.LOGIN_STARTED,
  meta: {
    async: true,
    blocking: true,
    path: `/login`,
    method: 'POST',
    body: data,
  },
});

export const logout = token => {
  return {
    type: types.LOGOUT_STARTED,
    meta: {
      async: true,
      blocking: true,
      path: `/logout`,
      method: 'POST',
      body: {},
      token,
    },
  };
};

export const setUserToken = token => ({
  type: types.SET_USER_TOKEN,
  payload: token,
});
