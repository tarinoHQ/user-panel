import { Schema, arrayOf } from 'normalizr';

export const domainSchema = new Schema('domains', { idAttribute: 'domainName' });
export const domainArraySchema = arrayOf(domainSchema);

export const nicSchema = new Schema('nics', { idAttribute: 'username' });
export const nicArraySchema = arrayOf(nicSchema);

export const serviceSchema = new Schema('services', { idAttribute: 'order_id' });
export const serviceArraySchema = arrayOf(serviceSchema);

export const domainItemSchema = new Schema('domainsList', { idAttribute: 'domain_id' });
export const domainItemArraySchema = arrayOf(domainItemSchema);

export const ticketSchema = new Schema('tickets', { idAttribute: 'ticket_id' });
export const ticketArraySchema = arrayOf(ticketSchema);

export const ticketMessageSchema = new Schema('ticketMessages', { idAttribute: 'msg' }); // debug
export const ticketMessageArraySchema = arrayOf(ticketMessageSchema);

export const gatewaySchema = new Schema('gateways', { idAttribute: 'id' });
export const gatewayArraySchema = arrayOf(gatewaySchema);

export const invoiceSchema = new Schema('invoices', { idAttribute: 'invoiceId' });
export const invoiceArraySchema = arrayOf(invoiceSchema);

export const noticeSchema = new Schema('notices', { idAttribute: 'id' });
export const noticeArraySchema = arrayOf(noticeSchema);

export const automationSchema = new Schema('automations', { idAttribute: 'id' });
export const automationArraySchema = arrayOf(automationSchema);

export const notificationSchema = new Schema('notifications', { idAttribute: 'id' });
export const notificationArraySchema = arrayOf(notificationSchema);

export const backupSchema = new Schema('backups', { idAttribute: 'backupId' });
export const backupArraySchema = arrayOf(backupSchema);

export const themeSchema = new Schema('themes', { idAttribute: 'id' });
export const themeArraySchema = arrayOf(themeSchema);

export const layoutSchema = new Schema('layouts', { idAttribute: 'id' });
export const layoutArraySchema = arrayOf(layoutSchema);

export const catSchema = new Schema('cats', { idAttribute: 'id' });
export const catArraySchema = arrayOf(catSchema);

export const emailSchema = new Schema('emails', { idAttribute: 'email' });
export const emailArraySchema = arrayOf(emailSchema);

export const serviceDomainSchema = new Schema('domains', { idAttribute: 'url' });
export const serviceDomainArraySchema = arrayOf(serviceDomainSchema);