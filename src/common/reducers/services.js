import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { domainTypes } from '../constants/Orders';
import * as types from '../constants/ActionTypes';
import { serverLocations } from '../constants/Plans';
import { 
  serviceArraySchema, 
  backupArraySchema, 
  emailArraySchema,
  serviceDomainArraySchema,
} from '../constants/Schemas';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

const initialState = {
  new: {
    domainType: domainTypes.NEW,
    domainAddress: '',
    location: serverLocations.IR,
    plan: null,
    cms: 'none',
    theme: null,
    themeLayout: null,
    dedicatedIp: false,
    dedicatedDns: false,
    // ajax states
    invoiceId: null,
    isFetching: false,
    status: null,
    error: null,
  },
  list: {
    allIds: [],
    byId: {},
    // ajax states
    isFetching: false,
    status: null,
    error: null,
  },
  manage: {
    // --
    summary: {
      backupCount       : null,
      suspendedStatus   : null,
      domain            : null,
      diskLimitMb       : null,
      diskUsedMb        : null,
      plan              : null,
      cpuPercent        : null,
      memoryUsagePercent: null,
      username          : null,
      description       : null,
      location          : null,
      isFetching        : false,
      status            : null,
      error             : null,
    },
    // --
    analyse: {
      alexa: {
        global: '0',
        country: {
          name: '',
          rank: '0'
        }
      },
      isFetching: false,
      status: null,
      error: null,
    },
    // --
    delete: {
      reason: '',
      isSending: false,
      status: null,
      error: null,
    },
    // --
    backup: {
      doBackup: {
        isFetching: false,
        status: null,
        error: null,
      },
      star: {
        isFetching: false,
        status: null,
        error: null,
      },
      restore: {
        backupId: null,
        isModalOpen: false,
        isFetching: false,
        status: null,
        error: null,
      },
      delete: {
        isFetching: false,
        status: null,
        error: null,
      },
      dropbox: {
        isFetching: false,
        status: null,
        error: null,
      },
      drive: {
        isFetching: false,
        status: null,
        error: null,
      },
      ftp: {
        isFetching: false,
        status: null,
        error: null,
      },
      list: {
        allIds: [],
        byId: {},
        isFetching: false,
        status: null,
        error: null,
      },
      starred: {
        allIds: [],
        byId: {},
        isFetching: false,
        status: null,
        error: null,
      },
    },
    // --
    upgrade: {
      location: serverLocations.IR,
      plan: null,
      isPlanSending: false,
      planStatus: null,
      planError: null,
      // -- 
      cms: null,
      isCmsSending: false,
      cmsStatus: null,
      cmsError: null,
    },
    // --
    host: {
      username: null,
      isFetching: false,
      status: null,
      error: null,
    },
    // --
    changePassword: {
      password: '',
      isSending: false,
      status: null,
      error: null,
    },
    // --
    emails: {
      allIds: [],
      byId: {},
      isFetching: false,
      status: null,
      error: null,
    },
    // --
    domains: {
      allIds: [],
      byId: {},
      isFetching: false,
      status: null,
      error: null,
    },
    // --
    createLogin: {
      url: null,
      isFetching: false,
      status: null,
      error: null,
    },
  }
};

const newService = (state = initialState.new, action) => {
  switch (action.type) {
    case types.SERVICE_DOMAIN_TYPE_CHANGED:
      return { ...state, domainType: action.value };
      
    case types.SERVICE_DOMAIN_ADDRESS_CHANGED:
      return { ...state, domainAddress: action.value };
      
    case types.SERVICE_LOCATION_CHANGED:
      return { ...state, location: action.value };
      
    case types.SERVICE_PLAN_CHANGED:
      return { ...state, plan: action.value };

    case types.SERVICE_CMS_CHANGED:
      return { ...state, cms: action.value };

    case types.SERVICE_THEME_CHANGED:
      return { ...state, theme: action.value };

    case types.SERVICE_THEME_LAYOUT_CHANGED:
      return { ...state, themeLayout: action.value };

    case types.SERVICE_DEDIP_TOGGLED:
      return { ...state, dedicatedIp: !state.dedicatedIp };

    case types.SERVICE_DEDDNS_TOGGLED:
      return { ...state, dedicatedDns: !state.dedicatedDns };

    case types.SERVICE_CMS_CHANGED:
      return { ...state, cms: action.value };

    case types.SERVICE_CREATE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.SERVICE_CREATE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.SERVICE_CREATE_SUCCEED:
      return { ...state, isFetching: false, status: 1, invoiceId: action.invoiceId };

    default:
      return state;
  }
};

