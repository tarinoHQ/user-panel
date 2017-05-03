import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';

const initialState = {
  password: {
    current: '',
    new: '',
    isFetching: false,
    error: null,
    status: 0,
  },
  checkEmail: {
    isFetching: false,
    error: null,
    status: 0,
  },
  info: {
    mobile: '',
    email: '',
    firstName: '',
    lastName: '',
    tel: '',
    address: '',
    city: '',
    state: '',
    isFetching: false,
    error: null,
    status: 0,
  },
};

const password = (state = initialState.password, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_NEW_CHANGED:
      return { ...state, new: action.value };

    case types.CHANGE_PASSWORD_CURRENT_CHANGED:
      return { ...state, current: action.value };

    case types.CHANGE_PASSWORD_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.CHANGE_PASSWORD_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.CHANGE_PASSWORD_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const checkEmail = (state = initialState.checkEmail, action) => {
  switch (action.type) {
    case types.CHECK_EMAIL_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.CHECK_EMAIL_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.CHECK_EMAIL_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const info = (state = initialState.info, action) => {
  switch (action.type) {
    case types.PROFILE_MOBILE_CHANGED:
      return { ...state, mobile: action.value };

    case types.PROFILE_EMAIL_CHANGED:
      return { ...state, email: action.value };

    case types.PROFILE_TEL_CHANGED:
      return { ...state, tel: action.value };

    case types.PROFILE_FIRSTNAME_CHANGED:
      return { ...state, firstName: action.value };

    case types.PROFILE_LASTNAME_CHANGED:
      return { ...state, lastName: action.value };

    case types.PROFILE_ADDRESS_CHANGED:
      return { ...state, address: action.value };

    case types.PROFILE_CITY_CHANGED:
      return { ...state, city: action.value };

    case types.PROFILE_STATE_CHANGED:
      return { ...state, state: action.value };

    case types.UPDATE_PROFILE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.UPDATE_PROFILE_SUCCEED:
      return { ...state, isFetching: false, status: 1 };
    case types.UPDATE_PROFILE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    default:
      return state;
  }
};

const profile = combineReducers({
  password,
  checkEmail,
  info,
});

export default profile;
