import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/domains';
import * as selectors from '../selectors/domains';
import * as api from '../services/api';
import storage from '../utils/storage';
import each from 'lodash/each';
import map from 'lodash/map';

// Domains List
export function* getDomainsList() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.DOMAINS_LIST_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getDomainsList, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.domainsListSucceed(list));
    } catch (e) {
      console.log('Domains error:', e);
      yield put(actions.domainsListFailed(requestStatus, e));
    }
  }
}

// Searched Domains List (Whois)
export function* getSearchedDomains() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.SEARCHED_DOMAINS_REQUSTED);
      const token = yield call(storage.get, 'token');
      const address = yield select(selectors.getDomainAddress);
      const domainNames = yield select(selectors.getDomainNames);
      const { status, msg, domains } = yield call(api.getSearchedDomains, { token, address, domainNames });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.searchedDomainsFetched(domains));
      // Set availables selected
      for (let i = 0; i < domains.length; i++) {
        if (domains[i].available) {
          yield put(actions.toggleDomainSelected(domains[i].domainName));
          yield put(actions.setDomainYearPlan(domains[i].domainName, '1'));
        }
      }
    } catch (e) {
      console.log('Searched Domains error:', e);
      yield put(actions.searchedDomainsFailed(requestStatus, e));
    }
  }
}

// Register Domain
export function* registerDomain() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.REGISTER_DOMAIN_REQUESTED);
      const token = yield call(storage.get, 'token');
      // Get and parse data
      const address = yield select(selectors.getDomainAddress);
      const selectedDomains = yield select(selectors.getSelectedDomains);
      const nicUsername = yield select(selectors.getDomainNic);
      const useTarinoDNS = yield select(selectors.getUseTarinoDNS);
      const dnsArray = yield select(selectors.getDomainDNS);
      const domainNames = map(selectedDomains, sd => ({
        domainName: sd.domainName,
        yearPlan: sd.selectedYearPlan || '1',
      }));
      // Call Api
      const { status, msg, invoiceId } = yield call(api.registerDomain, {
        token,
        address,
        domainNames,
        nicUsername,
        dnsType: useTarinoDNS ? 'tarino' : 'custom',
        dnsArray,
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.registerDomainSucceed(invoiceId));
      yield put(push(`/invoices/${invoiceId}`));
    } catch (e) {
      console.log('Register domain error:', e);
      yield put(actions.registerDomainFailed(requestStatus, e));
    }
  }
}


// ---
// Get Single Domain
export function* getSingleDomain() {
  let requestStatus = 0;
  while (true) {
    try {
      const { domainId } = yield take(types.MD_INFO_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list, yearPlans } = yield call(api.getSingleDomain, { token, domainId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MdInfoSucceed(list, yearPlans));
    } catch (e) {
      console.log('Md Info error:', e);
      yield put(actions.MdInfoFailed(requestStatus, e));
    }
  }
}

// Get Single Domain
export function* updateDomainDns() {
  let requestStatus = 0;
  while (true) {
    try {
      const { domainId } = yield take(types.MD_DNS_SAVE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const dns = yield select(selectors.getMdDnsList);
      const { status, msg } = yield call(api.updateDomainDns, { token, domainId, dns });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MdDnsSaveSucceed(list, yearPlans));
    } catch (e) {
      console.log('Md Dns Save error:', e);
      yield put(actions.MdDnsSaveFailed(requestStatus, e));
    }
  }
}

// Get Single Domain
export function* renewDomain() {
  let requestStatus = 0;
  while (true) {
    try {
      const { domainId } = yield take(types.MD_RENEW_REQUESTED);
      const token = yield call(storage.get, 'token');
      const renewPlan = yield select(selectors.getMdRenewPlan);
      const { status, msg, invoiceId } = yield call(api.renewDomain, { token, domainId, renewPlan });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MdRenewSucceed(invoiceId));
      yield put(push(`/invoices/${invoiceId}`));
    } catch (e) {
      console.log('Md Renew error:', e);
      yield put(actions.MdRenewFailed(requestStatus, e));
    }
  }
}

// Transfer Domain
export function* transferDomain() {
  let requestStatus = 0;
  while (true) {
    try {
      const { domainId } = yield take(types.MD_TRANSFER_REQUESTED);
      console.log(domainId);
      const token = yield call(storage.get, 'token');
      const reason = yield select(selectors.getMdTransferReason);
      const { status, msg, transferCode } = yield call(api.transferDomain, { token, domainId, reason });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MdTransferSucceed(transferCode));
    } catch (e) {
      console.log('Md Transfer error:', e);
      yield put(actions.MdTransferFailed(requestStatus, e));
    }
  }
}

// Delete Domain
export function* deleteDomain() {
  let requestStatus = 0;
  while (true) {
    try {
      const { domainId } = yield take(types.MD_DELETE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const reason = yield select(selectors.getMdDeleteReason);
      const { status, msg, transferCode } = yield call(api.deleteDomain, { token, domainId, reason });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MdDeleteSucceed(transferCode));
    } catch (e) {
      console.log('Md Delete error:', e);
      yield put(actions.MdDeleteFailed(requestStatus, e));
    }
  }
}
