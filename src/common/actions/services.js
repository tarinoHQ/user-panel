import * as types from '../constants/ActionTypes';

// New
export const setServiceDomainType = (value) => ({
  type: types.SERVICE_DOMAIN_TYPE_CHANGED,
  value
});

export const setServiceDomainAddress = (value) => ({
  type: types.SERVICE_DOMAIN_ADDRESS_CHANGED,
  value
});

export const setServiceLocation = (value) => ({
  type: types.SERVICE_LOCATION_CHANGED,
  value
});

export const setServicePlan = (value) => ({
  type: types.SERVICE_PLAN_CHANGED,
  value
});

export const setServiceCms = (value) => ({
  type: types.SERVICE_CMS_CHANGED,
  value
});

export const setServiceTheme = (value) => ({
  type: types.SERVICE_THEME_CHANGED,
  value
});

export const setServiceThemeLayout = (value) => ({
  type: types.SERVICE_THEME_LAYOUT_CHANGED,
  value
});

export const toggleServiceDedIp = () => ({
  type: types.SERVICE_DEDIP_TOGGLED
});

export const toggleServiceDedDns = () => ({
  type: types.SERVICE_DEDDNS_TOGGLED
});

export const requestCreateService = () => ({
  type: types.SERVICE_CREATE_REQUESTED,
});
export const createServiceFailed = (status, error = null) => ({
  type: types.SERVICE_CREATE_FAILED,
  status,
  error
});
export const createServiceSucceed = (invoiceId) => ({
  type: types.SERVICE_CREATE_SUCCEED,
  invoiceId
});

// List
export const requestServicesList = () => ({
  type: types.SERVICES_LIST_REQUESTED,
});
export const servicesListFailed = (status, error = null) => ({
  type: types.SERVICES_LIST_FAILED,
  status,
  error
});
export const servicesListSucceed = (services) => ({
  type: types.SERVICES_LIST_SUCCEED,
  services
});

// Tasks
export const servicesTasksFailed = (status, error = null) => ({
  type: types.SERVICES_TASKS_FAILED,
  status,
  error,
});
export const servicesTasksSucceed = (allIds, byId) => ({
  type: types.SERVICES_TASKS_SUCCEED,
  allIds,
  byId,
});


// Manage
// --- Summary
export const requestMsSummary = (orderId) => ({
  type: types.MS_SUMMARY_REQUESTED,
  orderId
});
export const MsSummaryFailed = (status, error = null) => ({
  type: types.MS_SUMMARY_FAILED,
  status,
  error
});
export const MsSummarySucceed = (data) => ({
  type: types.MS_SUMMARY_SUCCEED,
  data
});


// --- Analyse
export const requestMsAnalyse = (orderId) => ({
  type: types.MS_ANALYSE_REQUESTED,
  orderId
});
export const MsAnalyseFailed = (status, error = null) => ({
  type: types.MS_ANALYSE_FAILED,
  status,
  error
});
export const MsAnalyseSucceed = (data) => ({
  type: types.MS_ANALYSE_SUCCEED,
  data
});


