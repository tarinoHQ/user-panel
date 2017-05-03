// UI
export const DASHBOARD_SEARCH_CHANGED        = 'DASHBOARD_SEARCH_CHANGED';
export const SUPPORT_SEARCH_CHANGED          = 'SUPPORT_SEARCH_CHANGED';
export const ACTIVE_MODAL_CHANGED            = 'ACTIVE_MODAL_CHANGED';
export const ACTIVE_MODAL_REMOVED            = 'ACTIVE_MODAL_REMOVED';

// Support
export const NEW_TICKET_TITLE_CHANGED        = 'NEW_TICKET_TITLE_CHANGED';
export const NEW_TICKET_ORDER_CHANGED        = 'NEW_TICKET_ORDER_CHANGED'; // new
export const NEW_TICKET_TARGET_CHANGED       = 'NEW_TICKET_TARGET_CHANGED';
export const NEW_TICKET_TEXT_CHANGED         = 'NEW_TICKET_TEXT_CHANGED';
export const NEW_TICKET_ATTACHMENT_CHANGED   = 'NEW_TICKET_ATTACHMENT_CHANGED';
export const NEW_TICKET_REQUESTED            = 'NEW_TICKET_REQUESTED';
export const NEW_TICKET_SUCCEED              = 'NEW_TICKET_SUCCEED';
export const NEW_TICKET_FAILED               = 'NEW_TICKET_FAILED';
// ---
export const TICKETS_REQUESTED               = 'TICKETS_REQUESTED';
export const TICKETS_SUCCEED                 = 'TICKETS_SUCCEED';
export const TICKETS_FAILED                  = 'TICKETS_FAILED';
// ---
export const TICKET_MESSAGES_REQUESTED       = 'TICKET_MESSAGES_REQUESTED';
export const TICKET_MESSAGES_SUCCEED         = 'TICKET_MESSAGES_SUCCEED';
export const TICKET_MESSAGES_FAILED          = 'TICKET_MESSAGES_FAILED';
// ---
export const TICKET_REPLY_ID_CHANGED         = 'TICKET_REPLY_ID_CHANGED';
export const TICKET_REPLY_TEXT_CHANGED       = 'TICKET_REPLY_TEXT_CHANGED';
export const TICKET_REPLY_ATTACHMENT_CHANGED = 'TICKET_REPLY_ATTACHMENT_CHANGED';
export const TICKET_REPLY_REQUESTED          = 'TICKET_REPLY_REQUESTED';
export const TICKET_REPLY_SUCCEED            = 'TICKET_REPLY_SUCCEED';
export const TICKET_REPLY_FAILED             = 'TICKET_REPLY_FAILED';

// Domain
export const DOMAIN_NAME_ADDED               = 'DOMAIN_NAME_ADDED';
export const DOMAIN_NAME_REMOVED             = 'DOMAIN_NAME_REMOVED';
export const DOMAIN_NAMES_CHANGED            = 'DOMAIN_NAMES_CHANGED';
export const DOMAIN_ADDRESS_CHANGED          = 'DOMAIN_ADDRESS_CHANGED';
export const SEARCHED_DOMAINS_REQUSTED       = 'SEARCHED_DOMAINS_REQUSTED';
export const SEARCHED_DOMAINS_FETCHED        = 'SEARCHED_DOMAINS_FETCHED';
export const SEARCHED_DOMAINS_FAILED         = 'SEARCHED_DOMAINS_FAILED';
export const DOMAIN_SELECTED_TOGGLED         = 'DOMAIN_SELECTED_TOGGLED';
export const DOMAIN_YEARPLAN_CHANGED         = 'DOMAIN_YEARPLAN_CHANGED';
export const DOMAIN_NIC_CHANGED              = 'DOMAIN_NIC_CHANGED';
export const DOMAIN_CUSTOM_NIC_TOGGLED       = 'DOMAIN_CUSTOM_NIC_TOGGLED';
export const USE_TARINO_DNS_TOGGLED          = 'USE_TARINO_DNS_TOGGLED';
export const DOMAIN_DNS_CHANGED              = 'DOMAIN_DNS_CHANGED';
export const REGISTER_DOMAIN_REQUESTED       = 'REGISTER_DOMAIN_REQUESTED';
export const REGISTER_DOMAIN_SUCCEED         = 'REGISTER_DOMAIN_SUCCEED';
export const REGISTER_DOMAIN_FAILED          = 'REGISTER_DOMAIN_FAILED';

