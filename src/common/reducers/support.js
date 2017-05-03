import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import { ticketArraySchema, ticketMessageArraySchema } from '../constants/Schemas';

const initialState = {
  newTicket: {
    title: '',
    order: {
      id: null,
      type: null
    },
    target: '',
    text: '',
    attachment: null,
    isSending: false,
    status: null,
    error: null,
    ticketId: null,
  },
  tickets: {
    allIds: [],
    byId: {},
    isFetching: false,
    status: null,
    error: null,
  },
  messages: {
    allIds: [],
    byId: {},
    isFetching: false,
    status: null,
    error: null,
  },
  ticketReply: {
    text: '',
    attachment: null,
    isSending: false,
    status: null,
    error: null,
  },
};

const newTicket = (state = initialState.newTicket, action) => {
  switch (action.type) {
    case types.NEW_TICKET_TITLE_CHANGED:
      return { ...state, title: action.value };

    case types.NEW_TICKET_ORDER_CHANGED:
      return { ...state, order: { id: action.orderId, type: action.orderType } };

    case types.NEW_TICKET_TARGET_CHANGED:
      return { ...state, target: action.value };

    case types.NEW_TICKET_TEXT_CHANGED:
      return { ...state, text: action.value };

    case types.NEW_TICKET_ATTACHMENT_CHANGED:
      return { ...state, attachment: action.file };

    case types.NEW_TICKET_REQUESTED:
      return { ...state, isSending: true, status: null, error: null, ticketId: null };
    case types.NEW_TICKET_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.NEW_TICKET_SUCCEED:
      return { ...state, isSending: false, status: 1, ticketId: action.ticketId, title: '', text: '' };

    default:
      return state;
  }
};

const tickets = (state = initialState.tickets, action) => {
  switch (action.type) {
    case types.TICKETS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.TICKETS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.TICKETS_SUCCEED:
      const data = normalize(action.tickets, ticketArraySchema);
      return { ...state, isFetching: false, allIds: data.result, byId: data.entities.tickets };

    default:
      return state;
  }
};

const messages = (state = initialState.messages, action) => {
  switch (action.type) {
    case types.TICKET_MESSAGES_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null, hasSent: null };
    case types.TICKET_MESSAGES_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.TICKET_MESSAGES_SUCCEED:
    case types.TICKET_REPLY_SUCCEED:
      const data = normalize(action.messages, ticketMessageArraySchema);
      return { ...state, isFetching: false, allIds: data.result, byId: data.entities.ticketMessages };

    default:
      return state;
  }
};

const ticketReply = (state = initialState.ticketReply, action) => {
  switch (action.type) {
    case types.TICKET_REPLY_ID_CHANGED:
      return { ...state, ticketId: action.ticketId };

    case types.TICKET_REPLY_TEXT_CHANGED:
      return { ...state, text: action.value };

    case types.TICKET_REPLY_ATTACHMENT_CHANGED:
      return { ...state, attachment: action.file };

    case types.TICKET_REPLY_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.TICKET_REPLY_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.TICKET_REPLY_SUCCEED:
      return { ...state, isSending: false, status: 1 };

    default:
      return state;
  }
};

const support = combineReducers({
  newTicket,
  tickets,
  messages,
  ticketReply,
});

export default support;
