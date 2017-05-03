import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { domainArraySchema, domainItemArraySchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import without from 'lodash/without';
import omit from 'lodash/omit';

const initialState = {
  list: {
    allIds: [],
    byId: {},
    isFetching: false,
    status: null,
    error: null,
  },
  new: {
    address: '',
    domainNames: [],
    searchedDomains: {
      allIds: [],
      byId: {},
      selectedIds: [],
      status: null,
      error: null,
      isFetching: false
    },
    nic: '',
    customNic: false,
    useTarinoDNS: true,
    dns: [
      'ns1.tarino.ir',
      'ns2.tarino.ir',
      null,
      null,
    ],
    isSending: false,
    status: null,
    error: null,
  },
  manage: {
    info: {
      yearPlans: {
        1: 0,
        5: 0,
      },
      isFetching: false,
      status: null,
      error: null,
    },
    dns: {
      useTarino: true,
      list: [
        'ns1.tarino.ir',
        'ns2.tarino.ir',
        null,
        null,
      ],
      isSending: false,
      status: null,
      error: null,
    },
    renew: {
      plan: '5',
      isSending: false,
      status: null,
      error: null,
    },
    transfer: {
      code: null,
      reason: '',
      isSending: false,
      status: null,
      error: null,
    },
    delete: {
      reason: '',
      isSending: false,
      status: null,
      error: null,
    },
  }
};

const list = (state = initialState.list, action) => {
  switch (action.type) {
    case types.DOMAINS_LIST_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };

    case types.DOMAINS_LIST_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.MD_INFO_SUCCEED:
    case types.DOMAINS_LIST_SUCCEED:
      const data = normalize(action.domains, domainItemArraySchema);
      return {
        ...state,
        isFetching: false,
        allIds: data.result,
        byId: data.entities.domainsList
      };

    default:
      return state;
  }
};

const domainNames = (state = initialState.domainNames, action) => {
  switch (action.type) {
    case types.DOMAIN_NAME_ADDED:
      return [...state, action.domainName];

    case types.DOMAIN_NAME_REMOVED:
      return without(state, action.domainName);

    case types.DOMAIN_NAMES_CHANGED:
      return action.domainNames || [];

    default:
      return state;
  }
};

const searchedDomains = (state = initialState.searchedDomains, action) => {
  switch (action.type) {
    case types.SEARCHED_DOMAINS_REQUSTED:
      return { ...state, isFetching: true, allIds: [], byId: {}, selectedIds: [], status: null, error: null };

    case types.SEARCHED_DOMAINS_FETCHED:
      const data = normalize(action.domains, domainArraySchema);
      return {
          ...state,
          isFetching: false,
          allIds: data.result,
          byId: data.entities.domains
        };

    case types.SEARCHED_DOMAINS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.DOMAIN_SELECTED_TOGGLED: {
      const { domainName } = action;
      const domain = state.byId[domainName];
      return {
          ...state,
          byId: {
            ...state.byId,
            [domainName]: {
              ...domain,
              selected: !domain.selected
            }
          },
          selectedIds: !domain.selected ? [ ...state.selectedIds, domainName ] : without(state.selectedIds, domainName)
        };
    }

    case types.DOMAIN_YEARPLAN_CHANGED: {
      const { domainName, yearPlan } = action;
      const domain = state.byId[domainName];
      return {
          ...state,
          byId: {
            ...state.byId,
            [domainName]: {
              ...domain,
              selected: true,
              selectedYearPlan: yearPlan,
            }
          },
        };
    }

    default:
      return state;
  }
};

const newDomain = (state = initialState.new, action) => {
  switch (action.type) {
    case types.DOMAIN_ADDRESS_CHANGED:
      return { ...state, address: action.value };

    case types.DOMAIN_NAME_ADDED:
    case types.DOMAIN_NAME_REMOVED:
    case types.DOMAIN_NAMES_CHANGED:
      return { ...state, domainNames: domainNames(state.domainNames, action) };

    case types.SEARCHED_DOMAINS_REQUSTED:
    case types.SEARCHED_DOMAINS_FETCHED:
    case types.SEARCHED_DOMAINS_FAILED:
    case types.DOMAIN_SELECTED_TOGGLED:
    case types.DOMAIN_YEARPLAN_CHANGED:
      return { ...state, searchedDomains: searchedDomains(state.searchedDomains, action) };

    case types.DOMAIN_NIC_CHANGED:
      return { ...state, nic: action.username };

    case types.DOMAIN_CUSTOM_NIC_TOGGLED:
      return { ...state, customNic: !state.customNic };

    case types.USE_TARINO_DNS_TOGGLED:
      const resetDnsList = !state.useTarinoDNS ? { dns: initialState.new.dns } : {};
      return { ...state, ...resetDnsList, useTarinoDNS: !state.useTarinoDNS };

    case types.DOMAIN_DNS_CHANGED:
      return { ...state, dns: action.dns };

    case types.REGISTER_DOMAIN_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };

    case types.REGISTER_DOMAIN_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };

    case types.REGISTER_DOMAIN_SUCCEED:
      return { ...state, isSending: false };

    default:
      return state;
  }
};


// Manage
// --- Manage Info
const info = (state = initialState.manage.info, action) => {
  switch (action.type) {
    case types.MD_INFO_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MD_INFO_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MD_INFO_SUCCEED:
      return { ...state, isFetching: false, status: 1, yearPlans: action.yearPlans };

    default:
      return state;
  }
};

// --- Manage DNS
const dns = (state = initialState.manage.dns, action) => {
  switch (action.type) {
    case types.MD_DNS_USE_TARINO_TOGGLED:
      const resetDnsList = !state.useTarino ? { list: initialState.manage.dns.list } : {};
      return { ...state, ...resetDnsList, useTarino: !state.useTarino };

    case types.MD_DNS_CHANGED:
      return { ...state, list: action.dns };

    case types.MD_DNS_SAVE_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.MD_DNS_SAVE_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MD_DNS_SAVE_SUCCEED:
      return { ...state, isSending: false, status: 1 };

    default:
      return state;
  }
};

// --- Manage Domain Renew
const renew = (state = initialState.manage.renew, action) => {
  switch (action.type) {
    case types.MD_RENEW_PLAN_CHANGED:
      return { ...state, plan: action.plan };

    case types.MD_RENEW_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.MD_RENEW_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MD_RENEW_SUCCEED:
      return { ...state, isSending: false, status: 1 };

    default:
      return state;
  }
};

// --- Manage Domain Transfer
const transfer = (state = initialState.manage.transfer, action) => {
  switch (action.type) {
    case types.MD_TRANSFER_REASON_CHANGED:
      return { ...state, reason: action.value };

    case types.MD_TRANSFER_REQUESTED:
      return { ...state, isSending: true, status: null, error: null, code: null };
    case types.MD_TRANSFER_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MD_TRANSFER_SUCCEED:
      return { ...state, isSending: false, status: 1, code: action.code };

    default:
      return state;
  }
};

// --- Manage Domain Delete
const del = (state = initialState.manage.delete, action) => {
  switch (action.type) {
    case types.MD_DELETE_REASON_CHANGED:
      return { ...state, reason: action.value };

    case types.MD_DELETE_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.MD_DELETE_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MD_DELETE_SUCCEED:
      return { ...state, isSending: false, status: 1 };

    default:
      return state;
  }
};

// --- Manage
const manage = combineReducers({
  info,
  dns,
  renew,
  transfer,
  delete: del,
});


const domains = combineReducers({
  list: list,
  new: newDomain,
  manage: manage,
});

export default domains;
