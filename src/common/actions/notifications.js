import * as types from '../constants/ActionTypes';

export const requestNotifications = () => ({
  type: types.NOTIFICATIONS_REQUESTED,
});
export const notificationsFailed = (status, error = null) => ({
  type: types.NOTIFICATIONS_FAILED,
  status,
  error
});
export const notificationsSucceed = (list) => ({
  type: types.NOTIFICATIONS_SUCCEED,
  list
});
