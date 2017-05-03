import { banks, onlineGateways } from '../constants/Wallet';
import { siteUrl, mUrl } from '../config';

export const bankNumbers = {
  [banks.MELLAT]: {
    cardNo: '6104337913805170',
    accountNo: '41719408665',
  },
  [banks.PARSIAN]: {
    cardNo: '6104337913805170',
    accountNo: '41719408665',
  },
  [banks.PASARGAD]: {
    cardNo: '6104337913805170',
    accountNo: '41719408665',
  },
};

export const makeOnlineGatewayURL = (invoiceId, gatewayId, token) =>
  `${mUrl}/gateway/invoice/${gatewayId}/${invoiceId}?t=${token}`;

export const isOnlineGateway = (gatewayOrBank) =>
  gatewayOrBank === onlineGateways.MELLAT ||
  gatewayOrBank === onlineGateways.PASARGAD ||
  gatewayOrBank === onlineGateways.PARSIAN;

export const gatewayIdsByBank = {
  [onlineGateways.MELLAT]: '3',
  [onlineGateways.PASARGAD]: '4',
  [onlineGateways.PARSIAN]: '5',
};
