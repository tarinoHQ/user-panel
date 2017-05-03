import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { nicArraySchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import without from 'lodash/without';
import omit from 'lodash/omit';

const initialState = {
  new: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idCardNo: '',
    postalCode: '',
    city: '',
    province: '',
    address: '',
    username: null,
    status: null,
    error: null,
    isFetching: false,
  },
  recentUsernames: {
    allIds: [],
    byId: {},
    status: null,
    error: null,
    isFetching: false
  },
};

const newNic = (state = initialState.new, action) => {
  switch (action.type) {
    case types.NIC_FISRTNAME_CHANGED:
      return { ...state, firstName: action.value };

    case types.NIC_LASTNAME_CHANGED:
      return { ...state, lastName: action.value };

    case types.NIC_EMAIL_CHANGED:
      return { ...state, email: action.value };

    case types.NIC_PHONE_CHANGED:
      return { ...state, phone: action.value };

    case types.NIC_IDCARDNO_CHANGED:
      return { ...state, idCardNo: action.value };

    case types.NIC_POSTALCODE_CHANGED:
      return { ...state, postalCode: action.value };

    case types.NIC_CITY_CHANGED:
      return { ...state, city: action.value };

    case types.NIC_PROVINCE_CHANGED:
      return { ...state, province: action.value };

    case types.NIC_ADDRESS_CHANGED:
      return { ...state, address: action.value };

    case types.NIC_USERNAME_REQUSTED:
      return { ...state, isFetching: true, error: null, status: null, username: null };
    case types.NIC_USERNAME_FETCHED:
      return {
          ...state,
          isFetching: false,
          username: action.username
        };
    case types.NIC_USERNAME_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    default:
      return state;
  }
};

const recentUsernames = (state = initialState.recentUsernames, action) => {
  switch (action.type) {
    case types.RECENT_NIC_USERNAMES_REQUSTED:
      return { ...state, isFetching: true, error: null, status: null };

    case types.RECENT_NIC_USERNAMES_FETCHED:
    case types.NIC_USERNAME_FETCHED:
      const data = normalize(action.list, nicArraySchema);
      return {
          ...state,
          isFetching: false,
          allIds: data.result,
          byId: data.entities.nics
        };

    case types.RECENT_NIC_USERNAMES_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    default:
      return state;
  }
};

const nic = combineReducers({
  new: newNic,
  recentUsernames
});

export default nic;
