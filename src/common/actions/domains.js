import * as types from '../constants/ActionTypes';

// Domains List
export const requestDomainsList = () => ({
  type: types.DOMAINS_LIST_REQUESTED,
});
export const domainsListFailed = (status, error = null) => ({
  type: types.DOMAINS_LIST_FAILED,
  status,
  error
});
export const domainsListSucceed = (domains) => ({
  type: types.DOMAINS_LIST_SUCCEED,
  domains
});

export const setDomainAddress = (value) => ({
  type: types.DOMAIN_ADDRESS_CHANGED,
  value
});

// Domains Names
export const addDomainName = (domainName) => ({
  type: types.DOMAIN_NAME_ADDED,
  domainName
});
export const removeDomainName = (domainName) => ({
  type: types.DOMAIN_NAME_REMOVED,
  domainName
});
export const setDomainNames = (domainNames) => ({
  type: types.DOMAIN_NAMES_CHANGED,
  domainNames
});

// Searched Domains
export const requestSearchedDomains = () => ({
  type: types.SEARCHED_DOMAINS_REQUSTED,
});
export const searchedDomainsFetched = (domains) => ({
  type: types.SEARCHED_DOMAINS_FETCHED,
  domains
});
export const searchedDomainsFailed = (status = 0, error) => ({
  type: types.SEARCHED_DOMAINS_FAILED,
  error,
  status
});

// Selected Domains
export const toggleDomainSelected = (domainName) => ({
  type: types.DOMAIN_SELECTED_TOGGLED,
  domainName
});
export const setDomainYearPlan = (domainName, yearPlan) => ({
  type: types.DOMAIN_YEARPLAN_CHANGED,
  domainName,
  yearPlan,
});

export const setDomainNic = (username) => ({
  type: types.DOMAIN_NIC_CHANGED,
  username
});

export const toggleDomainCustomNic = () => ({
  type: types.DOMAIN_CUSTOM_NIC_TOGGLED,
});

export const setDomainDNS = (dns) => ({
  type: types.DOMAIN_DNS_CHANGED,
  dns
});
export const toggleUseTarinoDNS = () => ({
  type: types.USE_TARINO_DNS_TOGGLED,
});

export const registerDomain = () => ({
  type: types.REGISTER_DOMAIN_REQUESTED,
});
export const registerDomainSucceed = (invoiceId) => ({
  type: types.REGISTER_DOMAIN_SUCCEED,
  invoiceId
});
export const registerDomainFailed = (status = 0, error) => ({
  type: types.REGISTER_DOMAIN_FAILED,
  error,
  status
});


// --- Manage
// --- --- Info
export const requestMdInfo = (domainId) => ({
  type: types.MD_INFO_REQUESTED,
  domainId
});
export const MdInfoSucceed = (domains, yearPlans) => ({
  type: types.MD_INFO_SUCCEED,
  domains,
  yearPlans
});
export const MdInfoFailed = (status = 0, error) => ({
  type: types.MD_INFO_FAILED,
  error,
  status
});

// --- --- Dns
export const toggleMdDnsUseTarino = () => ({
  type: types.MD_DNS_USE_TARINO_TOGGLED,
});

export const setMdDns = (dns) => ({
  type: types.MD_DNS_CHANGED,
  dns
});

export const requestMdDnsSave = (domainId) => ({
  type: types.MD_DNS_SAVE_REQUESTED,
  domainId
});
export const MdDnsSaveSucceed = () => ({
  type: types.MD_DNS_SAVE_SUCCEED,
});
export const MdDnsSaveFailed = (status = 0, error) => ({
  type: types.MD_DNS_SAVE_FAILED,
  error,
  status
});

// --- --- Renew
export const setMdRenewPlan = (plan) => ({
  type: types.MD_RENEW_PLAN_CHANGED,
  plan
});

export const requestMdRenew = (domainId) => ({
  type: types.MD_RENEW_REQUESTED,
  domainId
});
export const MdRenewSucceed = (invoiceId) => ({
  type: types.MD_RENEW_SUCCEED,
  invoiceId
});
export const MdRenewFailed = (status = 0, error) => ({
  type: types.MD_RENEW_FAILED,
  error,
  status
});

// --- --- Transfer
export const setMdTransferReason = (value) => ({
  type: types.MD_TRANSFER_REASON_CHANGED,
  value
});

export const requestMdTransfer = (domainId) => ({
  type: types.MD_TRANSFER_REQUESTED,
  domainId
});
export const MdTransferSucceed = (code) => ({
  type: types.MD_TRANSFER_SUCCEED,
  code
});
export const MdTransferFailed = (status = 0, error) => ({
  type: types.MD_TRANSFER_FAILED,
  error,
  status
});

// --- --- Delete
export const setMdDeleteReason = (value) => ({
  type: types.MD_DELETE_REASON_CHANGED,
  value
});

export const requestMdDelete = (domainId) => ({
  type: types.MD_DELETE_REQUESTED,
  domainId
});
export const MdDeleteSucceed = () => ({
  type: types.MD_DELETE_SUCCEED,
});
export const MdDeleteFailed = (status = 0, error) => ({
  type: types.MD_DELETE_FAILED,
  error,
  status
});
