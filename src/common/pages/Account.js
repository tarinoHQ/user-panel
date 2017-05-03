import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import last from 'lodash/last';

import * as notifiSelectors from '../selectors/notifications';
import * as walletSelectors from '../selectors/wallet';
import * as authSelectors from '../selectors/auth';

import Drawer from '../components/Drawer';
import Badge from '../components/Badge';

@withRouter
class Account extends Component {
  constructor(props) {
    super(props);
  }

  getActiveItem() {
    const { routes } = this.props;
    return routes[4].path;
  }

  render() {
    const { router, children } = this.props;

    return (
      <div className="page page--right-side-layout">
        <div className="page__side">
          <div className="page__side__bg"></div>
          <Drawer
            items={[
              {
                key: 'notifications',
                render: () => (
                  <div>
                    <span>اعلان ها</span>
                    <Notifications
                      theme="danger"
                      className="drawer__item__badge" 
                    />
                  </div>
                ),
                iconClass: 'icon-bell-alt',
                onClick: () => router.push('/account/notifications')
              },
              {
                key: 'wallet',
                render: () => (
                  <div>
                    <span>کیف پول</span>
                    <Wallet
                      bg={false}
                      theme="info"
                      className="drawer__item__badge" 
                    />
                  </div>
                ),
                iconClass: 'icon-credit-card-alt',
                onClick: () => router.push('/account/wallet')
              },
              {
                key: 'settings',
                title: 'تنظیمات',
                iconClass: 'icon-cog',
                onClick: () => router.push('/account/settings')
              },
              {
                key: 'profile',
                title: 'حساب کاربری',
                iconClass: 'icon-briefcase',
                onClick: () => router.push('/account/profile')
              }
            ]}
            activeItem={this.getActiveItem()}
          />
        </div>
        <div className="page__content">
          {children}
        </div>
      </div>
    );
  }
}

export default Account;


@connect(
  state => ({
    count: notifiSelectors.getNotificationsCount(state)
  }),
  null
)
class Notifications extends Component {
  render() {
    const { count, dispatch, ...props } = this.props;
    const faCount = toPersian(count);

    if (count > 0) {

        return (
          <Badge
            theme="danger"
            className="drawer__item__badge">
              {faCount}
          </Badge>
        );

    } else {
      return <div />;
    }
    
  }
}


@connect(
  state => ({
    credit: walletSelectors.getCreditAmount(state)
  }),
  null
)
class Wallet extends Component {
  render() {
    const { credit, dispatch, ...props } = this.props;
    const faCredit = toPersian(credit, true);

    return (
      <Badge {...props}>
        {faCredit} تومان
      </Badge>
    );
    
  }
}
