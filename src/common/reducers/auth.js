import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialState = {
  login: {
    email: '',
    password: '',
    token: '',
    isFetching: false,
    status: 0,
    error: null,
  },
  signup: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    isSuccessful: false,
    isFetching: false,
    status: 0,
    error: null,
  },
  forgotPassword: {
    email: '',
    session: null,
    msgType: null,
    isFetching: false,
    status: null,
    error: null,
  },
  forgotCode: {
    code: '',
    password: '',
    isFetching: false,
    status: null,
    error: null,
  },
  changeFPw: {
    password: '',
    isFetching: false,
    status: null,
    error: null,
  },
};

// Login
const login = (state = initialState.login, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return { ...state, token: '' };

    case types.LOGIN_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.LOGIN_SUCCEED:
      return { ...state, isFetching: false, token: action.token };
    case types.LOGIN_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.USER_SUCCEED:
    case types.LOGIN_EMAIL_CHANGED:
      return { ...state, email: action.email };

    case types.LOGIN_PASSWORD_CHANGED:
      return { ...state, password: action.password };

    default:
      return state;
  }
};

// Signup
const signup = (state = initialState.signup, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.SIGNUP_SUCCEED:
      return { ...state, isSuccessful: true, isFetching: false, status: 1 };
    case types.SIGNUP_FAILED:
      return { ...state, status: action.status, error: action.error, isFetching: false };

    case types.SIGNUP_FNAME_CHANGED:
      return { ...state, firstName: action.firstName };

    case types.SIGNUP_LNAME_CHANGED:
      return { ...state, lastName: action.lastName };

    case types.SIGNUP_EMAIL_CHANGED:
      return { ...state, email: action.email };

    case types.SIGNUP_PASSWORD_CHANGED:
      return { ...state, password: action.password };

    case types.SIGNUP_MOBILE_CHANGED:
      return { ...state, mobile: action.mobile };

    default:
      return state;
  }
};

// Forgot Password
const forgotPassword = (state = initialState.forgotPassword, action) => {
  switch (action.type) {
    case types.FORGOT_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.FORGOT_SUCCEED:
      return { ...state, isFetching: false, status: 1, session: action.session, msgType: action.msgType };
    case types.FORGOT_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.FORGOT_EMAIL_CHANGED:
      return { ...state, email: action.email };

    default:
      return state;
  }
};

// Forgot Password Code
const forgotCode = (state = initialState.forgotCode, action) => {
  switch (action.type) {
    case types.FORGOT_CODE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.FORGOT_CODE_SUCCEED:
      return { ...state, isFetching: false, status: 1 };
    case types.FORGOT_CODE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.FORGOT_CODE_CHANGED:
      return { ...state, code: action.code };

    case types.FORGOT_CODE_PASSWORD_CHANGED:
      return { ...state, password: action.password };

    default:
      return state;
  }
};

// Change Forgotten Password
const changeFPw = (state = initialState.changeFPw, action) => {
  switch (action.type) {
    case types.CHANGE_FPW_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.FORGOT_FPW_FAILED:
      return { ...state, isFetching: false, status: 1 };
    case types.FORGOT_FPW_SUCCEED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.FORGOT_FPW_PASSWORD_CHANGED:
      return { ...state, password: action.password };

    default:
      return state;
  }
};

const auth = combineReducers({
  login,
  signup,
  forgotPassword,
  forgotCode,
  changeFPw,
});

export default auth;
