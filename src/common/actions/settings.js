import { removeCommas } from '../utils/numberUtils';
import * as types from '../constants/ActionTypes';

export const requestSettings = () => ({
  type: types.SETTINGS_REQUESTED,
});
export const settingsSucceed = (notices, mobile, automation) => ({
  type: types.SETTINGS_SUCCEED,
  notices,
  mobile,
  automation,
});
export const settingsFailed = (status = 0, error) => ({
  type: types.SETTINGS_FAILED,
  status,
  error,
});

// ---
export const toggleSeNoticeEmail = (id) => ({
  type: types.SE_NOTICE_EMAIL_TOGGLED,
  id,
});

export const toggleSeNoticeSms = (id) => ({
  type: types.SE_NOTICE_SMS_TOGGLED,
  id,
});

export const setSeMobile = (value) => ({
  type: types.SE_MOBILE_CHANGED,
  value
});

export const toggleSeAutomation = (id) => ({
  type: types.SE_AUTOMATION_TOGGLED,
  id,
});

// ---
export const requestUpdateSettings = () => ({
  type: types.UPDATE_SETTINGS_REQUESTED,
});
export const updateSettingsSucceed = () => ({
  type: types.UPDATE_SETTINGS_SUCCEED,
});
export const updateSettingsFailed = (status = 0, error) => ({
  type: types.UPDATE_SETTINGS_FAILED,
  status,
  error,
});
