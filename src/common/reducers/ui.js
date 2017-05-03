import { combineReducers } from 'redux';
import modalIds from '../constants/ModalIds';
import * as types from '../constants/ActionTypes';

const initialState = {
  dashboard: {
    searchValue: ''
  },
  support: {
    searchValue: ''
  },
  activeModal: null
};

// Dashboard
const dashboard = (state = initialState.dashboard, action) => {
  switch (action.type) {
    case types.DASHBOARD_SEARCH_CHANGED:
      return {
        ...state,
        searchValue: action.value
      };

    default:
      return state;
  }
};

// Support
const support = (state = initialState.support, action) => {
  switch (action.type) {
    case types.SUPPORT_SEARCH_CHANGED:
      return {
        ...state,
        searchValue: action.value
      };

    default:
      return state;
  }
};

// Active Modal
const activeModal = (state = initialState.activeModal, action) => {
  switch (action.type) {
    case types.ACTIVE_MODAL_CHANGED:
      return action.id;

    case types.ACTIVE_MODAL_REMOVED:
      return null;

    default:
      return state;
  }
};


const ui = combineReducers({
  dashboard,
  support,
  activeModal
});

export default ui;