// Nic
export const NIC_FISRTNAME_CHANGED           = 'NIC_FISRTNAME_CHANGED';
export const NIC_LASTNAME_CHANGED            = 'LASTNAME_CHANGED';
export const NIC_EMAIL_CHANGED               = 'NIC_EMAIL_CHANGED';
export const NIC_PHONE_CHANGED               = 'NIC_PHONE_CHANGED';
export const NIC_IDCARDNO_CHANGED            = 'NIC_IDCARDNO_CHANGED';
export const NIC_POSTALCODE_CHANGED          = 'NIC_POSTALCODE_CHANGED';
export const NIC_CITY_CHANGED                = 'NIC_CITY_CHANGED';
export const NIC_PROVINCE_CHANGED            = 'NIC_PROVINCE_CHANGED';
export const NIC_ADDRESS_CHANGED             = 'NIC_ADDRESS_CHANGED';
export const NIC_USERNAME_REQUSTED           = 'NIC_USERNAME_REQUSTED';
export const NIC_USERNAME_FETCHED            = 'NIC_USERNAME_FETCHED';
export const NIC_USERNAME_FAILED             = 'NIC_USERNAME_FAILED';
export const RECENT_NIC_USERNAMES_REQUSTED   = 'RECENT_NIC_USERNAMES_REQUSTED';
export const RECENT_NIC_USERNAMES_FETCHED    = 'RECENT_NIC_USERNAMES_FETCHED';
export const RECENT_NIC_USERNAMES_FAILED     = 'RECENT_NIC_USERNAMES_FAILED';

// Auth
// -- Login
export const LOGOUT                          = 'LOGOUT';
export const TOKEN_EXPIRED                   = 'TOKEN_EXPIRED';
export const LOGIN_REQUESTED                 = 'LOGIN_REQUESTED';
export const LOGIN_FAILED                    = 'LOGIN_FAILED';
export const LOGIN_SUCCEED                   = 'LOGIN_SUCCEED';
export const LOGIN_EMAIL_CHANGED             = 'LOGIN_EMAIL_CHANGED';
export const LOGIN_PASSWORD_CHANGED          = 'LOGIN_PASSWORD_CHANGED';
// -- Signup
export const SIGNUP_REQUESTED                = 'SIGNUP_REQUESTED';
export const SIGNUP_FAILED                   = 'SIGNUP_FAILED';
export const SIGNUP_SUCCEED                  = 'SIGNUP_SUCCEED';
export const SIGNUP_FNAME_CHANGED            = 'SIGNUP_FNAME_CHANGED';
export const SIGNUP_LNAME_CHANGED            = 'SIGNUP_LNAME_CHANGED';
export const SIGNUP_EMAIL_CHANGED            = 'SIGNUP_EMAIL_CHANGED';
export const SIGNUP_PASSWORD_CHANGED         = 'SIGNUP_PASSWORD_CHANGED';
export const SIGNUP_MOBILE_CHANGED           = 'SIGNUP_MOBILE_CHANGED';
// -- Forgot Password
export const FORGOT_REQUESTED                = 'FORGOT_REQUESTED';
export const FORGOT_FAILED                   = 'FORGOT_FAILED';
export const FORGOT_SUCCEED                  = 'FORGOT_SUCCEED';
export const FORGOT_EMAIL_CHANGED            = 'FORGOT_EMAIL_CHANGED';
// -- Forgot Code
export const FORGOT_CODE_REQUESTED           = 'FORGOT_CODE_REQUESTED';
export const FORGOT_CODE_FAILED              = 'FORGOT_CODE_FAILED';
export const FORGOT_CODE_SUCCEED             = 'FORGOT_CODE_SUCCEED';
export const FORGOT_CODE_CHANGED             = 'FORGOT_CODE_CHANGED';
export const FORGOT_CODE_PASSWORD_CHANGED    = 'FORGOT_CODE_PASSWORD_CHANGED';
// -- Change Forgotten Password
export const CHANGE_FPW_REQUESTED            = 'FORGOT_CODE_REQUESTED';
export const FORGOT_FPW_FAILED               = 'FORGOT_FPW_FAILED';
export const FORGOT_FPW_SUCCEED              = 'FORGOT_FPW_SUCCEED';
export const FORGOT_FPW_PASSWORD_CHANGED     = 'FORGOT_FPW_PASSWORD_CHANGED';

