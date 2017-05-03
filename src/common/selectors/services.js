import { domainTypes, addons } from '../constants/Orders';
import { getSelectedDomainsPrice } from './domains';
import { getPickedTheme, getPickedThemeDetails } from './themePicker';
import { addonsById } from '../data/addons';
import { plansById } from '../data/plans';
import { createSelector } from 'reselect';
import map from 'lodash/map';


export const getNewServiceDomainType = state => state.services.new.domainType;
export const getNewServiceDomainAddress = state => state.services.new.domainAddress;
export const getNewServiceLocation = state => state.services.new.location;
export const getNewServicePlan = state => state.services.new.plan;
export const getNewServiceCms = state => state.services.new.cms;
export const getNewServiceTheme = state => state.services.new.theme;
export const getNewServiceThemeLayout = state => state.services.new.themeLayout;
export const getNewServiceDedIp = state => state.services.new.dedicatedIp;
export const getNewServiceDedDns = state => state.services.new.dedicatedDns;
export const isNewServiceFetching = state => state.services.new.isFetching;
export const getNewServiceStatus = state => state.services.new.status;
export const getNewServiceError = state => state.services.new.error;
export const getNewServiceTotal = createSelector(
  [
    getNewServiceDomainType,
    getNewServicePlan,
    getNewServiceDedIp,
    getNewServiceDedDns,
    getSelectedDomainsPrice,
    getPickedTheme,
    getPickedThemeDetails,
  ],
  (
    domainType,
    plan,
    dedIp,
    dedDns,
    selectedDomainsPrice,
    pickedTheme,
    pickedThemeDetails,
  ) => {
    let total = 0;
    // domains
    if (domainType === domainTypes.NEW) {
      total += selectedDomainsPrice;
    }
    // plan
    if (plan) {
      total += plansById[plan].price;
    }
    // addons
    if (dedIp) {
      total += addonsById[addons.DED_IP].price;
    }
    if (dedDns) {
      total += addonsById[addons.DED_DNS].price;
    }
    // theme
    if (pickedTheme) {
      total += parseInt(pickedThemeDetails.price || 0);
    }
    return total;
  }
);