// --- Backups
// --- --- BACKUP!
export const requestMsDoBackup = (orderId) => ({
  type: types.MS_DO_BACKUP_REQUESTED,
  orderId
});
export const MsDoBackupFailed = (status, error = null) => ({
  type: types.MS_DO_BACKUP_FAILED,
  status,
  error
});
export const MsDoBackupSucceed = () => ({
  type: types.MS_DO_BACKUP_SUCCEED,
});
// --- --- Star Backup
export const requestMsBackupStar = (orderId, backupId, isStar) => ({
  type: types.MS_BACKUP_STAR_REQUESTED,
  orderId,
  backupId,
  isStar,
});
export const MsBackupStarFailed = (status, error = null) => ({
  type: types.MS_BACKUP_STAR_FAILED,
  status,
  error
});
export const MsBackupStarSucceed = (list) => ({
  type: types.MS_BACKUP_STAR_SUCCEED,
});
// --- --- Backup Restore
export const openMsBackupRestoreModal = (backupId) => ({
  type: types.MS_BACKUP_RESTORE_MODAL_OPENED,
  backupId
});
export const closeMsBackupRestoreModal = () => ({
  type: types.MS_BACKUP_RESTORE_MODAL_CLOSED,
});
export const requestMsBackupRestore = (orderId, backupId) => ({
  type: types.MS_BACKUP_RESTORE_REQUESTED,
  orderId,
  backupId
});
export const MsBackupRestoreFailed = (status, error = null) => ({
  type: types.MS_BACKUP_RESTORE_FAILED,
  status,
  error
});
export const MsBackupRestoreSucceed = () => ({
  type: types.MS_BACKUP_RESTORE_SUCCEED,
});
// --- --- Delete Backup
export const requestMsBackupDelete = (orderId, backupId) => ({
  type: types.MS_BACKUP_DELETE_REQUESTED,
  orderId,
  backupId
});
export const MsBackupDeleteFailed = (status, error = null) => ({
  type: types.MS_BACKUP_DELETE_FAILED,
  status,
  error
});
export const MsBackupDeleteSucceed = (list) => ({
  type: types.MS_BACKUP_DELETE_SUCCEED,
  list
});
// --- --- Transfer Backup to FTP
export const requestMsBackupFtp = (orderId, backupId) => ({
  type: types.MS_BACKUP_FTP_REQUESTED,
  orderId, 
  backupId
});
export const MsBackupFtpFailed = (status, error = null) => ({
  type: types.MS_BACKUP_FTP_FAILED,
  status,
  error
});
export const MsBackupFtpSucceed = () => ({
  type: types.MS_BACKUP_FTP_SUCCEED,
});
// --- --- Transfer Backup to Dropbox
export const requestMsBackupDropbox = (orderId, backupId) => ({
  type: types.MS_BACKUP_DROPBOX_REQUESTED,
  orderId, 
  backupId
});
export const MsBackupDropboxFailed = (status, error = null) => ({
  type: types.MS_BACKUP_DROPBOX_FAILED,
  status,
  error
});
export const MsBackupDropboxSucceed = () => ({
  type: types.MS_BACKUP_DROPBOX_SUCCEED,
});
// --- --- Transfer Backup to Google Drive
export const requestMsBackupDrive = (orderId, backupId) => ({
  type: types.MS_BACKUP_DRIVE_REQUESTED,
  orderId, 
  backupId
});
export const MsBackupDriveFailed = (status, error = null) => ({
  type: types.MS_BACKUP_DRIVE_FAILED,
  status,
  error
});
export const MsBackupDriveSucceed = () => ({
  type: types.MS_BACKUP_DRIVE_SUCCEED,
});
// --- --- Backup List
export const requestMsBackupList = (orderId) => ({
  type: types.MS_BACKUP_LIST_REQUESTED,
  orderId
});
export const MsBackupListFailed = (status, error = null) => ({
  type: types.MS_BACKUP_LIST_FAILED,
  status,
  error
});
export const MsBackupListSucceed = (list) => ({
  type: types.MS_BACKUP_LIST_SUCCEED,
  list
});
// --- --- Starred Backup
export const requestMsStarredBackups = (orderId) => ({
  type: types.MS_STARRED_BACKUPS_REQUESTED,
  orderId
});
export const MsStarredBackupsFailed = (status, error = null) => ({
  type: types.MS_STARRED_BACKUPS_FAILED,
  status,
  error
});
export const MsStarredBackupsSucceed = (list) => ({
  type: types.MS_STARRED_BACKUPS_SUCCEED,
  list
});


