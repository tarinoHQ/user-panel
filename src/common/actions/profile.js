import { removeCommas } from '../utils/numberUtils';
import * as types from '../constants/ActionTypes';

// Password
export const setChangePasswordNew = (value) => ({
  type: types.CHANGE_PASSWORD_NEW_CHANGED,
  value
});

export const setChangePasswordCurrent = (value) => ({
  type: types.CHANGE_PASSWORD_CURRENT_CHANGED,
  value
});

export const requestChangePassword = () => ({
  type: types.CHANGE_PASSWORD_REQUESTED,
});
export const changePasswordSucceed = () => ({
  type: types.CHANGE_PASSWORD_SUCCEED,
});
export const changePasswordFailed = (status = 0, error) => ({
  type: types.CHANGE_PASSWORD_FAILED,
  status,
  error,
});

// Check Email
export const requestCheckEmail = () => ({
  type: types.CHECK_EMAIL_REQUESTED,
});
export const checkEmailSucceed = () => ({
  type: types.CHECK_EMAIL_SUCCEED,
});
export const checkEmailFailed = (status = 0, error) => ({
  type: types.CHECK_EMAIL_FAILED,
  status,
  error,
});

// Info
export const requestUpdateProfile = () => ({
  type: types.UPDATE_PROFILE_REQUESTED,
});
export const updateProfileSucceed = () => ({
  type: types.UPDATE_PROFILE_SUCCEED,
});
export const updateProfileFailed = (status = 0, error) => ({
  type: types.UPDATE_PROFILE_FAILED,
  status,
  error,
});

export const setProfileMobile = (value) => ({
  type: types.PROFILE_MOBILE_CHANGED,
  value
});

export const setProfileEmail = (value) => ({
  type: types.PROFILE_EMAIL_CHANGED,
  value
});

export const setProfileTel = (value) => ({
  type: types.PROFILE_TEL_CHANGED,
  value
});

export const setProfileFirstName = (value) => ({
  type: types.PROFILE_FIRSTNAME_CHANGED,
  value
});

export const setProfileLastName = (value) => ({
  type: types.PROFILE_LASTNAME_CHANGED,
  value
});

export const setProfileAddress = (value) => ({
  type: types.PROFILE_ADDRESS_CHANGED,
  value
});

export const setProfileCity = (value) => ({
  type: types.PROFILE_CITY_CHANGED,
  value
});

export const setProfileState = (value) => ({
  type: types.PROFILE_STATE_CHANGED,
  value
});
