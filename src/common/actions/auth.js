import * as types from '../constants/ActionTypes';

// Logout
export const logout = () => ({
  type: types.LOGOUT,
});

// Login
export const requestLogin = (nextPathname) => ({
  type: types.LOGIN_REQUESTED,
  nextPathname
});
export const loginSucceed = (token) => ({
  type: types.LOGIN_SUCCEED,
  token
});
export const loginFailed = (status, error = null) => ({
  type: types.LOGIN_FAILED,
  status,
  error
});
export const setLoginEmail = (email) => ({
  type: types.LOGIN_EMAIL_CHANGED,
  email
});
export const setLoginPassword = (password) => ({
  type: types.LOGIN_PASSWORD_CHANGED,
  password
});

// Signup
export const requestSignup = () => ({
  type: types.SIGNUP_REQUESTED,
});
export const signupSucceed = () => ({
  type: types.SIGNUP_SUCCEED,
});
export const signupFailed = (status, error = null) => ({
  type: types.SIGNUP_FAILED,
  status,
  error
});
export const setSignupFirstName = (firstName) => ({
  type: types.SIGNUP_FNAME_CHANGED,
  firstName
});
export const setSignupLastName = (lastName) => ({
  type: types.SIGNUP_LNAME_CHANGED,
  lastName
});
export const setSignupEmail = (email) => ({
  type: types.SIGNUP_EMAIL_CHANGED,
  email
});
export const setSignupPassword = (password) => ({
  type: types.SIGNUP_PASSWORD_CHANGED,
  password
});
export const setSignupMobile = (mobile) => ({
  type: types.SIGNUP_MOBILE_CHANGED,
  mobile
});

// Forgot Password
export const requestForgotPassword = () => ({
  type: types.FORGOT_REQUESTED,
});
export const forgotPasswordSucceed = (session, msgType) => ({
  type: types.FORGOT_FAILED,
  session, 
  msgType
});
export const forgotPasswordFailed = (status, error = null) => ({
  type: types.FORGOT_SUCCEED,
  status,
  error
});
export const setForgotPasswordEmail = (email) => ({
  type: types.FORGOT_EMAIL_CHANGED,
  email
});

// Forgot Password Code
export const requestForgotCode = () => ({
  type: types.FORGOT_CODE_REQUESTED,
});
export const forgotCodeSucceed = () => ({
  type: types.FORGOT_CODE_SUCCEED,
});
export const forgotCodeFailed = (status, error = null) => ({
  type: types.FORGOT_CODE_FAILED,
  status,
  error
});
export const setForgotCode = (code) => ({
  type: types.FORGOT_CODE_CHANGED,
  code
});
export const setForgotCodePassword = (password) => ({
  type: types.FORGOT_CODE_PASSWORD_CHANGED,
  password
});

// Change Forgotten Password
export const requestChangeFPw = () => ({
  type: types.CHANGE_FPW_REQUESTED,
});
export const changeFPwSucceed = () => ({
  type: types.FORGOT_FPW_SUCCEED,
});
export const changeFPwFailed = (status, error = null) => ({
  type: types.FORGOT_FPW_FAILED,
  status,
  error
});
export const setChangeFPwPassword = (password) => ({
  type: types.FORGOT_FPW_PASSWORD_CHANGED,
  password
});

// User
export const requestUser = () => ({
  type: types.USER_REQUESTED,
});
export const userSucceed = ({ email, notifiCount, credit }) => ({
  type: types.USER_SUCCEED,
  email,
  notifiCount, 
  credit 
});
export const userFailed = (status, error = null) => ({
  type: types.USER_FAILED,
  status,
  error
});