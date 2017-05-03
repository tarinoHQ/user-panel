import { checkStatus, parseJSON } from '../utils/apiUtils';
import { apiBaseUrl } from '../config';
import { polyfill } from 'es6-promise';
import compact from 'lodash/compact';
import { stringify } from 'qs';
import axios from 'axios';
import request from 'superagent';
// polyfill();

var instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // accept: 'application/json',
});

// request('http://api.tarino.ir/v1/list_services', function (error, response, body) {
// request
//   .post('http://api.tarino.ir/v1/list_services')
//   .send({ name: 'Manny', species: 'cat' })
//   .set('X-API-Key', 'foobar')
//   .set('Accept', 'application/json')
//   .end(function(err, res){
//     // Calling the end function will send the request
//     console.log(res);
//   });

export function logout({ token }) {
  return instance({
      method: 'get',
      url: '/logout',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

export function login({ email, password }) {
  return instance({
      method: 'post',
      url: '/login',
      data: stringify({
        email,
        password
      }),
    })
    .then(({ data }) => data);
}

export function signup({ firstName, lastName, email, password, mobile }) {
  return instance({
      method: 'post',
      url: '/register',
      data: stringify({
        firstName,
        lastName,
        email,
        password,
        mobile
      })
    })
    .then(({ data }) => data);
}

// Services List
export function getServicesList({ token }) {
  return instance({
      method: 'post',
      url: '/list_services',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// Domains List
export function getDomainsList({ token }) {
  return instance({
      method: 'get',
      url: '/list_domains',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// New Ticket
export function createTicket({ token, order_id, order_type, department_id, title, msg, file }) {
  var data = new FormData();
  data.append('order_id', order_id);
  data.append('order_type', order_type);
  data.append('department_id', department_id);
  data.append('title', title);
  data.append('msg', msg);
  data.append('file', file);

  return instance({
      method: 'post',
      url: '/create_ticket',
      headers: {
        token
      },
      data
    })
    .then(({ data }) => data);
}

// Tickets
export function getTickets({ token }) {
  return instance({
      method: 'get',
      url: '/list_tickets',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// Ticket Messages
export function getTicketMessages({ token, ticketId }) {
  return instance({
      method: 'post',
      url: '/list_ticket_msgs',
      headers: {
        token
      },
      data: stringify({
        ticketId
      })
    })
    .then(({ data }) => data);
}

// Reply Ticket
export function ticketReply({ token, ticket_id, msg, file }) {
  var data = new FormData();
  data.append('ticket_id', ticket_id);
  data.append('msg', msg);
  data.append('file', file);

  return instance({
      method: 'post',
      url: '/ticket_reply',
      headers: {
        token
      },
      data
    })
    .then(({ data }) => data);
}

// Domain Register
// export function registerDomain({
//     token,
//     address,
//     domainName,
//     nicUsername,
//     dnsType,
//     dnsArray,
//   }) {
//     return instance({
//         method: 'post',
//         url: '/domain_register',
//         headers: {
//           token
//         },
//         data: stringify({
//           address,
//           domainName,
//           nicUsername,
//           dnsType,
//           dnsArray,
//         })
//       })
//       .then(({ data }) => data);
// }

// Create Nic
export function createNic({
    token,
    idCardNo,
    email,
    firstName,
    lastName,
    phone,
    postalCode,
    address,
    state,
    city,
  }) {
    return instance({
        method: 'post',
        url: '/create_nic',
        headers: {
          token
        },
        data: stringify({
          idCardNo,
          email,
          firstName,
          lastName,
          phone,
          postalCode,
          address,
          state,
          city,
        })
      })
      .then(({ data }) => data);
}

// List Nic
export function getNicList({ token }) {
  return instance({
      method: 'get',
      url: '/list_nic',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// List Searched Domains
export function getSearchedDomains({ token, address, domainNames }) {
  return instance({
      method: 'post',
      url: '/whois',
      headers: {
        token
      },
      data: stringify({
        address,
        domainNames: domainNames.join(','),
      })
    })
    .then(({ data }) => data);
}

// Register Domain
export function registerDomain({
    token,
    address,
    domainNames,
    nicUsername,
    dnsType,
    dnsArray,
  }) {
    return instance({
        method: 'post',
        url: '/domain_register',
        headers: {
          token
        },
        data: stringify({
          address,
          domainNames,
          nicUsername,
          dnsType,
          dnsArray: compact(dnsArray).join(',')
        })
      })
      .then(({ data }) => data);
}

// Gateways
export function getGateways({ token }) {
  return instance({
      method: 'get',
      url: '/list_gateways',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// Invoice List
export function getInvoicesList({ token }) {
  return instance({
      method: 'get',
      url: '/list_invoices',
      headers: {
        token
      }
    })
    .then(({ data }) => data);
}

// Invoice
export function getInvoice({ token, invoiceId }) {
    return instance({
        method: 'post',
        url: '/invoice',
        headers: {
          token
        },
        data: stringify({
          invoiceId
        })
      })
      .then(({ data }) => data);
}

// Check Off Code
export function checkOffCode({ token, invoiceId, offCode }) {
    return instance({
        method: 'post',
        url: '/check_off_code',
        headers: {
          token
        },
        data: stringify({
          invoiceId,
          offCode,
        })
      })
      .then(({ data }) => data);
}

// Invoice Pay
export function payInvoice({
    token,
    invoiceId,
    payMethod,
    price,
    bank,
    cardNo,
    serial,
    date,
    time,
  }) {
    return instance({
        method: 'post',
        url: '/invoice_pay',
        headers: {
          token
        },
        data: stringify({
          invoiceId,
          payMethod,
          price,
          bank,
          cardNo,
          serial,
          date,
          time,
        })
      })
      .then(({ data }) => data);
}

// Add Credit
export function addCredit({ token, price }) {
    return instance({
        method: 'post',
        url: '/add_credit',
        headers: {
          token
        },
        data: stringify({
          price,
        })
      })
      .then(({ data }) => data);
}

// Check User Email
export function checkUserEmail({ token, email }) {
    return instance({
        method: 'post',
        url: '/check_user_email',
        headers: {
          token
        },
        data: stringify({
          email,
        })
      })
      .then(({ data }) => data);
}

// Change Password
export function changePassword({ token, password, newPassword }) {
    return instance({
        method: 'post',
        url: '/edit_profile',
        headers: {
          token
        },
        data: stringify({
          password,
          newPassword,
        })
      })
      .then(({ data }) => data);
}

// Update Profile
export function updateProfile({ token, mobile, email, firstName, lastName, tel, address, city, state }) {
    return instance({
        method: 'post',
        url: '/edit_profile',
        headers: {
          token
        },
        data: stringify({
          mobile,
          email,
          firstName,
          lastName,
          tel,
          address,
          city,
          state,
        })
      })
      .then(({ data }) => data);
}

// User Setting
export function getUserSetting({ token }) {
    return instance({
        method: 'get',
        url: '/user_setting',
        headers: {
          token
        },
      })
      .then(({ data }) => data);
}

// Update User Setting
export function updateUserSetting({ token, notices, mobile, automation }) {
    return instance({
        method: 'post',
        url: '/update_user_setting',
        headers: {
          token
        },
        data: stringify({
          notices,
          mobile,
          automation,
        })
      })
      .then(({ data }) => data);
}

// Get Single Domain
export function getSingleDomain({ token, domainId }) {
    return instance({
        method: 'get',
        url: `/list_domains/${domainId}`,
        headers: {
          token
        },
      })
      .then(({ data }) => data);
}

// Update Domain DNS
export function updateDomainDns({ token, domainId, dns }) {
    return instance({
        method: 'post',
        url: '/update_domain_dns',
        headers: {
          token
        },
        data: stringify({
          domainId,
          dns,
        })
      })
      .then(({ data }) => data);
}

// Renew Domain
export function renewDomain({ token, domainId, renewPlan }) {
    return instance({
        method: 'post',
        url: '/renew_domain',
        headers: {
          token
        },
        data: stringify({
          domainId,
          renewPlan,
        })
      })
      .then(({ data }) => data);
}

// Transfer Domain
export function transferDomain({ token, domainId, reason }) {
    return instance({
        method: 'post',
        url: '/transfer_domain',
        headers: {
          token
        },
        data: stringify({
          domainId,
          reason
        })
      })
      .then(({ data }) => data);
}

// Delete Domain
export function deleteDomain({ token, domainId, reason }) {
    return instance({
        method: 'post',
        url: '/service_remove_request',
        headers: {
          token
        },
        data: stringify({
          domainId,
          reason
        })
      })
      .then(({ data }) => data);
}

// List Notifications
export function getNotificationsList({ token }) {
    return instance({
        method: 'get',
        url: '/list_notifications',
        headers: {
          token
        },
      })
      .then(({ data }) => data);
}

// Forgot Password
export function forgotPassword({ email }) {
    return instance({
        method: 'post',
        url: '/forgot_password',
        data: stringify({
          email
        })
      })
      .then(({ data }) => data);
}

// Forgot Passsword Code
export function submitForgotCode({ code }) {
    return instance({
        method: 'post',
        url: '/forgot_password_code',
        data: stringify({
          code
        })
      })
      .then(({ data }) => data);
}

// Change Forgotten Password
export function changeFPw({ password }) {
    return instance({
        method: 'post',
        url: '/change_fpw_password',
        data: stringify({
          password
        })
      })
      .then(({ data }) => data);
}

// Create Service
export function createService({
    token,
    nicUsername,
    domainType,
    address,
    domainNames,
    plan,
    cms,
    location,
    themeLayout,
    dedIp,
    dedDns,
  }) {
    return instance({
        method: 'post',
        url: '/create_service',
        headers: {
          token
        },
        data: stringify({
          nicUsername,
          domainType,
          address,
          domainNames,
          plan,
          cms,
          location,
          themeLayout,
          dedIp,
          dedDns,
        })
      })
      .then(({ data }) => data);
}

// Service Analyse
export function getServiceAnalyse({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/user_service_analytics',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Service Delete
export function deleteService({ token, orderId, reason }) {
    return instance({
        method: 'post',
        url: '/service_delete',
        headers: {
          token
        },
        data: stringify({
          orderId,
          reason
        })
      })
      .then(({ data }) => data);
}

// Backup List
export function serviceBackupList({ token, orderId, star }) {
    return instance({
        method: 'post',
        url: '/user_list_backup',
        headers: {
          token
        },
        data: stringify({
          orderId,
          star
        })
      })
      .then(({ data }) => data);
}

// Service Summery
export function serviceSummery({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/service_summery',
        headers: {
          token
        },
        data: stringify({
          orderId
        })
      })
      .then(({ data }) => data);
}

// Service Password Change
export function servicePasswordChange({ token, orderId, password }) {
    return instance({
        method: 'post',
        url: '/user_password_change',
        headers: {
          token
        },
        data: stringify({
          orderId,
          password
        })
      })
      .then(({ data }) => data);
}

// Star Backup
export function starBackup({ token, orderId, backupId, isStar = 1 }) {
    return instance({
        method: 'post',
        url: '/user_star_backup',
        headers: {
          token
        },
        data: stringify({
          orderId,
          backupId,
          isStar
        })
      })
      .then(({ data }) => data);
}

// Start Backup Request
export function startBackupRequest({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/backup_start_request',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Start Backup Request
export function getTaskService({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/get_task_service',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}




// Themes, Cats, Layouts
export function getThemes() {
    return instance({
        method: 'get',
        url: '/list_themes'
      })
      .then(({ data }) => data);
}

// User
export function getUser({ token }) {
    return instance({
        method: 'get',
        url: '/user',
        headers: {
          token
        },
      })
      .then(({ data }) => data);
}

// User
export function getServiceEmails({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/user_list_emails',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Service Summary
export function getServiceSummary({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/service_summery',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Service Domains
export function getServiceDomains({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/service_list_domains',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Service Create Login
export function serviceCreateLogin({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/create_login',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// User
export function getProcessingServicesTasks({ token }) {
    return instance({
        method: 'get',
        url: '/get_task_service',
        headers: {
          token
        },
      })
      .then(({ data }) => data);
}

// Do Backup
export function serviceDoBackup({ token, orderId }) {
    return instance({
        method: 'post',
        url: '/backup_start_request',
        headers: {
          token
        },
        data: stringify({
          orderId,
        })
      })
      .then(({ data }) => data);
}

// Backup Restore
export function serviceBackupRestore({ token, orderId, backupId }) {
    return instance({
        method: 'post',
        url: '/backup_restore_request',
        headers: {
          token
        },
        data: stringify({
          orderId,
          backupId
        })
      })
      .then(({ data }) => data);
}

/*
 * APIS: 
  user_list_emails         DONE
  user_password_change     DONE
  user_list_backup         DONE
  user_star_backup         DONE
  service_remove_request   DONE
  get_task_service         DONE
  backup_start_request     DONE
  service_list_domains     DONE
  create_login             DONE
  user                     DONE
  backup_restore_request   
  backup_transfer_dropbox  
 */
