import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Sort from '../utils/sort';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';
import moment from 'moment';

import * as selectors from '../selectors/services';
import * as actions from '../actions/services';

import Table, { TableWithSorting } from '../components/Table';
import { Motion, spring, presets } from 'react-motion';
import SectionTitle from '../components/SectionTitle';
import ServiceItem from '../components/ServiceItem';
import MessageBox from '../components/MessageBox';
import MoreBubble from '../components/MoreBubble';
import DateTime from '../components/DateTime';
import Transition from 'react-motion-ui-pack';
import IconText from '../components/IconText';
import HelpBtn from '../components/HelpBtn';
import CopyBtn from '../components/CopyBtn';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

@connect(
  state => ({
    list: selectors.getMsDomains(state),
    isFetching: selectors.isMsDomainsFetching(state),
    status: selectors.getMsDomainsStatus(state),
    error: selectors.getMsDomainsError(state)
  }),
  {
    requestMsDomains: actions.requestMsDomains
  }
)
@withRouter
class ServiceDomains extends Component {
  constructor(props) {
    super(props);
    this.orderId       = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  componentWillMount() {
    this.props.requestMsDomains(this.orderId);
  }

  _retryClicked() {
    this.props.requestMsDomains(this.orderId);
  }

  loadingStyles() {
    if (this.props.isFetching) {
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
            <span className="page__loading__text">درحال بارگذاری آدرس ها ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.error && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد...</IconText>
          <Button
            style={{ margin: '0 10px' }}
            theme="warning"
            onClick={this._retryClicked}>
            تلاش دوباره
          </Button>
      </div>
    );
  }

  render() {
    const { list, isFetching, error, status, router } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="آدرس‌های این سرویس"
        />

        <TableWithSorting
          columns={[
            {
              key: 'url',
              title: 'آدرس',
              template: row => (
                <span className="domains__row__url">
                  <Link to={`/domains/${row.url}/${row.domainId}/`}>{row.url}</Link>
                  <CopyBtn
                    className="domains__row__url__copy-btn"
                    text={row.url} />
                </span>
              ),
              sortBy: row => row.url
            },
            {
              key: 'createdAt',
              title: 'ساخته‌شده از',
              template: row => (
                <DateTime time={parseInt(row.domainCreated) * 1000} />
              ),
              sortBy: row => row.createdAt * -1
            },
            {
              key: 'expiresAt',
              title: 'انقضا',
              template: row => (
                <DateTime time={parseInt(row.domainExpire) * 1000} />
              ),
              sortBy: row => row.expiresAt * -1
            },
            {
              key: 'more',
              title: '',
              template: row => (
                <MoreBubble
                  bubbleItems={[
                    { title: 'نام‌سرور ها',  linkTo: `/domains/${row.url}/${row.domainId}/dns` },
                    { title: 'تمدید دامنه', linkTo: `/domains/${row.url}/${row.domainId}/renew` },
                    { title: 'انتقال دامنه', linkTo: `/domains/${row.url}/${row.domainId}/transfer` },
                    { separator: true },
                    { title: 'حذف دامنه', linkTo: `/domains/${row.url}/${row.domainId}/remove`, style: { color: '#d46307' } },
                  ]}
                  children="بیشتر"
                />
              )
            }
          ]}
          data={list}
          defaultSortBy="createdAt"
          defaultSortDirection="asc"
          sortFunction={Sort.numeric}
        />

        {this.renderError()}
        {this.renderLoading()}
      </div>
    );
  }
}

export default ServiceDomains;