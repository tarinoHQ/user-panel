import { createSelector } from 'reselect';
import map from 'lodash/map';

// --- Credit
export const getCreditAmount = state => state.wallet.credit.amount;

// --- Add To Wallet
export const getAddToWalletAmount = state => state.wallet.addToWallet.amount;
export const getAddToWalletGateway = state => state.wallet.addToWallet.gateway;
export const isAddToWalletSending = state => state.wallet.addToWallet.isSending;
export const getAddToWalletStatus = state => state.wallet.addToWallet.status;
export const getAddToWalletError = state => state.wallet.addToWallet.error;

// --- Gateways
export const isGatewaysFetching = state => state.wallet.gateways.isFetching;
export const getGatewaysStatus = state => state.wallet.gateways.status;
export const getGatewaysError = state => state.wallet.gateways.error;
export const getGatewaysIds = state => state.wallet.gateways.allIds;
export const getGatewaysById = state => state.wallet.gateways.byId;
export const getGateways = createSelector(
  [getGatewaysIds, getGatewaysById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// --- List
export const isInvoicesListFetching = state => state.wallet.invoicesList.isFetching;
export const getInvoicesListStatus = state => state.wallet.invoicesList.status;
export const getInvoicesListError = state => state.wallet.invoicesList.error;
export const getInvoicesListIds = state => state.wallet.invoicesList.allIds;
export const getInvoicesListById = state => state.wallet.invoicesList.byId;
export const getInvoicesList = createSelector(
  [getInvoicesListIds, getInvoicesListById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// --- Invoice
export const isInvoiceFetching = state => state.wallet.invoice.isFetching;
export const getInvoiceStatus = state => state.wallet.invoice.status;
export const getInvoiceError = state => state.wallet.invoice.error;
export const getInvoiceItems = state => state.wallet.invoice.items;

// --- Off Code
export const showOffCodeInput = state => state.wallet.offCode.showInput;
export const getOffCode = state => state.wallet.offCode.code;
export const isOffCodeValid = state => state.wallet.offCode.isValid;
export const isOffCodeFetching = state => state.wallet.offCode.isFetching;
export const getOffCodeStatus = state => state.wallet.offCode.status;
export const getOffCodeError = state => state.wallet.offCode.error;

// --- Transfer Info
export const getTFCardNo = state => state.wallet.transferInfo.cardNo;
export const getTFSerial = state => state.wallet.transferInfo.serial;
export const getTFDay = state => state.wallet.transferInfo.day;
export const getTFMonth = state => state.wallet.transferInfo.month;
export const getTFYear = state => state.wallet.transferInfo.year;
export const getTFHour = state => state.wallet.transferInfo.hour;
export const getTFMinute = state => state.wallet.transferInfo.minute;

// --- Invoice
export const getInvoicePayFromWalletType = state => state.wallet.invoicePay.fromWalletType;
export const getInvoicePayFromWalletPrice = state => state.wallet.invoicePay.fromWalletPrice;
export const isInvoicePayFetching = state => state.wallet.invoicePay.isFetching;
export const getInvoicePayStatus = state => state.wallet.invoicePay.status;
export const getInvoicePayError = state => state.wallet.invoicePay.error;
