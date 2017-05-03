import { removeCommas } from '../utils/numberUtils';
import * as types from '../constants/ActionTypes';

export const setCreditAmount = (credit) => ({
  type: types.CREDIT_AMOUNT_CHANGED,
  credit
});

// ---
export const requestGateways = () => ({
  type: types.GATEWAYS_REQUESTED,
});
export const gatewaysSucceed = (list) => ({
  type: types.GATEWAYS_SUCCEED,
  list
});
export const gatewaysFailed = (status = 0, error) => ({
  type: types.GATEWAYS_FAILED,
  status,
  error,
});

// --- Add To Wallet
export const setAddToWalletAmount = (amount) => ({
  type: types.ADDTOWALLET_AMOUNT_CHANGED,
  amount: removeCommas(amount)
});

export const setAddToWalletGateway = (gateway) => ({
  type: types.ADDTOWALLET_GATEWAY_CHANGED,
  gateway
});

export const requestAddToWallet = () => ({
  type: types.ADDTOWALLET_REQUESTED,
});
export const addToWalletSucceed = (invoiceId) => ({
  type: types.ADDTOWALLET_SUCCEED,
  invoiceId
});
export const addToWalletFailed = (status = 0, error) => ({
  type: types.ADDTOWALLET_FAILED,
  status,
  error,
});

// ---
export const requestInvoicesList = () => ({
  type: types.INVOICES_LIST_REQUESTED,
});
export const invoicesListSucceed = (list) => ({
  type: types.INVOICES_LIST_SUCCEED,
  list,
});
export const invoicesListFailed = (status = 0, error) => ({
  type: types.INVOICES_LIST_FAILED,
  status,
  error,
});

export const setInvoiceGateway = (invoiceId, gatewayId = null, gatewayType = null) => ({
  type: types.INVOICE_GATEWAY_CHANGED,
  invoiceId,
  gatewayId,
  gatewayType,
});
export const setInvoiceBank = (invoiceId, bank = null) => ({
  type: types.INVOICE_BANK_CHANGED,
  invoiceId,
  bank,
});

// ---
export const requestInvoice = (invoiceId) => ({
  type: types.INVOICE_REQUESTED,
  invoiceId
});
export const invoiceSucceed = (invoice, items) => ({
  type: types.INVOICE_SUCCEED,
  invoice,
  items,
});
export const invoiceFailed = (status = 0, error) => ({
  type: types.INVOICE_FAILED,
  status,
  error,
});

// --- Off Code
export const toggleOffCode = () => ({
  type: types.INVOICE_OFFCODE_TOGGLED
});
export const setOffCode = (value) => ({
  type: types.INVOICE_OFFCODE_CHANGED,
  value
});
export const requestOffCode = (invoiceId) => ({
  type: types.INVOICE_OFFCODE_REQUESTED,
  invoiceId
});
export const offCodeSucceed = (invoice, items) => ({
  type: types.INVOICE_OFFCODE_SUCCEED,
  invoice,
  items,
});
export const offCodeFailed = (status = 0, error) => ({
  type: types.INVOICE_OFFCODE_FAILED,
  status,
  error,
});

// --- Transfer Info
export const setTFCardNo = (value) => ({
  type: types.INVOICE_TF_CARDNO_CHANGED,
  value
});
export const setTFSerial = (value) => ({
  type: types.INVOICE_TF_SERIAL_CHANGED,
  value
});
export const setTFDay = (value) => ({
  type: types.INVOICE_TF_DAY_CHANGED,
  value: (value || '').trim().substr(0,2)
});
export const setTFMonth = (value) => ({
  type: types.INVOICE_TF_MONTH_CHANGED,
  value
});
export const setTFYear = (value) => ({
  type: types.INVOICE_TF_YEAR_CHANGED,
  value
});
export const setTFHour = (value) => ({
  type: types.INVOICE_TF_HOUR_CHANGED,
  value: (value || '').trim().substr(0,2)
});
export const setTFMinute = (value) => ({
  type: types.INVOICE_TF_MINUTE_CHANGED,
  value: (value || '').trim().substr(0,2)
});

// --- Invoice Pay
export const setInvoicePayFromWalletType = (value) => ({
  type: types.INVOICE_PAY_FROM_WALLET_TYPE,
  value
});

export const setInvoicePayFromWalletPrice = (price) => ({
  type: types.INVOICE_PAY_FROM_WALLET_PRICE,
  price: removeCommas(price)
});

export const requestInvoicePay = (invoiceId) => ({
  type: types.INVOICE_PAY_REQUESTED,
  invoiceId
});
export const invoicePaySucceed = (invoice, items) => ({
  type: types.INVOICE_PAY_SUCCEED,
  invoice,
  items,
});
export const invoicePayFailed = (status = 0, error) => ({
  type: types.INVOICE_PAY_FAILED,
  status,
  error,
});