// --- Delete
export const setMsDeleteReason = (value) => ({
  type: types.MS_DELETE_REASON_CHANGED,
  value
});
export const requestMsDelete = (orderId) => ({
  type: types.MS_DELETE_REQUESTED,
  orderId
});
export const MsDeleteFailed = (status, error = null) => ({
  type: types.MS_DELETE_FAILED,
  status,
  error
});
export const MsDeleteSucceed = (data) => ({
  type: types.MS_DELETE_SUCCEED,
  data
});


// --- Upgrade
export const setMsUpgradeLocation = (value) => ({
  type: types.MS_UPGRADE_LOCATION_CHANGED,
  value
});
export const setMsUpgradePlan = (value) => ({
  type: types.MS_UPGRADE_PLAN_CHANGED,
  value
});
export const requestMsUpgradePlan = (orderId, createInvoice) => ({
  type: types.MS_UPGRADE_PLAN_REQUESTED,
  orderId,
  createInvoice
});
export const MsUpgradePlanFailed = (status, error = null) => ({
  type: types.MS_UPGRADE_PLAN_FAILED,
  status,
  error
});
export const MsUpgradePlanSucceed = (data) => ({
  type: types.MS_UPGRADE_PLAN_SUCCEED,
  data
});
// --- --- cms
export const setMsUpgradeCms = (value) => ({
  type: types.MS_UPGRADE_CMS_CHANGED,
  value
});
export const requestMsUpgradeCms = (orderId) => ({
  type: types.MS_UPGRADE_CMS_REQUESTED,
  orderId
});
export const MsUpgradeCmsFailed = (status, error = null) => ({
  type: types.MS_UPGRADE_CMS_FAILED,
  status,
  error
});
export const MsUpgradeCmsSucceed = (data) => ({
  type: types.MS_UPGRADE_CMS_SUCCEED,
  data
});

// --- Host
export const requestMsHost = (orderId) => ({
  type: types.MS_HOST_REQUESTED,
  orderId
});
export const MsHostFailed = (status, error = null) => ({
  type: types.MS_HOST_FAILED,
  status,
  error
});
export const MsHostSucceed = (data) => ({
  type: types.MS_HOST_SUCCEED,
  data
});


// --- Change Password
export const setMsChangePassword = (value) => ({
  type: types.MS_SET_PASSWORD,
  value
});
export const requestMsChangePassword = (orderId) => ({
  type: types.MS_CHANGE_PASSWORD_REQUESTED,
  orderId
});
export const MsChangePasswordFailed = (status, error = null) => ({
  type: types.MS_CHANGE_PASSWORD_FAILED,
  status,
  error
});
export const MsChangePasswordSucceed = (data) => ({
  type: types.MS_CHANGE_PASSWORD_SUCCEED,
  data
});


// --- Emails
export const requestMsEmails = (orderId) => ({
  type: types.MS_EMAILS_REQUESTED,
  orderId
});
export const MsEmailsFailed = (status, error = null) => ({
  type: types.MS_EMAILS_FAILED,
  status,
  error
});
export const MsEmailsSucceed = (list) => ({
  type: types.MS_EMAILS_SUCCEED,
  list
});

// --- Domains
export const requestMsDomains = (orderId) => ({
  type: types.MS_DOMAINS_REQUESTED,
  orderId
});
export const MsDomainsFailed = (status, error = null) => ({
  type: types.MS_DOMAINS_FAILED,
  status,
  error
});
export const MsDomainsSucceed = (list) => ({
  type: types.MS_DOMAINS_SUCCEED,
  list
});

// --- Create Login
export const requestMsCreateLogin = (orderId) => ({
  type: types.MS_CREATE_LOGIN_REQUESTED,
  orderId
});
export const MsCreateLoginFailed = (status, error = null) => ({
  type: types.MS_CREATE_LOGIN_FAILED,
  status,
  error
});
export const MsCreateLoginSucceed = (data) => ({
  type: types.MS_CREATE_LOGIN_SUCCEED,
  data
});

