import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { notificationArraySchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';

const initialState = {
  allIds: [],
  byId: {},
  count: 0,
  isFetching: false,
  status: null,
  error: null,
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.NOTIFICATIONS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.NOTIFICATIONS_SUCCEED:
      const data = normalize(action.list, notificationArraySchema);
      return {
        ...state,
        isFetching: false,
        status: 1,
        allIds: data.result,
        byId: data.entities.notifications
      };

    case types.USER_SUCCEED:
      return { ...state, count: action.notifiCount };

    default:
      return state;
  }
};

export default notifications;
