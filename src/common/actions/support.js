import * as types from '../constants/ActionTypes';

export const setNewTicketTitle = (value) => ({
  type: types.NEW_TICKET_TITLE_CHANGED,
  value
});
export const setNewTicketOrder = (orderId, orderType) => ({
  type: types.NEW_TICKET_TARGET_CHANGED,
  orderId,
  orderType
});
export const setNewTicketTarget = (value) => ({
  type: types.NEW_TICKET_TARGET_CHANGED,
  value
});
export const setNewTicketText = (value) => ({
  type: types.NEW_TICKET_TEXT_CHANGED,
  value
});
export const setNewTicketAttachment = (file) => ({
  type: types.NEW_TICKET_ATTACHMENT_CHANGED,
  file
});

export const requestNewTicket = () => ({
  type: types.NEW_TICKET_REQUESTED,
});
export const newTicketFailed = (status, error = null) => ({
  type: types.NEW_TICKET_FAILED,
  status,
  error
});
export const newTicketSucceed = (ticketId) => ({
  type: types.NEW_TICKET_SUCCEED,
  ticketId
});

export const requestTickets = () => ({
  type: types.TICKETS_REQUESTED,
});
export const ticketsFailed = (status, error = null) => ({
  type: types.TICKETS_FAILED,
  status,
  error
});
export const ticketsSucceed = (tickets) => ({
  type: types.TICKETS_SUCCEED,
  tickets
});

export const requestTicketMessages = (ticketId) => ({
  type: types.TICKET_MESSAGES_REQUESTED,
  ticketId
});
export const ticketMessagesFailed = (status, error = null) => ({
  type: types.TICKET_MESSAGES_FAILED,
  status,
  error
});
export const ticketMessagesSucceed = (messages) => ({
  type: types.TICKET_MESSAGES_SUCCEED,
  messages
});

// ---
export const setTicketReplyId = (ticketId) => ({
  type: types.TICKET_REPLY_ID_CHANGED,
  ticketId
});
export const setTicketReplyText = (value) => ({
  type: types.TICKET_REPLY_TEXT_CHANGED,
  value
});
export const setTicketReplyAttachment = (file) => ({
  type: types.TICKET_REPLY_ATTACHMENT_CHANGED,
  file
});

export const sendTicketReply = (ticketId) => ({
  type: types.TICKET_REPLY_REQUESTED,
  ticketId
});
export const ticketReplyFailed = (status, error = null) => ({
  type: types.TICKET_REPLY_FAILED,
  status,
  error
});
export const ticketReplySucceed = (messages) => ({
  type: types.TICKET_REPLY_SUCCEED,
  messages
});
