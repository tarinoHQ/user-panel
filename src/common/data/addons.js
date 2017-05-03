import { addons } from '../constants/Orders';

export const addonIds = [addons.DED_DNS, addons.DED_IP];

export const addonsById = {
  [addons.DED_IP]: {
    title: 'دریافت آی‌پی (IP) اختصاصی برای هاست',
    description: 'تاثیر مثبت برروی سرعت بارگذاری سایت',
    price: 9000,
  },
  [addons.DED_DNS]: {
    title: 'دریافت نام‌سرور (DNS) اختصاصی برای سایت',
    price: 9000,
  },
};