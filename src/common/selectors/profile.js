import { createSelector } from 'reselect';
import map from 'lodash/map';

// Change Password
export const getChangePasswordNew = state => state.profile.password.new;
export const getChangePasswordCurrent = state => state.profile.password.current;
export const isChangePasswordFetching = state => state.profile.password.isFetching;
export const getChangePasswordStatus = state => state.profile.password.status;
export const getChangePasswordError = state => state.profile.password.error;

// Check Email
export const isCheckEmailFetching = state => state.profile.checkEmail.isFetching;
export const getCheckEmailStatus = state => state.profile.checkEmail.status;
export const getCheckEmailError = state => state.profile.checkEmail.error;

// Update Profile
export const getProfileMobile = state => state.profile.info.mobile;
export const getProfileEmail = state => state.profile.info.email;
export const getProfileTel = state => state.profile.info.tel;
export const getProfileFirstName = state => state.profile.info.firstName;
export const getProfileLastName = state => state.profile.info.lastName;
export const getProfileAddress = state => state.profile.info.address;
export const getProfileCity = state => state.profile.info.city;
export const getProfileState = state => state.profile.info.state;
// ---
export const isUpdateProfileFetching = state => state.profile.info.isFetching;
export const getUpdateProfileStatus = state => state.profile.info.status;
export const getUpdateProfileError = state => state.profile.info.error;
