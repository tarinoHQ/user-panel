import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getImage from '../data/images';
import Sort from '../utils/sort';
import { v4 } from 'node-uuid';
import moment from 'moment';

import * as uiSelectors from '../selectors/ui';
import * as servicesSelectors from '../selectors/services';
import * as servicesActions from '../actions/services';

import Table, { TableWithSorting } from '../components/Table';
import ServiceProgress from '../components/ServiceProgress';
import { Motion, spring, presets } from 'react-motion';
import ServiceItem from '../components/ServiceItem';
import ProgressBar from '../components/ProgressBar';
import MoreBubble from '../components/MoreBubble';
import IconText from '../components/IconText';
import Transition from 'react-motion-ui-pack';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

@connect(
  state => ({
    searchValue: uiSelectors.getDashboardSearchValue(state),
    servicesList: servicesSelectors.getList(state),
    isListFetching: servicesSelectors.isListFetching(state),
    getListStatus: servicesSelectors.getListStatus(state),
    getListError: servicesSelectors.getListError(state),
  }),
  {
    requestServicesList: servicesActions.requestServicesList
  }
)
@withRouter
class Services extends Component {
  constructor(props) {
    super(props);

    this.goToNewService = this.goToNewService.bind(this);
    this.retryClicked   = this.retryClicked.bind(this);
  }

  componentWillMount() {
    this.props.requestServicesList();
  }

  retryClicked() {
    this.props.requestServicesList();
  }

  goToNewService() {
    this.props.router.push('/new/service');
  }

  loadingStyles() {
    if (this.props.isListFetching) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: spring(0, presets.stiff),
        scale: spring(0, presets.stiff),
      };
    }
  }

  renderLoading() {
    return (
      <Motion style={this.loadingStyles()}>
        {v =>
          <div
            key={v4()}
            className="page__loading"
            style={{
              display: v.opacity == 0 ? 'none' : 'block',
              transform: `scale(${v.scale})`,
              opacity: v.opacity,
            }}>
            <Spinner
              className="page__loading__spinner"
              theme="info"
              spinnerName="cube-grid" />
            <span className="page__loading__text">درحال بارگذاری موارد ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.getListError && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد...</IconText>
          <Button
            style={{ margin: '0 10px' }}
            theme="warning"
            onClick={this.retryClicked}>
            تلاش دوباره
          </Button>
      </div>
    );
  }

  renderNoRecord() {
    const { servicesList, getListStatus } = this.props;
    
    return servicesList.length === 0 && getListStatus === 1 && (
      <div className="no-item">
        <div className="no-item__image">
          <img src={getImage('newCloud')} />
        </div>
        <div className="no-item__title">
          هنوز سرویسی نخریده‌اید...
        </div>
        <div className="no-item__desc">
          شما می‌توانید از بخش 
          <Button
            className="header__button"
            iconClass="icon-plus"
            iconPosition="right"
            theme="info"
            onClick={this.goToNewService}>
            سرویس جدید
          </Button>
          یک سرویس جدید (میزبانی‌وب، دامنه و سیستم‌مدیریت) بسازید.          
        </div>
      </div>
    );
  }

  render() {
    const { searchValue, servicesList, isListFetching, getListError } = this.props;

    return (
      <div className="services">
        <TableWithSorting
          columns={[
            {
              key: 'title',
              title: 'سرویس',
              template: row => (
                <ServiceItem
                  orderId={row.order_id}
                  name={row.domain}
                  description={row.details}
                  cms={row.cms_type}
                  pic={row.pic || getImage('host')}
                  url={row.domain} />
              ),
              sortBy: row => row.name
            },
            {
              key: 'createdAt',
              title: 'ساخته‌شده از',
              template: row => {
                if (row.status === 'done') {
                  return <span>{moment(parseInt(row.created) * 1000).locale('fa').fromNow()}</span>;
                } else {
                  return (
                    <ServiceProgress 
                      tasks={row.tasks}
                    />
                  );
                }
              },
              sortBy: row => row.created * -1
            },
            {
              key: 'more',
              title: '',
              template: row => (
                <MoreBubble
                  bubbleItems={[
                    { title: 'منابع', linkTo: `/services/${row.order_id}/resources` },
                    { title: 'ارتقا سرویس', linkTo: `/services/${row.order_id}/upgrade` },
                    { title: 'بازدید و آنالیز', linkTo: `/services/${row.order_id}/analyse` },
                    { title: 'پشتیبان‌', linkTo: `/services/${row.order_id}/backup/list` },
                    { title: 'آدرس ها', linkTo: `/services/${row.order_id}/domains` },
                    { separator: true },
                    { title: 'حذف سرویس', linkTo: `/services/${row.order_id}/remove`, style: { color: '#d46307' } },
                  ]}
                  children="بیشتر"
                />
              )
            }
          ]}
          data={servicesList}
          filter={row => {
            return row.domain.indexOf(this.props.searchValue) > -1;
          }}
          defaultSortBy="age"
          defaultSortDirection="asc"
          sortFunction={Sort.numeric}
        />

        {this.renderNoRecord()}

        {this.renderError()}
        {this.renderLoading()}

      </div>
    );
  }
}

export default Services;
