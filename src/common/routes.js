import React from 'react';
import { stringify } from 'qs';
import auth from './utils/auth';
import { isBrowser } from './utils/windowUtils';
import { Route, IndexRedirect } from 'react-router';

import Auth from './pages/Auth';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ForgotPassword from './containers/ForgotPassword';
import ForgotCode from './containers/ForgotCode';
import ChangeFPw from './containers/ChangeFPw';

import App from './containers/App';

import Dashboard from './pages/Dashboard';
import Domains from './containers/Domains';
import Services from './containers/Services';

import ManageDomain from './pages/ManageDomain';
import DomainDns from './containers/DomainDns';
import DomainRenew from './containers/DomainRenew';
import DomainTransfer from './containers/DomainTransfer';
import DomainRemove from './containers/DomainRemove';

import ManageService from './pages/ManageService';
import ServiceResources from './containers/ServiceResources';
import ServiceUpgrade from './containers/ServiceUpgrade';
import ServiceDomains from './containers/ServiceDomains';
import ServiceIncTraffic from './containers/ServiceIncTraffic';
import ServiceAnalyse from './containers/ServiceAnalyse';
import ServiceHost from './containers/ServiceHost';
import ServiceBackup from './containers/ServiceBackup';
import ServiceAdvanced from './containers/ServiceAdvanced';
import ServiceRemove from './containers/ServiceRemove';

import BackupList from './containers/BackupList';
import UploadBackup from './containers/UploadBackup';
import BackupStarred from './containers/BackupStarred';

import Support from './pages/Support';
import NewSupportThread from './containers/NewSupportThread';
import SupportThreads from './containers/SupportThreads';
import SupportThread from './containers/SupportThread';

import New from './pages/New';
import NewDomain from './containers/NewDomain';
import NewService from './containers/NewService';
import NewNic from './containers/NewNic';

import Account from './pages/Account';
import Notifications from './containers/Notifications';
import Wallet from './containers/Wallet';
import Invoices from './containers/Invoices';
import Payments from './containers/Payments';
import Settings from './containers/Settings';
import Profile from './containers/Profile';
import Invoice from './pages/Invoice';

import Result from './pages/Result';
import ResultOk from './components/ResultOk';
import ResultError from './components/ResultError';

function checkAuth(nextState, replace) {
  if (auth.isLoggedIn()) {
    if(nextState.location.query.nextPathname) {
      // const pathArray = decodeURIComponent(nextState.location.query.nextPathname).split('?');
      // const pathname = pathArray[0];
      // const query = parse(pathArray[1]);
      replace({
        pathname: nextState.location.query.nextPathname,
        query: decodeURIComponent(nextState.location.query.nextQuery),
      });
    } else {
      replace({ pathname: '/dashboard' });
    }
  }
}

function requireAuth(nextState, replace) {
  if (isBrowser() && !auth.isLoggedIn()) {
    replace({
      pathname: '/login',
      query: {
        nextPathname: nextState.location.pathname,
        nextQuery: stringify(nextState.location.query)
      }
    });
    //  + '?' + stringify(nextState.location.query)
  }
}

export default (
  <div>
    <Route path="/">

      <Route component={Auth} onEnter={checkAuth}>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="forgot-password" component={ForgotPassword} />
        <Route path="forgot-code" component={ForgotCode} />
        <Route path="change-password" component={ChangeFPw} />
      </Route>

      <Route component={App} onEnter={requireAuth}>

        <IndexRedirect to="/dashboard" />

        <Route path="dashboard" component={Dashboard}>
          <IndexRedirect to="/dashboard/services" />
          <Route path="services" component={Services} />
          <Route path="domains" component={Domains} />
        </Route>

        <Route path="domains">
          <IndexRedirect to="/dashboard/domains" />
          <Route path=":url/:id" component={ManageDomain}>
            <IndexRedirect to="renew" />
            <Route path="dns" component={DomainDns} />
            <Route path="renew" component={DomainRenew} />
            <Route path="transfer" component={DomainTransfer} />
            <Route path="remove" component={DomainRemove} />
          </Route>
        </Route>

        <Route path="services">
          <IndexRedirect to="/dashboard/services" />
          <Route path=":id" component={ManageService}>
            <IndexRedirect to="resources" />
            <Route path="resources" component={ServiceResources} />
            <Route path="upgrade" component={ServiceUpgrade} />
            <Route path="domains" component={ServiceDomains} />
            <Route path="increase-traffic" component={ServiceIncTraffic} />
            <Route path="analyse" component={ServiceAnalyse} />
            <Route path="host" component={ServiceHost} />

            <Route path="backup" component={ServiceBackup}>
              <IndexRedirect to="list" />
              <Route path="list" component={BackupList} />
              <Route path="upload" component={UploadBackup} />
              <Route path="starred" component={BackupStarred} />
            </Route>

            <Route path="advanced" component={ServiceAdvanced} />
            <Route path="remove" component={ServiceRemove} />
          </Route>
        </Route>

        <Route path="support" component={Support}>
          <IndexRedirect to="/support/threads" />
          <Route path="new" component={NewSupportThread} />
          <Route path="threads" component={SupportThreads} />
          <Route path="threads/:id" component={SupportThread} />
        </Route>

        <Route path="new" component={New}>
          <IndexRedirect to="/new/service" />
          <Route path="service" component={NewService} />
          <Route path="domain" component={NewDomain} />
          <Route path="nic" component={NewNic} />
        </Route>

        <Route path="account" component={Account}>
          <IndexRedirect to="/account/notifications" />
          <Route path="notifications" component={Notifications} />

          <Route path="wallet" component={Wallet}>
            <IndexRedirect to="/account/wallet/invoices" />
            <Route path="invoices" component={Invoices} />
            <Route path="payments" component={Payments} />
          </Route>

          <Route path="settings" component={Settings} />
          <Route path="profile" component={Profile} />
        </Route>

        <Route path="invoices">
          <IndexRedirect to="/account/wallet/invoices" />
          <Route path=":id" component={Invoice} />
        </Route>

        <Route path="result" component={Result}>
          <Route path="ok" component={ResultOk} />
          <Route path="error" component={ResultError} />
        </Route>

      </Route>
    </Route>
  </div>
);

/*
 * All app routes:
 * - /
 * - /auth/login
 * - /auth/signup
 * - /auth/forgot-password
 * - /auth/forgot-code
 * - /auth/change-password
 * - /dashboard
 * - /dashboard/domains
 * - /dashboard/services
 * - /domains -> /dashboard/domains
 * - /domains/:url
 * - /domains/:url/transfer
 * - /domains/:url/remove
 * - /domains/:url/dns
 * - /domains/:url/renew
 * - /services -> /dashboard/services
 * - /services/:id
 * - /services/:id/upgrade
 * - /services/:id/resources
 * - /services/:id/domains
 * - /services/:id/analyse
 * - /services/:id/increase-traffic
 * - /services/:id/host
 * - /services/:id/backup
 * - /services/:id/backup/list
 * - /services/:id/backup/upload
 * - /services/:id/backup/starred
 * - /services/:id/advanced
 * - /services/:id/remove
 * - /support/new
 * - /support/threads
 * - /support/threads/:id
 * - /new/domain
 * - /new/service
 * - /new/nic
 * - /account/settings
 * - /account/profile
 * - /account/wallet
 * - /account/wallet/invoices
 * - /account/wallet/invoices/:id
 * - /account/wallet/payments
 * - /account/notifications
 * - /result/ok
 * - /result/error
 * -
 */