// Services
export const SERVICES_LIST_REQUESTED         = 'SERVICES_LIST_REQUESTED';
export const SERVICES_LIST_FAILED            = 'SERVICES_LIST_FAILED';
export const SERVICES_LIST_SUCCEED           = 'SERVICES_LIST_SUCCEED';
export const SERVICES_TASKS_FAILED           = 'SERVICES_TASKS_FAILED';
export const SERVICES_TASKS_SUCCEED          = 'SERVICES_TASKS_SUCCEED';
// -- New
export const SERVICE_DOMAIN_TYPE_CHANGED     = 'SERVICE_DOMAIN_TYPE_CHANGED';
export const SERVICE_DOMAIN_ADDRESS_CHANGED  = 'SERVICE_DOMAIN_ADDRESS_CHANGED';
export const SERVICE_LOCATION_CHANGED        = 'SERVICE_LOCATION_CHANGED';
export const SERVICE_PLAN_CHANGED            = 'SERVICE_PLAN_CHANGED';
export const SERVICE_CMS_CHANGED             = 'SERVICE_CMS_CHANGED';
export const SERVICE_THEME_CHANGED           = 'SERVICE_THEME_CHANGED';
export const SERVICE_THEME_LAYOUT_CHANGED    = 'SERVICE_THEME_LAYOUT_CHANGED';
export const SERVICE_DEDIP_TOGGLED           = 'SERVICE_DEDIP_TOGGLED';
export const SERVICE_DEDDNS_TOGGLED          = 'SERVICE_DEDDNS_TOGGLED';
export const SERVICE_CREATE_REQUESTED        = 'SERVICE_CREATE_REQUESTED';
export const SERVICE_CREATE_FAILED           = 'SERVICE_CREATE_FAILED';
export const SERVICE_CREATE_SUCCEED          = 'SERVICE_CREATE_SUCCEED';
// --- Manage Service
// --- --- Summary
export const MS_SUMMARY_REQUESTED            = 'MS_SUMMARY_REQUESTED';
export const MS_SUMMARY_FAILED               = 'MS_SUMMARY_FAILED';
export const MS_SUMMARY_SUCCEED              = 'MS_SUMMARY_SUCCEED';
// --- --- Analyse
export const MS_ANALYSE_REQUESTED            = 'MS_ANALYSE_REQUESTED';
export const MS_ANALYSE_FAILED               = 'MS_ANALYSE_FAILED';
export const MS_ANALYSE_SUCCEED              = 'MS_ANALYSE_SUCCEED';
// --- --- Backups
export const MS_DO_BACKUP_REQUESTED          = 'MS_DO_BACKUP_REQUESTED';
export const MS_DO_BACKUP_FAILED             = 'MS_DO_BACKUP_FAILED';
export const MS_DO_BACKUP_SUCCEED            = 'MS_DO_BACKUP_SUCCEED';
// --
export const MS_BACKUP_STAR_REQUESTED        = 'MS_BACKUP_STAR_REQUESTED';
export const MS_BACKUP_STAR_FAILED           = 'MS_BACKUP_STAR_FAILED';
export const MS_BACKUP_STAR_SUCCEED          = 'MS_BACKUP_STAR_SUCCEED';
// --
export const MS_BACKUP_RESTORE_MODAL_OPENED  = 'MS_BACKUP_RESTORE_MODAL_OPENED';
export const MS_BACKUP_RESTORE_MODAL_CLOSED  = 'MS_BACKUP_RESTORE_MODAL_CLOSED';
export const MS_BACKUP_RESTORE_REQUESTED     = 'MS_BACKUP_RESTORE_REQUESTED';
export const MS_BACKUP_RESTORE_FAILED        = 'MS_BACKUP_RESTORE_FAILED';
export const MS_BACKUP_RESTORE_SUCCEED       = 'MS_BACKUP_RESTORE_SUCCEED';
// --
export const MS_BACKUP_DELETE_REQUESTED      = 'MS_BACKUP_DELETE_REQUESTED';
export const MS_BACKUP_DELETE_FAILED         = 'MS_BACKUP_DELETE_FAILED';
export const MS_BACKUP_DELETE_SUCCEED        = 'MS_BACKUP_DELETE_SUCCEED';
// --
export const MS_BACKUP_FILE_CHANGED          = 'MS_BACKUP_FILE_CHANGED';
export const MS_BACKUP_UPLOAD_REQUESTED      = 'MS_BACKUP_UPLOAD_REQUESTED';
export const MS_BACKUP_UPLOAD_FAILED         = 'MS_BACKUP_UPLOAD_FAILED';
export const MS_BACKUP_UPLOAD_SUCCEED        = 'MS_BACKUP_UPLOAD_SUCCEED';
// --
export const MS_BACKUP_DROPBOX_REQUESTED     = 'MS_BACKUP_DROPBOX_REQUESTED';
export const MS_BACKUP_DROPBOX_FAILED        = 'MS_BACKUP_DROPBOX_FAILED';
export const MS_BACKUP_DROPBOX_SUCCEED       = 'MS_BACKUP_DROPBOX_SUCCEED';
// --
export const MS_BACKUP_DRIVE_REQUESTED       = 'MS_BACKUP_DRIVE_REQUESTED';
export const MS_BACKUP_DRIVE_FAILED          = 'MS_BACKUP_DRIVE_FAILED';
export const MS_BACKUP_DRIVE_SUCCEED         = 'MS_BACKUP_DRIVE_SUCCEED';
// --
export const MS_BACKUP_FTP_REQUESTED         = 'MS_BACKUP_FTP_REQUESTED';
export const MS_BACKUP_FTP_FAILED            = 'MS_BACKUP_FTP_FAILED';
export const MS_BACKUP_FTP_SUCCEED           = 'MS_BACKUP_FTP_SUCCEED';
// --
export const MS_BACKUP_LIST_REQUESTED        = 'MS_BACKUP_LIST_REQUESTED';
export const MS_BACKUP_LIST_FAILED           = 'MS_BACKUP_LIST_FAILED';
export const MS_BACKUP_LIST_SUCCEED          = 'MS_BACKUP_LIST_SUCCEED';
// --
export const MS_STARRED_BACKUPS_REQUESTED    = 'MS_STARRED_BACKUPS_REQUESTED';
export const MS_STARRED_BACKUPS_FAILED       = 'MS_STARRED_BACKUPS_FAILED';
export const MS_STARRED_BACKUPS_SUCCEED      = 'MS_STARRED_BACKUPS_SUCCEED';
// --- --- Delete
export const MS_DELETE_REASON_CHANGED        = 'MS_DELETE_REASON_CHANGED';
export const MS_DELETE_REQUESTED             = 'MS_DELETE_REQUESTED';
export const MS_DELETE_FAILED                = 'MS_DELETE_FAILED';
export const MS_DELETE_SUCCEED               = 'MS_DELETE_SUCCEED';
// --- --- Upgrade
export const MS_UPGRADE_LOCATION_CHANGED     = 'MS_UPGRADE_LOCATION_CHANGED';
export const MS_UPGRADE_PLAN_CHANGED         = 'MS_UPGRADE_PLAN_CHANGED';
export const MS_UPGRADE_PLAN_REQUESTED       = 'MS_UPGRADE_PLAN_REQUESTED';
export const MS_UPGRADE_PLAN_FAILED          = 'MS_UPGRADE_PLAN_FAILED';
export const MS_UPGRADE_PLAN_SUCCEED         = 'MS_UPGRADE_PLAN_SUCCEED';
// --
export const MS_UPGRADE_CMS_CHANGED          = 'MS_UPGRADE_CMS_CHANGED';
export const MS_UPGRADE_CMS_REQUESTED        = 'MS_UPGRADE_CMS_REQUESTED';
export const MS_UPGRADE_CMS_FAILED           = 'MS_UPGRADE_CMS_FAILED';
export const MS_UPGRADE_CMS_SUCCEED          = 'MS_UPGRADE_CMS_SUCCEED';
// --- --- Host
export const MS_HOST_REQUESTED               = 'MS_HOST_REQUESTED';
export const MS_HOST_FAILED                  = 'MS_HOST_FAILED';
export const MS_HOST_SUCCEED                 = 'MS_HOST_SUCCEED';
// --- --- Change Password
export const MS_SET_PASSWORD                 = 'MS_SET_PASSWORD';
export const MS_CHANGE_PASSWORD_REQUESTED    = 'MS_CHANGE_PASSWORD_REQUESTED';
export const MS_CHANGE_PASSWORD_FAILED       = 'MS_CHANGE_PASSWORD_FAILED';
export const MS_CHANGE_PASSWORD_SUCCEED      = 'MS_CHANGE_PASSWORD_SUCCEED';
// --- --- Emails
export const MS_EMAILS_REQUESTED             = 'MS_EMAILS_REQUESTED';
export const MS_EMAILS_FAILED                = 'MS_EMAILS_FAILED';
export const MS_EMAILS_SUCCEED               = 'MS_EMAILS_SUCCEED';
// --- --- Domains
export const MS_DOMAINS_REQUESTED            = 'MS_DOMAINS_REQUESTED';
export const MS_DOMAINS_FAILED               = 'MS_DOMAINS_FAILED';
export const MS_DOMAINS_SUCCEED              = 'MS_DOMAINS_SUCCEED';
// Create login ............................................................
// --- --- Create Login
export const MS_CREATE_LOGIN_REQUESTED       = 'MS_CREATE_LOGIN_REQUESTED';
export const MS_CREATE_LOGIN_FAILED          = 'MS_CREATE_LOGIN_FAILED';
export const MS_CREATE_LOGIN_SUCCEED         = 'MS_CREATE_LOGIN_SUCCEED';

