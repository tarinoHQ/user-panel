export const backupKinds = {
  ORDERED: 'ordered',
  HOURLY6: '6hourly',
  DAILY: 'daily',
  MONTH: 'monthly',
};  

export const kindsToFa = {
  [backupKinds.ORDERED]: 'سفارشی',
  [backupKinds.HOURLY6]: '۶ ساعته',
  [backupKinds.DAILY]: 'روزانه',
  [backupKinds.MONTH]: 'ماهانه',
};  