import { take, put, call, fork, select, cancel, race } from 'redux-saga/effects';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import * as selectors from '../selectors/services';
import * as domainSelectors from '../selectors/domains';
import * as types from '../constants/ActionTypes';
import * as actions from '../actions/services';
import { push } from 'react-router-redux';
import { takeLatest, delay } from 'redux-saga';
import * as api from '../services/api';
import storage from '../utils/storage';
import { domainTypes } from '../constants/Orders';
import map from 'lodash/map';

// Serivces List
export function* getServicesList() {
  let requestStatus = 0;
  while (true) {
    try {
      const logoutAction = yield take(types.SERVICES_LIST_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getServicesList, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      console.log({ status, msg, list });
      yield put(actions.servicesListSucceed(list));
    } catch (e) {
      console.log('Services list error:', e);
      yield put(actions.servicesListFailed(requestStatus, e));
    }
  }
}

/**
 * 1 get services list and check if any is processing
 * 2 run interval sega
 * ----
 * 1 delay
 * 3 call api
 * 4 replace api result with new data
 */
// Update Tasks
export function* updateTasks() {
  while(true) {
    let requestStatus = 0;
    try {
      console.log('TASKS: before delay.');
      yield call(delay, 20000);
      console.log('TASKS: after delay.');
      const token = yield call(storage.get, 'token');
      const { status, msg, allIds, byId } = yield call(api.getProcessingServicesTasks, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      console.log({ status, msg, allIds, byId });
      yield put(actions.servicesTasksSucceed(allIds, byId));
    } catch (e) {
        // cancellation error -- can handle this if you wish
        console.log('services update tasks error:', e);
        yield put(actions.servicesTasksFailed(requestStatus, e));
        return;
    }
  }
}
export function* watchUpdateTasks() {  
  while (true) {
    yield take(types.SERVICES_LIST_SUCCEED);
    const list = yield select(selectors.getList);
    // check if any is processing
    const hasProcessing = list.reduce((result, listItem) => {
      return result || listItem.status === 'processing';
    }, false);
    console.log('TASKS: hasProcessing =', hasProcessing);
    // run interval
    if(hasProcessing) {
      console.log('TASKS: start race.');
      yield race([
        call(updateTasks),
        take(types.SERVICES_LIST_SUCCEED)
      ]);
    }
    
  }
}

// ---
// Create New Service
export function* createNewService() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.SERVICE_CREATE_REQUESTED);
      const token           = yield call(storage.get, 'token');
      const total           = yield select(selectors.getNewServiceTotal);
      const cms             = yield select(selectors.getNewServiceCms);
      const plan            = yield select(selectors.getNewServicePlan);
      const location        = yield select(selectors.getNewServiceLocation);
      const dedIp           = yield select(selectors.getNewServiceDedIp);
      const dedDns          = yield select(selectors.getNewServiceDedDns);
      const themeLayout     = yield select(selectors.getNewServiceThemeLayout);
      const domainType      = yield select(selectors.getNewServiceDomainType);
      const domainAddress   = yield select(selectors.getNewServiceDomainAddress);
      // from new domain
      const nicUsername     = yield select(domainSelectors.getDomainNic);
      const newAddress      = yield select(domainSelectors.getDomainAddress);
      const selectedDomains = yield select(domainSelectors.getSelectedDomains);
      // choose between addresses
      let address = '';
      if (domainType === domainTypes.NEW) {
        address = newAddress;
      } else {
        address = domainAddress;
      }
      // map domainNames to their compelete data
      const domainNames = map(selectedDomains, sd => ({
        domainName: sd.domainName,
        yearPlan: sd.selectedYearPlan || '1',
      }));
      // call api
      const { status, msg, invoiceId } = yield call(api.createService, {
        token,
        nicUsername,
        domainType,
        address,
        domainNames,
        location,
        plan,
        cms,
        themeLayout,
        dedIp,
        dedDns,
      });
      requestStatus = status;
      if(status === 1) {
        if(total === 0) {
          yield put(push(`/dashboard/services`));
        } else {
          yield put(push(`/invoices/${invoiceId}`));
        }
      }
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.createServiceSucceed(invoiceId));
    } catch (e) {
      console.log('Create new service error:', e);
      yield put(actions.createServiceFailed(requestStatus, e));
    }
  }
}

// Manage
// --- Summary
export function* getServiceSummary() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_SUMMARY_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, data } = yield call(api.getServiceSummary, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsSummarySucceed(data));
    } catch (e) {
      console.log('Service analyse error:', e);
      yield put(actions.MsSummaryFailed(requestStatus, e));
    }
  }
}

// --- Analyse
export function* getServiceAnalyse() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_ANALYSE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, data } = yield call(api.getServiceAnalyse, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsAnalyseSucceed(data));
    } catch (e) {
      console.log('Service analyse error:', e);
      yield put(actions.MsAnalyseFailed(requestStatus, e));
    }
  }
}