// Domains
export const DOMAINS_LIST_REQUESTED          = 'LIST_DOMAINS_REQUESTED';
export const DOMAINS_LIST_FAILED             = 'LIST_DOMAINS_FAILED';
export const DOMAINS_LIST_SUCCEED            = 'LIST_DOMAINS_SUCCEED';
// --- Manage Domain
// --- --- Info
export const MD_INFO_REQUESTED               = 'MD_INFO_REQUESTED';
export const MD_INFO_FAILED                  = 'MD_INFO_FAILED';
export const MD_INFO_SUCCEED                 = 'MD_INFO_SUCCEED';
// --- --- Dns
export const MD_DNS_USE_TARINO_TOGGLED       = 'MD_DNS_USE_TARINO_TOGGLED';
export const MD_DNS_CHANGED                  = 'MD_DNS_CHANGED';
export const MD_DNS_SAVE_REQUESTED           = 'MD_DNS_SAVE_REQUESTED';
export const MD_DNS_SAVE_FAILED              = 'MD_DNS_SAVE_FAILED';
export const MD_DNS_SAVE_SUCCEED             = 'MD_DNS_SAVE_SUCCEED';
// --- --- Renew
export const MD_RENEW_PLAN_CHANGED           = 'MD_RENEW_PLAN_CHANGED';
export const MD_RENEW_REQUESTED              = 'MD_RENEW_REQUESTED';
export const MD_RENEW_FAILED                 = 'MD_RENEW_FAILED';
export const MD_RENEW_SUCCEED                = 'MD_RENEW_SUCCEED';
// --- --- Transfer
export const MD_TRANSFER_REASON_CHANGED      = 'MD_TRANSFER_REASON_CHANGED';
export const MD_TRANSFER_REQUESTED           = 'MD_TRANSFER_REQUESTED';
export const MD_TRANSFER_FAILED              = 'MD_TRANSFER_FAILED';
export const MD_TRANSFER_SUCCEED             = 'MD_TRANSFER_SUCCEED';
// --- --- Delete
export const MD_DELETE_REASON_CHANGED        = 'MD_DELETE_REASON_CHANGED';
export const MD_DELETE_REQUESTED             = 'MD_DELETE_REQUESTED';
export const MD_DELETE_FAILED                = 'MD_DELETE_FAILED';
export const MD_DELETE_SUCCEED               = 'MD_DELETE_SUCCEED';

