import * as types from '../constants/ActionTypes';

export const requestThemePicker = () => ({
  type: types.THEME_PICKER_REQUESTED,
});
export const themePickerFailed = (status, error = null) => ({
  type: types.THEME_PICKER_FAILED,
  status,
  error
});
export const themePickerSucceed = (list) => ({
  type: types.THEME_PICKER_SUCCEED,
  list
});

export const pickTheme = () => ({
  type: types.THEME_PICKED,
});

export const unpickTheme = () => ({
  type: types.THEME_UNPICKED,
});

export const setTheme = (value) => ({
  type: types.THEME_CHANGED,
  value
});

export const setThemeLayout = (value) => ({
  type: types.THEME_LAYOUT_CHANGED,
  value
});

export const setThemeCat = (value) => ({
  type: types.THEME_CAT_CHANGED,
  value
});