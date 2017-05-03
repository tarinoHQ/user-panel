import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import * as selectors from '../selectors/themePicker';
import * as actions from '../actions/themePicker';
import * as types from '../constants/ActionTypes';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import * as api from '../services/api';
import storage from '../utils/storage';

// Theme Picker
export function* getThemePickerList() {
  let requestStatus = 0;
  while (true) {
    try {
      const ac = yield take(types.THEME_PICKER_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getThemes);
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.themePickerSucceed(list));
    } catch (e) {
      console.log('Services list error:', e);
      yield put(actions.themePickerFailed(requestStatus, e));
    }
  }
}