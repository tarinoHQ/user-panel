import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/notifications';
import * as selectors from '../selectors/notifications';
import * as api from '../services/api';
import storage from '../utils/storage';
import each from 'lodash/each';
import map from 'lodash/map';

// Get Notifications
export function* getNotifications() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.NOTIFICATIONS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getNotificationsList, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.notificationsSucceed(list));
    } catch (e) {
      console.log('Notifications error:', e);
      yield put(actions.notificationsFailed(requestStatus, e));
    }
  }
}