// Wallet
// --- Credit
export const CREDIT_AMOUNT_CHANGED           = 'CREDIT_AMOUNT_CHANGED';
// --- Gateways
export const GATEWAYS_REQUESTED              = 'GATEWAYS_REQUESTED';
export const GATEWAYS_SUCCEED                = 'GATEWAYS_SUCCEED';
export const GATEWAYS_FAILED                 = 'GATEWAYS_FAILED';
// --- Add To Wallet
export const ADDTOWALLET_AMOUNT_CHANGED      = 'ADDTOWALLET_AMOUNT_CHANGED';
export const ADDTOWALLET_GATEWAY_CHANGED     = 'ADDTOWALLET_GATEWAY_CHANGED';
export const ADDTOWALLET_REQUESTED           = 'ADDTOWALLET_REQUESTED';
export const ADDTOWALLET_SUCCEED             = 'ADDTOWALLET_SUCCEED';
export const ADDTOWALLET_FAILED              = 'ADDTOWALLET_FAILED';
// ---
export const INVOICES_LIST_REQUESTED         = 'INVOICES_LIST_REQUESTED';
export const INVOICES_LIST_SUCCEED           = 'INVOICES_LIST_SUCCEED';
export const INVOICES_LIST_FAILED            = 'INVOICES_LIST_FAILED';
export const INVOICE_GATEWAY_CHANGED         = 'INVOICE_GATEWAY_CHANGED';
export const INVOICE_BANK_CHANGED            = 'INVOICE_BANK_CHANGED';
// ---
export const INVOICE_REQUESTED               = 'INVOICE_REQUESTED';
export const INVOICE_SUCCEED                 = 'INVOICE_SUCCEED';
export const INVOICE_FAILED                  = 'INVOICE_FAILED';
export const INVOICE_OFFCODE_TOGGLED         = 'INVOICE_OFFCODE_TOGGLED';
export const INVOICE_OFFCODE_CHANGED         = 'INVOICE_OFFCODE_CHANGED';
export const INVOICE_OFFCODE_REQUESTED       = 'INVOICE_OFFCODE_REQUESTED';
export const INVOICE_OFFCODE_SUCCEED         = 'INVOICE_OFFCODE_SUCCEED';
export const INVOICE_OFFCODE_FAILED          = 'INVOICE_OFFCODE_FAILED';
// --- Transfer Info
export const INVOICE_TF_CARDNO_CHANGED       = 'INVOICE_TF_CARDNO_CHANGED';
export const INVOICE_TF_SERIAL_CHANGED       = 'INVOICE_TF_SERIAL_CHANGED';
export const INVOICE_TF_DAY_CHANGED          = 'INVOICE_TF_DAY_CHANGED';
export const INVOICE_TF_MONTH_CHANGED        = 'INVOICE_TF_MONTH_CHANGED';
export const INVOICE_TF_YEAR_CHANGED         = 'INVOICE_TF_YEAR_CHANGED';
export const INVOICE_TF_HOUR_CHANGED         = 'INVOICE_TF_HOUR_CHANGED';
export const INVOICE_TF_MINUTE_CHANGED       = 'INVOICE_TF_MINUTE_CHANGED';
// --- Invoice Pay
export const INVOICE_PAY_FROM_WALLET_TYPE    = 'INVOICE_PAY_FROM_WALLET_TYPE';
export const INVOICE_PAY_FROM_WALLET_PRICE   = 'INVOICE_PAY_FROM_WALLET_PRICE';
export const INVOICE_PAY_REQUESTED           = 'INVOICE_PAY_REQUESTED';
export const INVOICE_PAY_SUCCEED             = 'INVOICE_PAY_SUCCEED';
export const INVOICE_PAY_FAILED              = 'INVOICE_PAY_FAILED';

