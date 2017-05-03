import { createSelector } from 'reselect';
import map from 'lodash/map';

// ajax
export const isFetching = state => state.themePicker.isFetching;
export const getStatus = state => state.themePicker.status;
export const getError = state => state.themePicker.error;


// lists
export const getThemesIds = state => state.themePicker.themes.allIds;
export const getThemesById = state => state.themePicker.themes.byId;
export const getThemes = createSelector(
  [getThemesIds, getThemesById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const getLayoutsIds = state => state.themePicker.layouts.allIds;
export const getLayoutsById = state => state.themePicker.layouts.byId;
export const getLayouts = createSelector(
  [getLayoutsIds, getLayoutsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const getCatsIds = state => state.themePicker.cats.allIds;
export const getCatsById = state => state.themePicker.cats.byId;
export const getCats = createSelector(
  [getCatsIds, getCatsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

// picked
export const getPickedTheme = state => state.themePicker.theme;
export const getPickedLayout = state => state.themePicker.layout;
export const getPickedThemeDetails = createSelector(
  [getThemesById, getPickedTheme], (byId, id) => byId[id] || {}
);
export const getPickedLayoutDetails = createSelector(
  [getLayoutsById, getPickedLayout], (byId, id) => byId[id] || {}
);

// selected
export const getSelectedTheme = state => state.themePicker.themes.selected;
export const getSelectedLayout = state => state.themePicker.layouts.selected;
export const getActiveCat = state => state.themePicker.cats.active;
