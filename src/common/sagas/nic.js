import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import storage from '../utils/storage';
import * as types from '../constants/ActionTypes';
import * as selectors from '../selectors/nic';
import * as actions from '../actions/nic';
import * as api from '../services/api';

// New Ticket
export function* createNic() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.NIC_USERNAME_REQUSTED);
      const token = yield call(storage.get, 'token');
      const idCardNo = yield select(selectors.getNicIdCardNo);
      const email = yield select(selectors.getNicEmail);
      const firstName = yield select(selectors.getNicFirstName);
      const lastName = yield select(selectors.getNicLastName);
      const phone = yield select(selectors.getNicPhone);
      const postalCode = yield select(selectors.getNicPostalCode);
      const address = yield select(selectors.getNicAddress);
      const state = yield select(selectors.getNicProvince);
      const city = yield select(selectors.getNicCity);
      const { status, msg, username, list } = yield call(api.createNic, {
        token,
        idCardNo,
        email,
        firstName,
        lastName,
        phone,
        postalCode,
        address,
        state,
        city,
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.nicUsernameFetched(username, list));
    } catch (e) {
      console.log('Create nic error:', e);
      yield put(actions.nicUsernameFailed(requestStatus, e));
    }
  }
}

// Tickets List
export function* getNicList() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.RECENT_NIC_USERNAMES_REQUSTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getNicList, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.recentNicUsernamesFetched(list));
    } catch (e) {
      console.log('List nic error:', e);
      yield put(actions.recentNicUsernamesFailed(requestStatus, e));
    }
  }
}