// Profile
// --- Password
export const CHANGE_PASSWORD_NEW_CHANGED     = 'CHANGE_PASSWORD_NEW_CHANGED';
export const CHANGE_PASSWORD_CURRENT_CHANGED = 'CHANGE_PASSWORD_CURRENT_CHANGED';
export const CHANGE_PASSWORD_REQUESTED       = 'CHANGE_PASSWORD_REQUESTED';
export const CHANGE_PASSWORD_SUCCEED         = 'CHANGE_PASSWORD_SUCCEED';
export const CHANGE_PASSWORD_FAILED          = 'CHANGE_PASSWORD_FAILED';
// --- Check Email
export const CHECK_EMAIL_REQUESTED           = 'CHECK_EMAIL_REQUESTED';
export const CHECK_EMAIL_SUCCEED             = 'CHECK_EMAIL_SUCCEED';
export const CHECK_EMAIL_FAILED              = 'CHECK_EMAIL_FAILED';
// --- Info
export const PROFILE_MOBILE_CHANGED          = 'PROFILE_MOBILE_CHANGED';
export const PROFILE_EMAIL_CHANGED           = 'PROFILE_EMAIL_CHANGED';
export const PROFILE_TEL_CHANGED             = 'PROFILE_TEL_CHANGED';
export const PROFILE_FIRSTNAME_CHANGED       = 'PROFILE_FIRSTNAME_CHANGED';
export const PROFILE_LASTNAME_CHANGED        = 'PROFILE_LASTNAME_CHANGED';
export const PROFILE_ADDRESS_CHANGED         = 'PROFILE_ADDRESS_CHANGED';
export const PROFILE_CITY_CHANGED            = 'PROFILE_CITY_CHANGED';
export const PROFILE_STATE_CHANGED           = 'PROFILE_STATE_CHANGED';
// ---
export const UPDATE_PROFILE_REQUESTED        = 'UPDATE_PROFILE_REQUESTED';
export const UPDATE_PROFILE_SUCCEED          = 'UPDATE_PROFILE_SUCCEED';
export const UPDATE_PROFILE_FAILED           = 'UPDATE_PROFILE_FAILED';

