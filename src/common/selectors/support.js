import { createSelector } from 'reselect';
import map from 'lodash/map';

export const getNewTicketTitle = state => state.support.newTicket.title;
export const getNewTicketOrder = state => state.support.newTicket.order;
export const getNewTicketTarget = state => state.support.newTicket.target;
export const getNewTicketText = state => state.support.newTicket.text;
export const getNewTicketAttachment = state => state.support.newTicket.attachment;
export const isNewTicketSending = state => state.support.newTicket.isSending;
export const getNewTicketStatus = state => state.support.newTicket.status;
export const getNewTicketError = state => state.support.newTicket.error;

export const isTicketsFetching = state => state.support.tickets.isFetching;
export const getTicketsStatus = state => state.support.tickets.status;
export const getTicketsError = state => state.support.tickets.error;
export const getTicketsIds = state => state.support.tickets.allIds;
export const getTicketsById = state => state.support.tickets.byId;
export const getTickets = createSelector(
  [getTicketsIds, getTicketsById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const isTicketMessagesFetching = state => state.support.messages.isFetching;
export const getTicketMessagesStatus = state => state.support.messages.status;
export const getTicketMessagesError = state => state.support.messages.error;
export const getTicketMessagesIds = state => state.support.messages.allIds;
export const getTicketMessagesById = state => state.support.messages.byId;
export const getTicketMessages = createSelector(
  [getTicketMessagesIds, getTicketMessagesById],
  (allIds, byId) => (
    map(allIds, id => byId[id])
  )
);

export const getTicketReplyId = state => state.support.ticketReply.ticketId;
export const getTicketReplyText = state => state.support.ticketReply.text;
export const getTicketReplyAttachment = state => state.support.ticketReply.attachment;
export const isTicketReplySending = state => state.support.ticketReply.isSending;
export const getTicketReplyStatus = state => state.support.ticketReply.status;
export const getTicketReplyError = state => state.support.ticketReply.error;