const list = (state = initialState.list, action) => {
  switch (action.type) {
    case types.SERVICES_LIST_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };

    case types.SERVICES_LIST_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };

    case types.SERVICES_LIST_SUCCEED:
      const data = normalize(action.services, serviceArraySchema);
      return {
          ...state,
          status: 1,
          isFetching: false,
          allIds: data.result,
          byId: data.entities.services
        };

    // case types.SERVICES_TASKS_FAILED:
    case types.SERVICES_TASKS_SUCCEED:
      // action.allIds;
      // action.byId;
      let stateById = cloneDeep(state.byId);
      each(state.allIds, id => {
        stateById[id].status = action.byId[id].status;
        if (action.byId[id].status === 'processing') {
          stateById[id].tasks = action.byId[id].tasks;
        }
      });
      return { ...state, byId: stateById };

    default:
      return state;
  }
};

// manage
// -- summary
const summary = (state = initialState.manage.summary, action) => {
  switch (action.type) {
    case types.MS_SUMMARY_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_SUMMARY_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_SUMMARY_SUCCEED:
      return {
        ...state,
        status: 1,
        isFetching: false,
        ...action.data
      };

    default:
      return state;
  }
};

// -- analyse
const analyse = (state = initialState.manage.analyse, action) => {
  switch (action.type) {
    case types.MS_ANALYSE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_ANALYSE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_ANALYSE_SUCCEED:
      return {
        ...state,
        isFetching: false,
        status: 1,
        alexa: action.data.alexa,
      };
      // TODO: add other parts visits, seo, alayse 

    default:
      return state;
  }
};

// -- delete
const del = (state = initialState.manage.delete, action) => {
  switch (action.type) {
    case types.MS_DELETE_REASON_CHANGED:
      return { ...state, reason: action.value };

    case types.MS_DELETE_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.MS_DELETE_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MS_DELETE_SUCCEED:
      return { ...state, isSending: false, status: 1, };
      // TODO: add data getting from api
    default:
      return state;
  }
};


