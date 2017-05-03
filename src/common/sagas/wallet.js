import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';

import { makeOnlineGatewayURL, isOnlineGateway, gatewayIdsByBank } from '../data/wallet';
import { gatewayTypes, ATWPaymentTypes } from '../constants/Wallet';
import * as types from '../constants/ActionTypes';
import * as selectors from '../selectors/wallet';
import * as actions from '../actions/wallet';
import * as api from '../services/api';
import storage from '../utils/storage';
import each from 'lodash/each';
import map from 'lodash/map';

// Gateways
export function* getGateways() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.GATEWAYS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getGateways, { token });
      requestStatus = status;
      isTokenExpired(status);
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.gatewaysSucceed(list));
    } catch (e) {
      console.log('Gateway list error:', e);
      yield put(actions.gatewaysFailed(requestStatus, e));
    }
  }
}

// Add To Wallet
export function* addToWallet() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.ADDTOWALLET_REQUESTED);
      const token = yield call(storage.get, 'token');
      const price = yield select(selectors.getAddToWalletAmount);
      const gateway = yield select(selectors.getAddToWalletGateway);
      const { status, msg, invoiceId } = yield call(api.addCredit, { token, price });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.addToWalletSucceed(invoiceId));
      // Check for online gateway
      if(isOnlineGateway(gateway)) {
        location.replace(makeOnlineGatewayURL(invoiceId, gatewayIdsByBank[gateway], token));
      } else {
        yield put(push(`/invoices/${invoiceId}`)); // TODO: Need tests.
      }
    } catch (e) {
      console.log('Add to wallet error:', e);
      yield put(actions.addToWalletFailed(requestStatus, e));
    }
  }
}

// Invoices List
export function* getInvoicesList() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.INVOICES_LIST_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getInvoicesList, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.invoicesListSucceed(list));
    } catch (e) {
      console.log('Invoices list error:', e);
      yield put(actions.invoicesListFailed(requestStatus, e));
    }
  }
}

// Invoice
export function* getInvoice() {
  let requestStatus = 0;
  while (true) {
    try {
      const { invoiceId } = yield take(types.INVOICE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, invoice, items } = yield call(api.getInvoice, { token, invoiceId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.invoiceSucceed(invoice, items));
    } catch (e) {
      console.log('Invoices list error:', e);
      yield put(actions.invoiceFailed(requestStatus, e));
    }
  }
}

// Check Off Code
export function* checkOffCode() {
  let requestStatus = 0;
  while (true) {
    try {
      const { invoiceId } = yield take(types.INVOICE_OFFCODE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const offCode = yield select(selectors.getOffCode);
      const { status, msg, invoice, items } = yield call(api.checkOffCode, {
        token, invoiceId, offCode
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.offCodeSucceed(invoice, items));
    } catch (e) {
      console.log('Off code error:', e);
      yield put(actions.offCodeFailed(requestStatus, e));
    }
  }
}

// Invoice Pay
export function* payInvoice() {
  let requestStatus = 0;
  while (true) {
    try {
      const { invoiceId } = yield take(types.INVOICE_PAY_REQUESTED);
      const token = yield call(storage.get, 'token');
      const invoicesListById = yield select(selectors.getInvoicesListById);
      const invoiceDetails = invoicesListById[invoiceId] || {};
      const { gatewayType, gatewayId } = invoiceDetails;
      const payMethod = gatewayType;
      const bank = invoiceDetails.bank;
      const price = yield select(selectors.getInvoicePayFromWalletPrice);
      const cardNo = yield select(selectors.getTFCardNo);
      const serial = yield select(selectors.getTFSerial);
      const year = yield select(selectors.getTFYear);
      const month = yield select(selectors.getTFMonth);
      const day = yield select(selectors.getTFDay);
      const hour = yield select(selectors.getTFHour);
      const minute = yield select(selectors.getTFMinute);
      const date = `${year}-${month}-${day}`;
      const time = `${hour}:${minute}`;
      // Check for online gateway
      if(gatewayType === gatewayTypes.ONLINE_GATEWAY) {
        // window.open(makeOnlineGatewayURL(invoiceId, gatewayId, token));
        location.replace(makeOnlineGatewayURL(invoiceId, gatewayId, token));
      }
      // Call API
      const { status, msg, invoice, items } = yield call(api.payInvoice, {
        token,
        invoiceId,
        payMethod,
        price,
        bank,
        cardNo,
        serial,
        date,
        time,
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.invoicePaySucceed(invoice, items));
    } catch (e) {
      console.log('Invoice Pay error:', e);
      yield put(actions.invoicePayFailed(requestStatus, e));
    }
  }
}
