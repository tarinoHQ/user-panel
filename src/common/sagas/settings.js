import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import { takeLatest, throttle } from 'redux-saga';
import { push } from 'react-router-redux';

import * as types from '../constants/ActionTypes';
import * as selectors from '../selectors/settings';
import * as actions from '../actions/settings';
import * as api from '../services/api';
import storage from '../utils/storage';
import each from 'lodash/each';
import map from 'lodash/map';

// Settings
export function* getSettings(action) {
  let requestStatus = 0;
  try {
    const token = yield call(storage.get, 'token');
    const { status, msg, notices, mobile, automation } = yield call(api.getUserSetting, { token });
    requestStatus = status;
    if (isTokenExpired(status)) yield put(tokenExpiredAction());
    if (status > 1) throw new Error(msg);
    yield put(actions.settingsSucceed(notices, mobile, automation));
  } catch (e) {
    console.log('Settings error:', e);
    yield put(actions.settingsFailed(requestStatus, e));
  }
}
export function* watchGetSettings() {
  yield takeLatest(types.SETTINGS_REQUESTED, getSettings);
}

// Update Settings
export function* updateSettings(action) {
  let requestStatus = 0;
  try {
    const token = yield call(storage.get, 'token');
    const notices = yield select(selectors.getSeNoticesById);
    const mobile = yield select(selectors.getSeMobile);
    const automation = yield select(selectors.getSeAutomationById);
    const { status, msg } = yield call(api.updateUserSetting, {
      token,
      notices,
      mobile,
      automation,
    });
    requestStatus = status;
    if (isTokenExpired(status)) yield put(tokenExpiredAction());
    if (status > 1) throw new Error(msg);
    yield put(actions.updateSettingsSucceed());
  } catch (e) {
    console.log('Update settings error:', e);
    yield put(actions.updateSettingsFailed(requestStatus, e));
  }
}
export function* watchUpdateSettings() {
  yield takeLatest(types.UPDATE_SETTINGS_REQUESTED, updateSettings);
}