// Settings
export const SETTINGS_REQUESTED              = 'SETTINGS_REQUESTED';
export const SETTINGS_SUCCEED                = 'SETTINGS_SUCCEED';
export const SETTINGS_FAILED                 = 'SETTINGS_FAILED';
// ---
export const SE_NOTICE_EMAIL_TOGGLED         = 'SE_NOTICE_EMAIL_TOGGLED';
export const SE_NOTICE_SMS_TOGGLED           = 'SE_NOTICE_SMS_TOGGLED';
export const SE_MOBILE_CHANGED               = 'SE_MOBILE_CHANGED';
export const SE_AUTOMATION_TOGGLED           = 'SE_AUTOMATION_TOGGLED';
// ---
export const UPDATE_SETTINGS_REQUESTED       = 'UPDATE_SETTINGS_REQUESTED';
export const UPDATE_SETTINGS_SUCCEED         = 'UPDATE_SETTINGS_SUCCEED';
export const UPDATE_SETTINGS_FAILED          = 'UPDATE_SETTINGS_FAILED';

// Notifications
export const NOTIFICATIONS_REQUESTED         = 'NOTIFICATIONS_REQUESTED';
export const NOTIFICATIONS_SUCCEED           = 'NOTIFICATIONS_SUCCEED';
export const NOTIFICATIONS_FAILED            = 'NOTIFICATIONS_FAILED';

// Theme Picker
export const THEME_PICKED                    = 'THEME_PICKED';
export const THEME_UNPICKED                  = 'THEME_UNPICKED';
export const THEME_CHANGED                   = 'THEME_CHANGED';
export const THEME_LAYOUT_CHANGED            = 'THEME_LAYOUT_CHANGED';
export const THEME_CAT_CHANGED               = 'THEME_CAT_CHANGED';
export const THEME_PICKER_REQUESTED          = 'THEME_PICKER_REQUESTED';
export const THEME_PICKER_SUCCEED            = 'THEME_PICKER_SUCCEED';
export const THEME_PICKER_FAILED             = 'THEME_PICKER_FAILED';

// User
export const USER_REQUESTED                  = 'USER_REQUESTED';
export const USER_SUCCEED                    = 'USER_SUCCEED';
export const USER_FAILED                     = 'USER_FAILED';
