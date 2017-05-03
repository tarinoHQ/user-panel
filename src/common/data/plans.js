import { plans, pricePeriods, serverLocations } from '../constants/Plans';
import getImage from '../data/images';

// export const planIds = [
//   // IR
//   plans.IR_1,
//   plans.IR_2,
//   plans.IR_3,
//   plans.IR_4,
//   plans.IR_PRO_1,
//   plans.IR_PRO_2,
//   plans.IR_PRO_3,
//   // DU
//   plans.DU_1,
//   plans.DU_2,
//   plans.DU_3,
//   plans.DU_4,
//   plans.DU_PRO_1,
//   plans.DU_PRO_2,
//   plans.DU_PRO_3,
// ];

export const planIds = [
  plans.PLAN_FREE_1,
  plans.PLAN_1,
  plans.PLAN_2,
  plans.PLAN_3,
  plans.PLAN_4,
  plans.PLAN_PRO_1,
  plans.PLAN_PRO_2,
  plans.PLAN_PRO_3,
];

export const plansById = {
  [plans.PLAN_FREE_1]: {
    title: 'رایگان (۳۰روزه)',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.YEARLY,
    price: 0, // Toman
    spaceInMb: 500,
    monthlyVisits: 5000,
    trafficInMb: 25000,
    backupFrequency: 'روزانه و هفتگی',
  },
  [plans.PLAN_1]: {
    title: 'بستنی چوبی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.YEARLY,
    price: 69000, // Toman
    spaceInMb: 500,
    monthlyVisits: 5000,
    trafficInMb: 25000,
    backupFrequency: 'روزانه و هفتگی',
  },
  [plans.PLAN_2]: {
    title: 'بستنی قیفی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.YEARLY,
    price: 79000, // Toman
    spaceInMb: 1000,
    monthlyVisits: 10000,
    trafficInMb: 45000,
    backupFrequency: 'روزانه و هفتگی',
    mostPopular: true
  },
  [plans.PLAN_3]: {
    title: 'بستنی لیوانی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.YEARLY,
    price: 99000, // Toman
    spaceInMb: 3000,
    monthlyVisits: 20000,
    trafficInMb: 75000,
    backupFrequency: 'روزانه و هفتگی',
  },
  [plans.PLAN_4]: {
    title: 'فالوده شیرازی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.YEARLY,
    price: 119000, // Toman
    spaceInMb: 5000,
    monthlyVisits: 25000,
    trafficInMb: 85000,
    backupFrequency: 'روزانه و هفتگی',
  },
  // PRO
  [plans.PLAN_PRO_1]: {
    title: 'آب‌هویج بستنی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.MONTHLY,
    price: 59000, // Toman
    spaceInMb: 5000,
    ramInGb: 6,
    cpuCores: 3,
    trafficInMb: 25000,
    // backupFrequency: '۶ ساعته',
    isPro: true,
  },
  [plans.PLAN_PRO_2]: {
    title: 'شیرموز بستنی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.MONTHLY,
    price: 90000, // Toman
    spaceInMb: 10000,
    ramInGb: 8,
    cpuCores: 4,
    trafficInMb: 200000,
    // backupFrequency: '۶ ساعته',
    isPro: true,
  },
  [plans.PLAN_PRO_3]: {
    title: 'کیک بستنی',
    image: getImage('rocket'),
    pricePeriod: pricePeriods.MONTHLY,
    price: 120000, // Toman
    spaceInMb: 50000,
    ramInGb: 12,
    cpuCores: 6,
    trafficInMb: 500000,
    // backupFrequency: '۶ ساعته',
    isPro: true,
  },
};
