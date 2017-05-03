import { createSelector } from 'reselect';

export const getDashboardSearchValue = state => state.ui.dashboard.searchValue;
export const getSupportSearchValue = state => state.ui.support.searchValue;
export const getActiveModal = state => state.ui.activeModal;
