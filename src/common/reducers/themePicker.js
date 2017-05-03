import { themeArraySchema, layoutArraySchema, catArraySchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';

const initialState = {
  themes: {
    allIds: [],
    byId: {},
    selected: null,
  },
  layouts: {
    allIds: [],
    byId: {},
    selected: '1',
  },
  cats: {
    allIds: [],
    byId: {},
    active: '0',
  },
  theme: null,
  layout: null,
  isSending: false,
  status: null,
  error: null,
};

const themePicker = (state = initialState, action) => {
  switch (action.type) {

    case types.THEME_PICKER_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };

    case types.THEME_PICKER_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.THEME_PICKER_SUCCEED:
      const themes  = normalize(action.list.themes, themeArraySchema);
      const layouts = normalize(action.list.layouts, layoutArraySchema);
      const cats    = normalize(action.list.cats, catArraySchema);
      return {
        ...state,
        themes: {
          ...state.themes,
          allIds: themes.result,
          byId: themes.entities.themes
        },
        layouts: {
          ...state.layouts,
          allIds: layouts.result,
          byId: layouts.entities.layouts
        },
        cats: {
          ...state.cats,
          allIds: cats.result,
          byId: cats.entities.cats
        },
        isFetching: false,
        status: 1
      };

    case types.THEME_PICKED:
      return { ...state, theme: state.themes.selected, layout: state.layouts.selected };

    case types.THEME_UNPICKED:
      return { ...state, theme: null, layout: null };

    case types.THEME_CHANGED:
      return { ...state, themes: { ...state.themes, selected: action.value } };
 
    case types.THEME_LAYOUT_CHANGED:
      return { ...state, layouts: { ...state.layouts, selected: action.value } };


    case types.THEME_CAT_CHANGED:
      return { ...state, cats: { ...state.cats, active: action.value } };


    default:
      return state;
  }
};

export default themePicker;
