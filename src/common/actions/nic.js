import * as types from '../constants/ActionTypes';

export const setNicFirstName = (value) => ({
  type: types.NIC_FISRTNAME_CHANGED,
  value
});

export const setNicLastName = (value) => ({
  type: types.NIC_LASTNAME_CHANGED,
  value
});

export const setNicEmail = (value) => ({
  type: types.NIC_EMAIL_CHANGED,
  value
});

export const setNicPhone = (value) => ({
  type: types.NIC_PHONE_CHANGED,
  value
});

export const setNicIdCardNo = (value) => ({
  type: types.NIC_IDCARDNO_CHANGED,
  value
});

export const setNicPostalCode = (value) => ({
  type: types.NIC_POSTALCODE_CHANGED,
  value
});

export const setNicCity = (value) => ({
  type: types.NIC_CITY_CHANGED,
  value
});

export const setNicProvince = (value) => ({
  type: types.NIC_PROVINCE_CHANGED,
  value
});

export const setNicAddress = (value) => ({
  type: types.NIC_ADDRESS_CHANGED,
  value
});

// Currnet Nic
export const requestNicUsername = () => ({
  type: types.NIC_USERNAME_REQUSTED,
});
export const nicUsernameFetched = (username, list) => ({
  type: types.NIC_USERNAME_FETCHED,
  username,
  list
});
export const nicUsernameFailed = (status = 0, error) => ({
  type: types.NIC_USERNAME_FAILED,
  error,
  status
});

// Searched Domains
export const requestRecentNicUsernames = () => ({
  type: types.RECENT_NIC_USERNAMES_REQUSTED,
});
export const recentNicUsernamesFetched = (list) => ({
  type: types.RECENT_NIC_USERNAMES_FETCHED,
  list
});
export const recentNicUsernamesFailed = (status = 0, error) => ({
  type: types.RECENT_NIC_USERNAMES_FAILED,
  error,
  status
});