// --- Delete
export function* deleteService() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_DELETE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const reason = yield select(selectors.getMsDeleteReason);
      const { status, msg, data } = yield call(api.deleteService, { token, orderId, reason });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsDeleteSucceed(data));
    } catch (e) {
      console.log('Service delete error:', e);
      yield put(actions.MsDeleteFailed(requestStatus, e));
    }
  }
}

// --- Create Login
export function* serviceCreateLogin() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_CREATE_LOGIN_REQUESTED);
      const token = yield call(storage.get, 'token');
      let newWindow = window.open('', '_blank');
      const { status, msg, data } = yield call(api.serviceCreateLogin, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      // open url in new tab
      newWindow.location = data.url;
      yield put(actions.MsCreateLoginSucceed(data));
    } catch (e) {
      console.log('Service CreateLogin error:', e);
      yield put(actions.MsCreateLoginFailed(requestStatus, e));
    }
  }
}


// --- Create Login
export function* serviceChangePassword() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_CHANGE_PASSWORD_REQUESTED);
      const token = yield call(storage.get, 'token');
      const password = yield select(selectors.getMsChangePassword);
      const { status, msg, data } = yield call(api.servicePasswordChange, { token, orderId, password });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsChangePasswordSucceed(data));
    } catch (e) {
      console.log('service change password error:', e);
      yield put(actions.MsChangePasswordFailed(requestStatus, e));
    }
  }
}

// --- Emails
export function* getServiceEmails() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_EMAILS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getServiceEmails, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsEmailsSucceed(list));
    } catch (e) {
      console.log('Service emails error:', e);
      yield put(actions.MsEmailsFailed(requestStatus, e));
    }
  }
}

// --- Backup
// --- --- Do Backup
export function* serviceDoBackup() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_DO_BACKUP_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg } = yield call(api.serviceDoBackup, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsDoBackupSucceed());
    } catch (e) {
      console.log('Service do backup error:', e);
      yield put(actions.MsDoBackupFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Star
export function* serviceBackupStar() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId, isStar } = yield take(types.MS_BACKUP_STAR_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg } = yield call(api.serviceBackupStar, { token, orderId, backupId, isStar });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupStarSucceed());
    } catch (e) {
      console.log('Service backup star error:', e);
      yield put(actions.MsBackupStarFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Restore
export function* serviceBackupRestore() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId } = yield take(types.MS_BACKUP_RESTORE_REQUESTED);
      const token = yield call(storage.get, 'token');
      console.log('SAGA: backupId =', backupId);
      const { status, msg } = yield call(api.serviceBackupRestore, { token, orderId, backupId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupRestoreSucceed());
    } catch (e) {
      console.log('service backup restore error:', e);
      yield put(actions.MsBackupRestoreFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Delete
export function* serviceBackupDelete() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId } = yield take(types.MS_BACKUP_DELETE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.serviceBackupDelete, { token, orderId, backupId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupDeleteSucceed(list));
    } catch (e) {
      console.log('Service backup delete error:', e);
      yield put(actions.MsBackupDeleteFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Dropbox
export function* serviceBackupDropbox() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId } = yield take(types.MS_BACKUP_DROPBOX_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg } = yield call(api.serviceBackupDropbox, { token, orderId, backupId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupDropboxSucceed());
    } catch (e) {
      console.log('Service backup dropbox error:', e);
      yield put(actions.MsBackupDropboxFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Drive
export function* serviceBackupDrive() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId } = yield take(types.MS_BACKUP_DRIVE_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg } = yield call(api.serviceBackupDrive, { token, orderId, backupId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupDriveSucceed());
    } catch (e) {
      console.log('Service backup drive error:', e);
      yield put(actions.MsBackupDriveFailed(requestStatus, e));
    }
  }
}

// --- --- Backup Ftp
export function* serviceBackupFtp() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId, backupId } = yield take(types.MS_BACKUP_FTP_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg } = yield call(api.serviceBackupFtp, { token, orderId, backupId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupFtpSucceed());
    } catch (e) {
      console.log('Service backup ftp error:', e);
      yield put(actions.MsBackupFtpFailed(requestStatus, e));
    }
  }
}

// --- --- Backup List
export function* serviceBackupList() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_BACKUP_LIST_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.serviceBackupList, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsBackupListSucceed(list));
    } catch (e) {
      console.log('Service backup list error:', e);
      yield put(actions.MsBackupListFailed(requestStatus, e));
    }
  }
}

// --- --- Starred Backups
export function* serviceStarredBackups() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_STARRED_BACKUPS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.serviceBackupList, { token, orderId, star: '1' });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsStarredBackupsSucceed(list));
    } catch (e) {
      console.log('Service backup list error:', e);
      yield put(actions.MsStarredBackupsFailed(requestStatus, e));
    }
  }
}

// --- Domains
export function* getServiceDomains() {
  let requestStatus = 0;
  while (true) {
    try {
      const { orderId } = yield take(types.MS_DOMAINS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getServiceDomains, { token, orderId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.MsDomainsSucceed(list));
    } catch (e) {
      console.log('Service analyse error:', e);
      yield put(actions.MsDomainsFailed(requestStatus, e));
    }
  }
}
