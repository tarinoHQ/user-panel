import { gatewayArraySchema, invoiceSchema, invoiceArraySchema } from '../constants/Schemas';
import { onlineGateways } from '../constants/Wallet';
import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';

const initialState = {
  credit: {
    amount: 0, 
  },
  gateways: {
    allIds: [],
    byId: {},
    isFetching: false,
    status: null,
    error: null,
  },
  addToWallet: {
    amount: '',
    gateway: '',
    isSending: false,
    status: null,
    error: null,
    invoiceId: null,
  },
  invoicesList: {
    allIds: [],
    byId: {},
    isFetching: false,
    status: null,
    error: null,
  },
  invoice: {
    invoiceId: null,
    items: [],
    isFetching: false,
    status: null,
    error: null,
  },
  offCode: {
    showInput: false,
    code: '',
    isValid: null,
    isFetching: false,
    status: null,
    error: null,
  },
  transferInfo: {
    cardNo: '',
    serial: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
  },
  invoicePay: {
    invoiceId: null,
    fromWalletType: null,
    fromWalletPrice: '0',
    isFetching: false,
    status: null,
    error: null,
  },
};

const credit = (state = initialState.credit, action) => {
  switch (action.type) {
    case types.CREDIT_AMOUNT_CHANGED:
      return { ...state, amount: action.amount };

    case types.USER_SUCCEED:
      return { ...state, amount: action.credit };

    default:
      return state;
  }
};

const gateways = (state = initialState.gateways, action) => {
  switch (action.type) {
    case types.GATEWAYS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.GATEWAYS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.GATEWAYS_SUCCEED:
      const data = normalize(action.list, gatewayArraySchema);
      return { ...state, isFetching: false, allIds: data.result, byId: data.entities.gateways };

    default:
      return state;
  }
};

const addToWallet = (state = initialState.addToWallet, action) => {
  switch (action.type) {
    case types.ADDTOWALLET_AMOUNT_CHANGED:
      return { ...state, amount: action.amount };

    case types.ADDTOWALLET_GATEWAY_CHANGED:
      return { ...state, gateway: action.gateway };

    case types.ADDTOWALLET_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.ADDTOWALLET_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.ADDTOWALLET_SUCCEED:
      return { ...state, isFetching: false, status: 1, invoiceId: action.invoiceId };

    default:
      return state;
  }
};

const invoicesList = (state = initialState.invoicesList, action) => {
  switch (action.type) {
    case types.INVOICES_LIST_REQUESTED:
      return { ...state, isFetching: true, invoiceId: action.invoiceId, status: null, error: null };
    case types.INVOICES_LIST_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.INVOICES_LIST_SUCCEED: {
      const data = normalize(action.list, invoiceArraySchema);
      return { ...state, isFetching: false, allIds: data.result, byId: data.entities.invoices, status: 1 };
    }

    case types.INVOICE_OFFCODE_SUCCEED:
    case types.INVOICE_PAY_SUCCEED:
    case types.INVOICE_SUCCEED: {
      const data = normalize(action.invoice, invoiceSchema);
      return {
          ...state,
          allIds: uniq([ ...state.allIds, data.result]),
          byId: { ...state.byId, ...data.entities.invoices }
        };
    }
    case types.INVOICE_GATEWAY_CHANGED: {
      const { gatewayId, gatewayType, invoiceId } = action;
      return {
          ...state,
          byId: {
            ...state.byId,
            [invoiceId]: {
              ...state.byId[invoiceId],
              gatewayId,
              gatewayType,
            }
          }
        };
    }
    case types.INVOICE_BANK_CHANGED: {
      const { bank, invoiceId } = action;
      return {
          ...state,
          byId: {
            ...state.byId,
            [invoiceId]: {
              ...state.byId[invoiceId],
              bank,
            }
          }
        };
    }
    default:
      return state;
  }
};

const invoice = (state = initialState.invoice, action) => {
  switch (action.type) {
    case types.INVOICE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.INVOICE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.INVOICE_OFFCODE_SUCCEED:
    case types.INVOICE_PAY_SUCCEED:
    case types.INVOICE_SUCCEED:
      return { ...state, isFetching: false, items: action.items };

    default:
      return state;
  }
};

const offCode = (state = initialState.offCode, action) => {
  switch (action.type) {
    case types.INVOICE_OFFCODE_TOGGLED:
      return { ...state, showInput: !state.showInput };

    case types.INVOICE_OFFCODE_CHANGED:
      return { ...state, code: action.value };

    case types.INVOICE_OFFCODE_REQUESTED:
      return { ...state, isFetching: true, isValid: null, status: null, error: null };
    case types.INVOICE_OFFCODE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.INVOICE_OFFCODE_SUCCEED:
      return { ...state, isFetching: false, isValid: true };

    default:
      return state;
  }
};

const transferInfo = (state = initialState.transferInfo, action) => {
  switch (action.type) {
    case types.INVOICE_TF_CARDNO_CHANGED:
      return { ...state, cardNo: action.value };

    case types.INVOICE_TF_SERIAL_CHANGED:
      return { ...state, serial: action.value };

    case types.INVOICE_TF_DAY_CHANGED:
      return { ...state, day: action.value };

    case types.INVOICE_TF_MONTH_CHANGED:
      return { ...state, month: action.value };

    case types.INVOICE_TF_YEAR_CHANGED:
      return { ...state, year: action.value };

    case types.INVOICE_TF_HOUR_CHANGED:
      return { ...state, hour: action.value };

    case types.INVOICE_TF_MINUTE_CHANGED:
      return { ...state, minute: action.value };

    default:
      return state;
  }
};

const invoicePay = (state = initialState.invoicePay, action) => {
  switch (action.type) {
    case types.INVOICE_PAY_FROM_WALLET_TYPE:
      return { ...state, fromWalletType: action.value };

    case types.INVOICE_PAY_FROM_WALLET_PRICE:
      return { ...state, fromWalletPrice: action.price };

    case types.INVOICE_PAY_REQUESTED:
      return { ...state,
        isFetching: true, invoiceId: action.invoiceId, status: null, error: null
      };
    case types.INVOICE_PAY_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.INVOICE_PAY_SUCCEED:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

const wallet = combineReducers({
  credit,
  gateways,
  addToWallet,
  invoicesList,
  invoice,
  offCode,
  transferInfo,
  invoicePay
});

export default wallet;
