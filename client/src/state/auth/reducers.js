import * as types from './types';

const initialState = {
  isAuthenticated: false,
  token: '',
};

const authReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.SIGNUP_COMPLETED:
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: {
          ...payload.user,
        },
        token: payload.token,
      };
    case types.LOGIN_COMPLETED:
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case types.LOGOUT_COMPLETED || types.LOGOUT_FAILED:
      return {
        ...state,
        ...initialState,
      };
    case types.SET_USER_TOKEN:
      return {
        ...state,
        isAuthenticated: payload ? true : false,
        token: payload,
      };
    case types.RESET_PASSWORD_COMPLETED:
      return {
        ...state,
        ...initialState,
      };
    case types.SET_USER_UNAUTHORIZED:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducers;
