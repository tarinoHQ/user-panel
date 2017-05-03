import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import { parse } from 'qs';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import auth from '../utils/auth';
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/auth';
import * as selectors from '../selectors/auth';
import * as routingSelectors from '../selectors/routing';
import * as api from '../services/api';
import storage from '../utils/storage';

// Logout
export function* logoutFlow() {
  while (true) {
    try {
      const { type } = yield take([types.LOGOUT, types.TOKEN_EXPIRED]);
      const token = yield call(storage.get, 'token');
      if (type === types.LOGOUT) {
        yield call(api.logout, { token });
      }
      yield call(storage.remove, 'token');
      yield put(push('/login'));
    } catch (e) {
      console.log('Logout error:', e);
      yield call(storage.remove, 'token');
      yield put(push('/login'));
    }
  }
}

// Login
function* authorize(email, password, nextPathname) {
  let requestStatus = 0;
  try {
    const { status, msg, token, data } = yield call(api.login, { email, password });
    requestStatus = status;
    if (status > 1) throw new Error(msg);
    yield put(actions.loginSucceed(token));
    // save notifiCount and credit
    yield put(actions.userSucceed(data));
    yield call(storage.save, { token });
    console.log(localStorage);
    const { nextPathname } = yield select(routingSelectors.getRoutingQuery);
    // Redirect to correct page
    if(nextPathname) {
      const pathArray = decodeURIComponent(nextPathname).split('%3F');
      const pathname = pathArray[0];
      const query = parse(pathArray[1]);
      yield put(push({
          pathname,
          query
        }));
    } else {
      yield put(push('/dashboard'));
    }
  } catch (e) {
    yield put(actions.loginFailed(requestStatus, e));
  }
}

export function* loginFlow() {
  while (true) {
    const { nextPathname } = yield take(types.LOGIN_REQUESTED);
    const email = yield select(selectors.getLoginEmail);
    const password = yield select(selectors.getLoginPassword);
    const auth = yield fork(authorize, email, password, nextPathname);
    const action = yield take([types.LOGOUT, types.TOKEN_EXPIRED, types.LOGIN_FAILED]);
    if (action.type === types.LOGOUT);
      yield cancel(auth);
    // Do Logout
  }
}

// Signup
export function* signup() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.SIGNUP_REQUESTED);
      const firstName = yield select(selectors.getSignupFirstName);
      const lastName  = yield select(selectors.getSignupLastName);
      const email     = yield select(selectors.getSignupEmail);
      const password  = yield select(selectors.getSignupPassword);
      const mobile    = yield select(selectors.getSignupMobile);
      const { status, msg, token } = yield call(api.signup, { firstName, lastName, email, password, mobile });
      requestStatus = status;
      if (status > 1) throw new Error(msg);
      yield put(actions.signupSucceed());
      // login user automaticaly
      yield call(storage.save, { token });
      yield put(push('/dashboard'));
      
    } catch (e) {
      yield put(actions.signupFailed(requestStatus, e));
    }
  }
}

// Forgot Password
export function* forgotPassword() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.FORGOT_REQUESTED);
      const email = yield select(selectors.getForgotPasswordEmail);
      const { status, msg, session, msgType } = yield call(api.forgotPassword, { email });
      requestStatus = status;
      if (status > 1) throw new Error(msg);
      yield put(actions.forgotPasswordSucceed(session, msgType));
      yield put(push('/forgot-code'));
    } catch (e) {
      yield put(actions.forgotPasswordFailed(requestStatus, e));
    }
  }
}

// Forgot Password Code
export function* forgotCode() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.FORGOT_CODE_REQUESTED);
      const code = yield select(selectors.getForgotCode);
      const password = yield select(selectors.getForgotCodePassword);
      const { status, msg } = yield call(api.submitForgotCode, { code });
      requestStatus = status;
      if (status > 1) throw new Error(msg);
      yield put(actions.forgotCodeSucceed());
      yield put(push('/login'));
    } catch (e) {
      yield put(actions.forgotCodeFailed(requestStatus, e));
    }
  }
}

// Forgot Password Code
export function* changeFPw() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.CHANGE_FPW_REQUESTED);
      const password = yield select(selectors.getChangeFPwPassword);
      const { status, msg } = yield call(api.changeFPw, { password });
      requestStatus = status;
      if (status > 1) throw new Error(msg);
      yield put(actions.forgotCodeSucceed());
      yield put(push('/login'));
    } catch (e) {
      yield put(actions.forgotCodeFailed(requestStatus, e));
    }
  }
}

// User
export function* getUser() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.USER_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, data } = yield call(api.getUser, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.userSucceed(data));
    } catch (e) {
      yield put(actions.userFailed(requestStatus, e));
    }
  }
}

export const dispatchRequestUser = (store) => {
  if (auth.isLoggedIn()) {
    store.dispatch(actions.requestUser());
  }
}
