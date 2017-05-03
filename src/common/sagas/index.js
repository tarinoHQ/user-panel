import { take, put, call, fork, select } from 'redux-saga/effects';
import { logoutFlow, loginFlow, signup, forgotPassword, forgotCode, changeFPw, getUser } from './auth';
import { 
  getServicesList, 
  createNewService,
  // manage
  getServiceSummary,
  getServiceAnalyse,
  serviceBackupList,
  serviceStarredBackups,
  getServiceEmails,
  getServiceDomains,
  deleteService,
  serviceCreateLogin,
  watchUpdateTasks,
  serviceDoBackup,
  serviceChangePassword,
  serviceBackupRestore,
  serviceBackupStar,
} from './services';
import {
  getDomainsList,
  getSearchedDomains,
  registerDomain,
  getSingleDomain,
  updateDomainDns,
  renewDomain,
  transferDomain,
  deleteDomain,
} from './domains';
import { createTicket, getTickets, getTicketMessages, ticketReply } from './support';
import { createNic, getNicList } from './nic';
import {
  getGateways,
  addToWallet,
  getInvoicesList,
  getInvoice,
  checkOffCode,
  payInvoice
} from './wallet';
import { watchCheckEmail, watchChangePassword, watchUpdateProfile } from './profile';
import { watchGetSettings, watchUpdateSettings } from './settings';
import { getNotifications } from './notifications';
import { getThemePickerList } from './themePicker';

// -- Subroutines
// function* loadServices(fullName, requiredFields) {
//   const currentServices = yield select(getCurentServices);
//   yield call(getNextServices);
// }

// -- Watchers
// function* watchNavigate() {
//   while(true) {
//     const { pathname } = yield take('NAVIGATE');
//     // yield history.push(pathname);
//   }
// }

// -- root
export default function* root() {
  yield [
    // -- Auth
    fork(logoutFlow),
    fork(loginFlow),
    fork(signup),
    fork(forgotPassword),
    fork(forgotCode),
    fork(changeFPw),
    // -- Services
    fork(getServicesList),
    fork(watchUpdateTasks),
    fork(createNewService),
    // -- -- Service Manage
    fork(getServiceSummary),
    fork(getServiceAnalyse),
    fork(serviceBackupList),
    fork(serviceDoBackup),
    fork(serviceBackupStar),
    fork(serviceStarredBackups),
    fork(getServiceEmails),
    fork(getServiceDomains),
    fork(deleteService),
    fork(serviceCreateLogin),
    fork(serviceChangePassword),
    fork(serviceBackupRestore),
    // -- Domains
    fork(getDomainsList),
    fork(getSearchedDomains),
    fork(registerDomain),
    // -- -- Domain Manage
    fork(getSingleDomain),
    fork(updateDomainDns),
    fork(renewDomain),
    fork(transferDomain),
    fork(deleteDomain),
    // -- Support
    fork(createTicket),
    fork(getTickets),
    fork(getTicketMessages),
    fork(ticketReply),
    // -- Nic
    fork(createNic),
    fork(getNicList),
    // -- Wallet
    fork(getGateways),
    fork(addToWallet),
    fork(getInvoicesList),
    fork(getInvoice),
    fork(checkOffCode),
    fork(payInvoice),
    // -- Profile
    fork(watchCheckEmail),
    fork(watchChangePassword),
    fork(watchUpdateProfile),
    // -- Settings
    fork(watchGetSettings),
    fork(watchUpdateSettings),
    // -- Notifications
    fork(getNotifications),
    // -- Theme Picker
    fork(getThemePickerList),
    // -- User
    fork(getUser),
  ];
}
