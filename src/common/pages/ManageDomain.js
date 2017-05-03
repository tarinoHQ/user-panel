import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import last from 'lodash/last';

import * as actions from '../actions/domains';
import * as selectors from '../selectors/domains';

import ManageDomainHeader from '../components/ManageDomainHeader';
import Drawer from '../components/Drawer';

@connect(
  state => ({

  }),
  {
    requestMdInfo: actions.requestMdInfo
  }
)
@withRouter
class ManageDomain extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestMdInfo(this.props.routeParams.id);
  }

  getActiveItem() {
    const { routes } = this.props;
    return routes[5].path;
  }

  render() {
    const { router, routeParams, children } = this.props;

    return (
      <div className="page page--right-side-layout">
        <div className="page__header page__header--has-padding page__header--colored">
          <ManageDomainHeader url={routeParams.url} />
        </div>

        <div className="page__side">
          <div className="page__side__bg"></div>
          <Drawer
            items={[
              {
                key: 'dns',
                title: 'نام سرور ها',
                iconClass: 'icon-list-bullet',
                onClick: () => router.push(`/domains/${routeParams.url}/${routeParams.id}/dns`)
              },
              {
                key: 'renew',
                title: 'تمدید مالکیت',
                iconClass: 'icon-credit-card-alt',
                onClick: () => router.push(`/domains/${routeParams.url}/${routeParams.id}/renew`)
              },
              {
                key: 'transfer',
                title: 'انتقال دامنه',
                iconClass: 'icon-location',
                onClick: () => router.push(`/domains/${routeParams.url}/${routeParams.id}/transfer`)
              },
              {
                key: 'remove',
                title: 'حذف دامنه',
                iconClass: 'icon-minus-circled',
                onClick: () => router.push(`/domains/${routeParams.url}/${routeParams.id}/remove`)
              }
            ]}
            activeItem={this.getActiveItem()}
          />
        </div>
        <div className="page__content">
          {React.cloneElement(children, { domainId: routeParams.id })}
        </div>
      </div>
    );
  }
}

export default ManageDomain;
