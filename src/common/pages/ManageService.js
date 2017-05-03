import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import last from 'lodash/last';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import ManageServiceHeader from '../components/ManageServiceHeader';
import Drawer from '../components/Drawer';

@connect(
  undefined,
  actions
)
@withRouter
class ManageService extends Component {
  constructor(props) {
    super(props);
    this.orderId = props.routeParams.id;
  }

  componentDidMount() {
    this.props.requestMsSummary(this.orderId);
  }

  getActiveItem() {
    const { routes } = this.props;
    return routes[5].path;
  }

  render() {
    const { router, routeParams, children, isFetching, domain, description } = this.props;

    return (
      <div className="page page--right-side-layout">
        <div className="page__header page__header--has-padding page__header--colored">
          <ManageServiceHeader 
            orderId={this.orderId} />
        </div>

        <div className="page__side">
          <div className="page__side__bg"></div>
          <Drawer
            items={[
              {
                key: 'resources',
                title: 'منابع',
                iconClass: 'icon-chart-pie',
                onClick: () => router.push(`/services/${this.orderId}/resources`)
              },
              {
                key: 'upgrade',
                title: 'ارتقا سرویس',
                iconClass: 'icon-sliders',
                onClick: () => router.push(`/services/${this.orderId}/upgrade`)
              },
              {
                key: 'domains',
                title: 'آدرس ها',
                iconClass: 'icon-map-o',
                onClick: () => router.push(`/services/${this.orderId}/domains`)
              },
              {
                key: 'analyse',
                title: 'بازدید و آنالیز',
                iconClass: 'icon-chart-line',
                onClick: () => router.push(`/services/${this.orderId}/analyse`)
              },
              /*{
                key: 'increase-traffic',
                title: 'افزایش مخاطب',
                iconClass: 'icon-mouse-pointer',
                onClick: () => router.push(`/services/${this.orderId}/increase-traffic`)
              },*/
              {
                key: 'host',
                title: 'مدیریت هاست',
                iconClass: 'icon-cloud',
                onClick: () => router.push(`/services/${this.orderId}/host`)
              },
              {
                key: 'backup',
                title: 'پشتیبان',
                iconClass: 'icon-lifebuoy',
                onClick: () => router.push(`/services/${this.orderId}/backup`)
              },
              {
                key: 'advanced',
                title: 'امکانات حرفه‌ای',
                iconClass: 'icon-shield',
                onClick: () => router.push(`/services/${this.orderId}/advanced`)
              },
              {
                key: 'remove',
                title: 'حذف سرویس',
                iconClass: 'icon-minus-circled',
                onClick: () => router.push(`/services/${this.orderId}/remove`)
              }
            ]}
            activeItem={this.getActiveItem()}
          />
        </div>
        <div className="page__content">
          {React.cloneElement(children, { orderId: this.orderId })}
        </div>
      </div>
    );
  }
}

export default ManageService;