export const isListFetching = state => state.services.list.isFetching;
export const getListStatus = state => state.services.list.status;
export const getListError = state => state.services.list.error;
export const getListIds = state => state.services.list.allIds;
export const getListById = state => state.services.list.byId;
export const getList = createSelector(
  [getListIds, getListById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);


// Manage
// --- summary
export const isMsSummaryFetching = state => state.services.manage.summary.isFetching;
export const getMsSummaryStatus = state => state.services.manage.summary.status;
export const getMsSummaryError = state => state.services.manage.summary.error;
// --- --- data
export const getMsBackupCount        = state => state.services.manage.summary.backupCount;
export const getMsSuspendedStatus    = state => state.services.manage.summary.suspendedStatus;
export const getMsDomain             = state => state.services.manage.summary.domain;
export const getMsDiskLimitMb        = state => state.services.manage.summary.diskLimitMb;
export const getMsDiskUsedMb         = state => state.services.manage.summary.diskUsedMb;
export const getMsPlan               = state => state.services.manage.summary.plan;
export const getMsCpuPercent         = state => state.services.manage.summary.cpuPercent;
export const getMsMemoryUsagePercent = state => state.services.manage.summary.memoryUsagePercent;
export const getMsUsername           = state => state.services.manage.summary.username;
export const getMsDescription        = state => state.services.manage.summary.description;
export const getMsLocation           = state => state.services.manage.summary.location;

// --- analyse
export const isMsAnalyseFetching = state => state.services.manage.analyse.isFetching;
export const getMsAnalyseStatus = state => state.services.manage.analyse.status;
export const getMsAnalyseError = state => state.services.manage.analyse.error;
export const getMsAnalyseAlexa = state => state.services.manage.analyse.alexa;

// --- delete
export const getMsDeleteReason = state => state.services.manage.delete.reason;
export const isMsDeleteSending = state => state.services.manage.delete.isSending;
export const getMsDeleteStatus = state => state.services.manage.delete.status;
export const getMsDeleteError = state => state.services.manage.delete.error;

// --- Backup
// --- --- 
export const isMsDoBackupFetching = state => state.services.manage.backup.doBackup.isFetching;
export const getMsDoBackupStatus = state => state.services.manage.backup.doBackup.status;
export const getMsDoBackupError = state => state.services.manage.backup.doBackup.error;
// --- --- 
export const isMsBackupStarFetching = state => state.services.manage.backup.star.isFetching;
export const getMsBackupStarStatus = state => state.services.manage.backup.star.status;
export const getMsBackupStarError = state => state.services.manage.backup.star.error;
// --- --- 
export const isMsBackupRestoreModalOpen = state => state.services.manage.backup.restore.isModalOpen;
export const getMsBackupRestoreBackupId = state => state.services.manage.backup.restore.backupId;
export const isMsBackupRestoreFetching = state => state.services.manage.backup.restore.isFetching;
export const getMsBackupRestoreStatus = state => state.services.manage.backup.restore.status;
export const getMsBackupRestoreError = state => state.services.manage.backup.restore.error;
// --- --- 
export const isMsBackupDeleteFetching = state => state.services.manage.backup.delete.isFetching;
export const getMsBackupDeleteStatus = state => state.services.manage.backup.delete.status;
export const getMsBackupDeleteError = state => state.services.manage.backup.delete.error;
// --- --- 
export const isMsBackupDropboxFetching = state => state.services.manage.backup.dropbox.isFetching;
export const getMsBackupDropboxStatus = state => state.services.manage.backup.dropbox.status;
export const getMsBackupDropboxError = state => state.services.manage.backup.dropbox.error;
// --- --- Drive
export const isMsBackupDriveFetching = state => state.services.manage.backup.drive.isFetching;
export const getMsBackupDriveStatus = state => state.services.manage.backup.drive.status;
export const getMsBackupDriveError = state => state.services.manage.backup.drive.error;
// --- --- 
export const isMsBackupFtpFetching = state => state.services.manage.backup.ftp.isFetching;
export const getMsBackupFtpStatus = state => state.services.manage.backup.ftp.status;
export const getMsBackupFtpError = state => state.services.manage.backup.ftp.error;
// --- --- 
export const isMsBackupListFetching = state => state.services.manage.backup.list.isFetching;
export const getMsBackupListStatus = state => state.services.manage.backup.list.status;
export const getMsBackupListError = state => state.services.manage.backup.list.error;
export const getMsBackupListIds = state => state.services.manage.backup.list.allIds;
export const getMsBackupListById = state => state.services.manage.backup.list.byId;
export const getMsBackupList = createSelector(
  [getMsBackupListIds, getMsBackupListById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);
// --- --- 
export const isMsStarredBackupsFetching = state => state.services.manage.backup.starred.isFetching;
export const getMsStarredBackupsStatus = state => state.services.manage.backup.starred.status;
export const getMsStarredBackupsError = state => state.services.manage.backup.starred.error;
export const getMsStarredBackupsIds = state => state.services.manage.backup.starred.allIds;
export const getMsStarredBackupsById = state => state.services.manage.backup.starred.byId;
export const getMsStarredBackups = createSelector(
  [getMsStarredBackupsIds, getMsStarredBackupsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// --- upgrade
export const getMsUpgradeLocation   = state => state.services.manage.upgrade.location;
export const getMsUpgradePlan       = state => state.services.manage.upgrade.plan;
export const isMsUpgradePlanSending = state => state.services.manage.upgrade.isPlanSending;
export const getMsUpgradePlanStatus = state => state.services.manage.upgrade.planStatus;
export const getMsUpgradePlanError  = state => state.services.manage.upgrade.planError;
// ---
export const getMsUpgradeCms        = state => state.services.manage.upgrade.cms;
export const isMsUpgradeCmsSending  = state => state.services.manage.upgrade.isCmsSending;
export const getMsUpgradeCmsStatus  = state => state.services.manage.upgrade.cmsStatus;
export const getMsUpgradeCmsError   = state => state.services.manage.upgrade.cmsError;

// --- Host
export const getMsHostCpanel   = state => state.services.manage.host.cpanel;
export const getMsHostUsername = state => state.services.manage.host.username;
export const isMsHostFetching  = state => state.services.manage.host.isFetching;
export const getMsHostStatus   = state => state.services.manage.host.status;
export const getMsHostError    = state => state.services.manage.host.error;

// --- Change Password
export const getMsChangePassword       = state => state.services.manage.changePassword.password;
export const isMsChangePasswordSending = state => state.services.manage.changePassword.isSending;
export const getMsChangePasswordStatus = state => state.services.manage.changePassword.status;
export const getMsChangePasswordError  = state => state.services.manage.changePassword.error;

// --- Emails 
export const isMsEmailsFetching = state => state.services.manage.emails.isFetching;
export const getMsEmailsStatus  = state => state.services.manage.emails.status;
export const getMsEmailsError   = state => state.services.manage.emails.error;
export const getMsEmailsIds     = state => state.services.manage.emails.allIds;
export const getMsEmailsById    = state => state.services.manage.emails.byId;
export const getMsEmails = createSelector(
  [getMsEmailsIds, getMsEmailsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// --- Domains 
export const isMsDomainsFetching = state => state.services.manage.domains.isFetching;
export const getMsDomainsStatus  = state => state.services.manage.domains.status;
export const getMsDomainsError   = state => state.services.manage.domains.error;
export const getMsDomainsIds     = state => state.services.manage.domains.allIds;
export const getMsDomainsById    = state => state.services.manage.domains.byId;
export const getMsDomains = createSelector(
  [getMsDomainsIds, getMsDomainsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// --- Create Login 
export const isMsCreateLoginFetching = state => state.services.manage.createLogin.isFetching;
export const getMsCreateLoginStatus  = state => state.services.manage.createLogin.status;
export const getMsCreateLoginError   = state => state.services.manage.createLogin.error;
