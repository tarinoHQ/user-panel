import { take, put, call, fork, select, cancel } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { isTokenExpired, tokenExpiredAction } from '../utils/tokenUtils';
import storage from '../utils/storage';
import * as types from '../constants/ActionTypes';
import * as selectors from '../selectors/support';
import * as actions from '../actions/support';
import * as api from '../services/api';

// New Ticket
export function* createTicket() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.NEW_TICKET_REQUESTED);
      const token = yield call(storage.get, 'token');
      const order = yield select(selectors.getNewTicketOrder);
      const department_id = yield select(selectors.getNewTicketTarget);
      const title = yield select(selectors.getNewTicketTitle);
      const text = yield select(selectors.getNewTicketText);
      const file = yield select(selectors.getNewTicketAttachment);
      const { status, msg, ticket_id } = yield call(api.createTicket, {
        token, order_id: order.id, order_type: order.type, department_id, title, msg: text, file
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.newTicketSucceed(ticket_id));
    } catch (e) {
      console.log('Create ticket error:', e);
      yield put(actions.newTicketFailed(requestStatus, e));
    }
  }
}

// Tickets List
export function* getTickets() {
  let requestStatus = 0;
  while (true) {
    try {
      yield take(types.TICKETS_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getTickets, { token });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.ticketsSucceed(list));
    } catch (e) {
      console.log('Tickets error:', e);
      yield put(actions.ticketsFailed(requestStatus, e));
    }
  }
}

// Ticket Messages List
export function* getTicketMessages() {
  let requestStatus = 0;
  while (true) {
    try {
      const { ticketId } = yield take(types.TICKET_MESSAGES_REQUESTED);
      const token = yield call(storage.get, 'token');
      const { status, msg, list } = yield call(api.getTicketMessages, { token, ticketId });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.ticketMessagesSucceed(list));
    } catch (e) {
      console.log('Ticket messages error:', e);
      yield put(actions.ticketMessagesFailed(requestStatus, e));
    }
  }
}


// New Ticket
export function* ticketReply() {
  let requestStatus = 0;
  while (true) {
    try {
      const { ticketId } = yield take(types.TICKET_REPLY_REQUESTED);
      const token = yield call(storage.get, 'token');
      const text = yield select(selectors.getTicketReplyText);
      const file = yield select(selectors.getTicketReplyAttachment);
      const { status, msg, list } = yield call(api.ticketReply, {
        token, ticket_id: ticketId, msg: text, file
      });
      requestStatus = status;
      if (isTokenExpired(status)) yield put(tokenExpiredAction());
      if (status > 1) throw new Error(msg);
      yield put(actions.ticketReplySucceed(list));
    } catch (e) {
      console.log('Ticket reply error:', e);
      yield put(actions.ticketReplyFailed(requestStatus, e));
    }
  }
}
