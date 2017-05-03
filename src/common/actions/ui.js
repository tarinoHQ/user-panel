import * as types from '../constants/ActionTypes';

export const setDashboardSearchValue = (value) => ({
  type: types.DASHBOARD_SEARCH_CHANGED,
  value
});

export const setSupportSearchValue = (value) => ({
  type: types.SUPPORT_SEARCH_CHANGED,
  value
});

export const setActiveModal = (id) => ({
  type: types.ACTIVE_MODAL_CHANGED,
  id
});

export const removeActiveModal = () => ({
  type: types.ACTIVE_MODAL_REMOVED,
});
