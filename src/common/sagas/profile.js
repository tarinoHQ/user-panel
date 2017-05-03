import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import { takeLatest, throttle } from 'redux-saga';
import { push } from 'react-router-redux';

import * as types from '../constants/ActionTypes';
import * as selectors from '../selectors/profile';
import * as actions from '../actions/profile';
import * as api from '../services/api';
import storage from '../utils/storage';
import each from 'lodash/each';
import map from 'lodash/map';

// Check Email
export function* checkEmail(action) {
  let requestStatus = 0;
  try {
    const token = yield call(storage.get, 'token');
    const email = yield select(selectors.getProfileEmail);
    const { status, msg } = yield call(api.checkUserEmail, { token, email });
    requestStatus = status;
    if (isTokenExpired(status)) yield put(tokenExpiredAction());
    if (status > 1) throw new Error(msg);
    yield put(actions.checkEmailSucceed());
  } catch (e) {
    console.log('Check email error:', e);
    yield put(actions.checkEmailFailed(requestStatus, e));
  }
}
export function* watchCheckEmail() {
  yield takeLatest(types.CHECK_EMAIL_REQUESTED, checkEmail);
}

// Change Password
export function* changePassword(action) {
  let requestStatus = 0;
  try {
    const token = yield call(storage.get, 'token');
    const newPassword = yield select(selectors.getChangePasswordNew);
    const password = yield select(selectors.getChangePasswordCurrent);
    const { status, msg } = yield call(api.changePassword, { token, newPassword, password });
    requestStatus = status;
    if (isTokenExpired(status)) yield put(tokenExpiredAction());
    if (status > 1) throw new Error(msg);
    yield put(actions.changePasswordSucceed());
  } catch (e) {
    console.log('Change password error:', e);
    yield put(actions.changePasswordFailed(requestStatus, e));
  }
}
export function* watchChangePassword() {
  yield takeLatest(types.CHANGE_PASSWORD_REQUESTED, changePassword);
}

// Change Password
export function* updateProfile(action) {
  let requestStatus = 0;
  try {
    const token = yield call(storage.get, 'token');
    const mobile = yield select(selectors.getProfileMobile);
    const email = yield select(selectors.getProfileEmail);
    const firstName = yield select(selectors.getProfileFirstName);
    const lastName = yield select(selectors.getProfileLastName);
    const tel = yield select(selectors.getProfileTel);
    const address = yield select(selectors.getProfileAddress);
    const city = yield select(selectors.getProfileCity);
    const state = yield select(selectors.getProfileState);
    const { status, msg } = yield call(api.updateProfile, {
      token,
      mobile,
      email,
      firstName,
      lastName,
      tel,
      address,
      city,
      state,
    });
    requestStatus = status;
    if (isTokenExpired(status)) yield put(tokenExpiredAction());
    if (status > 1) throw new Error(msg);
    yield put(actions.updateProfileSucceed());
  } catch (e) {
    console.log('Update error:', e);
    yield put(actions.updateProfileFailed(requestStatus, e));
  }
}
export function* watchUpdateProfile() {
  yield takeLatest(types.UPDATE_PROFILE_REQUESTED, updateProfile);
}
