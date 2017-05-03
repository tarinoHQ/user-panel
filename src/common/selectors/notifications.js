import { createSelector } from 'reselect';
import map from 'lodash/map';

export const getNotificationsCount = state => state.notifications.count;
export const isNotificationsFetching = state => state.notifications.isFetching;
export const getNotificationsStatus = state => state.notifications.status;
export const getNotificationsError = state => state.notifications.error;
export const getNotificationsIds = state => state.notifications.allIds;
export const getNotificationsById = state => state.notifications.byId;
export const getNotifications = createSelector(
  [getNotificationsIds, getNotificationsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);
