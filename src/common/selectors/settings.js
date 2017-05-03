import { createSelector } from 'reselect';
import map from 'lodash/map';

// ---
export const isSettingsFetching = state => state.settings.isFetching;
export const getSettingsStatus = state => state.settings.fetchStatus;
export const getSettingsError = state => state.settings.fetchError;

// ---
export const getSeNoticesIds = state => state.settings.notices.allIds;
export const getSeNoticesById = state => state.settings.notices.byId;
export const getSeNotices = createSelector(
  [getSeNoticesIds, getSeNoticesById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// ---
export const getSeAutomationIds = state => state.settings.automation.allIds;
export const getSeAutomationById = state => state.settings.automation.byId;
export const getSeAutomation = createSelector(
  [getSeAutomationIds, getSeAutomationById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// ---
export const getSeMobile = state => state.settings.mobile;

// ---
export const isUpdateSettingsSending = state => state.settings.isSending;
export const getUpdateSettingsStatus = state => state.settings.sendStatus;
export const getUpdateSettingsError = state => state.settings.sendError;
