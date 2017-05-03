import { noticeArraySchema, automationArraySchema } from '../constants/Schemas';
import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';

const initialState = {
  notices: {
    allIds: [],
    byId: {},
  },
  mobile: null,
  automation: {
    allIds: [],
    byId: {},
  },
  isFetching: false,
  fetchError: null,
  fetchStatus: 0,
  isSending: false,
  sendError: null,
  sendStatus: 0,
};

// SETTINGS_REQUESTED
// SETTINGS_SUCCEED
// SETTINGS_FAILED
// SE_NOTICE_EMAIL_TOGGLED
// SE_NOTICE_SMS_TOGGLED
// SE_MOBILE_CHANGED
// SE_AUTOMATION_TOGGLED
// UPDATE_SETTINGS_REQUESTED
// UPDATE_SETTINGS_SUCCEED
// UPDATE_SETTINGS_FAILED

const settings = (state = initialState, action) => {
  switch (action.type) {
    case types.SETTINGS_REQUESTED:
      return { ...state, isFetching: true, fetchStatus: null, fetchError: null };
    case types.SETTINGS_FAILED:
      return { ...state,
        isFetching: false, fetchStatus: action.status, fetchError: action.error };
    case types.SETTINGS_SUCCEED:
      const noticesNormlized = normalize(action.notices, noticeArraySchema);
      const automationsNormlized = normalize(action.automation, automationArraySchema);
      return {
        ...state,
        isFetching: false,
        fetchStatus: 1,
        notices: {
          allIds: noticesNormlized.result,
          byId: noticesNormlized.entities.notices,
        },
        automation: {
          allIds: automationsNormlized.result,
          byId: automationsNormlized.entities.automations,
        },
      };

    case types.SE_NOTICE_EMAIL_TOGGLED:
      return { ...state,
        notices: {
          ...state.notices,
          byId: {
            ...state.notices.byId,
            [action.id]: {
              ...state.notices.byId[action.id],
              email: !state.notices.byId[action.id].email
            }
          }
        }
      };

    case types.SE_NOTICE_SMS_TOGGLED:
      return { ...state,
        notices: {
          ...state.notices,
          byId: {
            ...state.notices.byId,
            [action.id]: {
              ...state.notices.byId[action.id],
              sms: !state.notices.byId[action.id].sms
            }
          }
        }
      };

    case types.SE_AUTOMATION_TOGGLED:
      return { ...state,
        automation: {
          ...state.automation,
          byId: {
            ...state.automation.byId,
            [action.id]: {
              ...state.automation.byId[action.id],
              checked: !state.automation.byId[action.id].checked
            }
          }
        }
      };

    case types.SE_MOBILE_CHANGED:
      return { ...state, mobile: action.value };

    case types.UPDATE_SETTINGS_REQUESTED:
      return { ...state, isSending: true, sendStatus: null, sendError: null };
    case types.UPDATE_SETTINGS_FAILED:
      return { ...state, isSending: false, sendStatus: action.status, sendError: action.error };
    case types.UPDATE_SETTINGS_SUCCEED:
      return { ...state, isSending: false, sendStatus: 1 };

    default:
      return state;
  }
};

export default settings;
