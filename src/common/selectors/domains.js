import { createSelector } from 'reselect';
import reduce from 'lodash/reduce';
import map from 'lodash/map';

export const isListFetching = state => state.domains.list.isFetching;
export const getListStatus = state => state.domains.list.status;
export const getListError = state => state.domains.list.error;
export const getListIds = state => state.domains.list.allIds;
export const getListById = state => state.domains.list.byId;
export const getList = createSelector(
  [getListIds, getListById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const getDomainAddress = state => state.domains.new.address;

export const getDomainNames = state => state.domains.new.domainNames;

export const isSearchedDomainsFetching = state => state.domains.new.searchedDomains.isFetching;
export const getSearchedDomainsStatus = state => state.domains.new.searchedDomains.status;
export const getSearchedDomainsError = state => state.domains.new.searchedDomains.error;
export const getSearchedDomainsIds = state => state.domains.new.searchedDomains.allIds;
export const getSearchedDomainsById = state => state.domains.new.searchedDomains.byId;
export const getSearchedDomains = createSelector(
  [getSearchedDomainsIds, getSearchedDomainsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const getSelectedDomainsIds = state => state.domains.new.searchedDomains.selectedIds;
export const getSelectedDomains = createSelector(
  [getSelectedDomainsIds, getSearchedDomainsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);
export const getSelectedDomainsPrice = createSelector(
  [getSelectedDomains],
  (selectedDomains) => (
    reduce(
      map(selectedDomains, domain => {
        return domain.priceByYearPlan[domain.selectedYearPlan || '1'];
      }),
      (total, price) => total + parseInt(price),
      0
    )
  )
);

export const getDomainNic = state => state.domains.new.nic;
export const isDomainCustomNicActive = state => state.domains.new.customNic;
export const getUseTarinoDNS = state => state.domains.new.useTarinoDNS;
export const getDomainDNS = state => state.domains.new.dns;

export const isDomainRegisterSending = state => state.domains.new.isSending;
export const getDomainRegisterStatus = state => state.domains.new.status;
export const getDomainRegisterError = state => state.domains.new.error;

// --- Manage Domain
// --- --- Info
export const getMdInfoYearPlans = state => state.domains.manage.info.yearPlans;
export const isMdInfoFetching = state => state.domains.manage.info.isFetching;
export const getMdInfoStatus = state => state.domains.manage.info.status;
export const getMdInfoError = state => state.domains.manage.info.error;

// --- --- Dns
export const getMdDnsUseTarino = state => state.domains.manage.dns.useTarino;
export const getMdDnsList = state => state.domains.manage.dns.list;
export const isMdDnsSaveSending = state => state.domains.manage.dns.isSending;
export const getMdDnsSaveStatus = state => state.domains.manage.dns.status;
export const getMdDnsSaveError = state => state.domains.manage.dns.error;

// --- --- Renew
export const getMdRenewPlan = state => state.domains.manage.renew.plan;
export const isMdRenewSending = state => state.domains.manage.renew.isSending;
export const getMdRenewStatus = state => state.domains.manage.renew.status;
export const getMdRenewError = state => state.domains.manage.renew.error;

// --- --- Transfer
export const getMdTransferReason = state => state.domains.manage.transfer.reason;
export const getMdTransferCode = state => state.domains.manage.transfer.code;
export const isMdTransferSending = state => state.domains.manage.transfer.isSending;
export const getMdTransferStatus = state => state.domains.manage.transfer.status;
export const getMdTransferError = state => state.domains.manage.transfer.error;

// --- --- Delete
export const getMdDeleteReason = state => state.domains.manage.delete.reason;
export const isMdDeleteSending = state => state.domains.manage.delete.isSending;
export const getMdDeleteStatus = state => state.domains.manage.delete.status;
export const getMdDeleteError = state => state.domains.manage.delete.error;
