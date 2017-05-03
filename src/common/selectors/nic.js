import { createSelector } from 'reselect';
import map from 'lodash/map';

export const getNicFirstName = state => state.nic.new.firstName;
export const getNicLastName = state => state.nic.new.lastName;
export const getNicEmail = state => state.nic.new.email;
export const getNicPhone = state => state.nic.new.phone;
export const getNicIdCardNo = state => state.nic.new.idCardNo;
export const getNicPostalCode = state => state.nic.new.postalCode;
export const getNicCity = state => state.nic.new.city;
export const getNicProvince = state => state.nic.new.province;
export const getNicAddress = state => state.nic.new.address;

export const isNicUsernameFetching = state => state.nic.new.isFetching;
export const getNicUsernameStatus = state => state.nic.new.status;
export const getNicUsernameError = state => state.nic.new.error;
export const getNicUsername = state => state.nic.new.username;

export const isRecentNicUsernamesFetching = state => state.nic.recentUsernames.isFetching;
export const getRecentNicUsernamesError = state => state.nic.recentUsernames.error;
export const getRecentNicUsernamesIds = state => state.nic.recentUsernames.allIds;
export const getRecentNicUsernamesById = state => state.nic.recentUsernames.byId;
export const getRecentNicUsernames = createSelector(
  [getRecentNicUsernamesIds, getRecentNicUsernamesById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);