// -- Backup
const doBackup = (state = initialState.manage.backup.doBackup, action) => {
  switch (action.type) {
    case types.MS_DO_BACKUP_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_DO_BACKUP_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_DO_BACKUP_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupStar = (state = initialState.manage.backup.star, action) => {
  switch (action.type) {
    case types.MS_BACKUP_STAR_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_STAR_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_STAR_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupRestore = (state = initialState.manage.backup.restore, action) => {
  switch (action.type) {
    case types.MS_BACKUP_RESTORE_MODAL_OPENED:
      return { ...state, isModalOpen: true, backupId: action.backupId };

    case types.MS_BACKUP_RESTORE_MODAL_CLOSED:
      // , backupId: null
      return { ...state, isModalOpen: false };

    case types.MS_BACKUP_RESTORE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_RESTORE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_RESTORE_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupDelete = (state = initialState.manage.backup.delete, action) => {
  switch (action.type) {
    case types.MS_BACKUP_DELETE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_DELETE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_DELETE_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupDropbox = (state = initialState.manage.backup.dropbox, action) => {
  switch (action.type) {
    case types.MS_BACKUP_DROPBOX_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_DROPBOX_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_DROPBOX_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupDrive = (state = initialState.manage.backup.drive, action) => {
  switch (action.type) {
    case types.MS_BACKUP_DRIVE_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_DRIVE_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_DRIVE_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupFtp = (state = initialState.manage.backup.ftp, action) => {
  switch (action.type) {
    case types.MS_BACKUP_FTP_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_FTP_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_FTP_SUCCEED:
      return { ...state, isFetching: false, status: 1 };

    default:
      return state;
  }
};

const backupList = (state = initialState.manage.backup.list, action) => {
  switch (action.type) {
    case types.MS_BACKUP_LIST_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_BACKUP_LIST_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_BACKUP_DELETE_SUCCEED:
    case types.MS_BACKUP_STAR_SUCCEED:
    case types.MS_BACKUP_LIST_SUCCEED:
      const data = normalize(action.list, backupArraySchema);
      return { ...state, isFetching: false, status: 1, allIds: data.result, byId: data.entities.backups };

    default:
      return state;
  }
};

const starredBackups = (state = initialState.manage.backup.starred, action) => {
  switch (action.type) {
    case types.MS_STARRED_BACKUPS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_STARRED_BACKUPS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_STARRED_BACKUPS_SUCCEED:
      const data = normalize(action.list, backupArraySchema);
      return { ...state, isFetching: false, status: 1, allIds: data.result, byId: data.entities.backups };

    default:
      return state;
  }
};

// -- upgrade
const upgrade = (state = initialState.manage.upgrade, action) => {
  switch (action.type) {
    case types.MS_UPGRADE_PLAN_CHANGED:
      return { ...state, plan: action.value };

    case types.MS_UPGRADE_LOCATION_CHANGED:
      return { ...state, location: action.value };

    case types.MS_UPGRADE_PLAN_REQUESTED:
      return { ...state, isPlanSending: true, planStatus: null, planError: null };
    case types.MS_UPGRADE_PLAN_FAILED:
      return { ...state, isPlanSending: false, planStatus: action.status, planError: action.error };
    case types.MS_UPGRADE_PLAN_SUCCEED:
      return { ...state, isPlanSending: false, planStatus: 1 };

    case types.MS_UPGRADE_CMS_CHANGED:
      return { ...state, cms: action.value };

    case types.MS_UPGRADE_CMS_REQUESTED:
      return { ...state, isCmsSending: true, cmsStatus: null, cmsError: null };
    case types.MS_UPGRADE_CMS_FAILED:
      return { ...state, isCmsSending: false, cmsStatus: action.status, cmsError: action.error };
    case types.MS_UPGRADE_CMS_SUCCEED:
      return { ...state, isCmsSending: false, cmsStatus: 1 };

    default:
      return state;
  }
};

const host = (state = initialState.manage.host, action) => {
  switch (action.type) {
    case types.MS_HOST_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_HOST_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_HOST_SUCCEED:
      return { ...state, isFetching: false, status: 1, username: action.data.username, cpanel: action.data.cpanel };

    default:
      return state;
  }
};

const changePassword = (state = initialState.manage.changePassword, action) => {
  switch (action.type) {
    case types.MS_SET_PASSWORD:
      return { ...state, password: action.value };

    case types.MS_CHANGE_PASSWORD_REQUESTED:
      return { ...state, isSending: true, status: null, error: null };
    case types.MS_CHANGE_PASSWORD_FAILED:
      return { ...state, isSending: false, status: action.status, error: action.error };
    case types.MS_CHANGE_PASSWORD_SUCCEED:
      return { ...state, isSending: false, status: 1 };

    default:
      return state;
  }
};

const emails = (state = initialState.manage.emails, action) => {
  switch (action.type) {
    case types.MS_EMAILS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_EMAILS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_EMAILS_SUCCEED:
      const data = normalize(action.list, emailArraySchema);
      return { ...state, isFetching: false, status: 1, error: null, allIds: data.result, byId: data.entities.emails };

    default:
      return state;
  }
};

const domains = (state = initialState.manage.domains, action) => {
  switch (action.type) {
    case types.MS_DOMAINS_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_DOMAINS_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_DOMAINS_SUCCEED:
      const data = normalize(action.list, serviceDomainArraySchema);
      return { ...state, isFetching: false, status: 1, allIds: data.result, byId: data.entities.domains };

    default:
      return state;
  }
};

const createLogin = (state = initialState.manage.createLogin, action) => {
  switch (action.type) {
    case types.MS_CREATE_LOGIN_REQUESTED:
      return { ...state, isFetching: true, status: null, error: null };
    case types.MS_CREATE_LOGIN_FAILED:
      return { ...state, isFetching: false, status: action.status, error: action.error };
    case types.MS_CREATE_LOGIN_SUCCEED:
      return { ...state, isFetching: false, status: 1, ...action.data };

    default:
      return state;
  }
};


const backup = combineReducers({
  doBackup: doBackup,
  star: backupStar,
  restore: backupRestore,
  delete: backupDelete,
  dropbox: backupDropbox,
  drive: backupDrive,
  ftp: backupFtp,
  list: backupList,
  starred: starredBackups,
});

const manage = combineReducers({
  summary,
  analyse,
  delete: del,
  backup,
  upgrade,
  host,
  changePassword,
  emails,
  domains,
  createLogin,
});

const services = combineReducers({
  new: newService,
  list,
  manage,
});

export default services;
