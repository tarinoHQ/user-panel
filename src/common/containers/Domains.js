import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { Link } from 'react-router';
import Sort from '../utils/sort';
import { v4 } from 'node-uuid';
import moment from 'moment';

import * as uiSelectors from '../selectors/ui';
import * as domainsSelectors from '../selectors/domains';
import * as domainsActions from '../actions/domains';

import Table, { TableWithSorting } from '../components/Table';
import { Motion, spring, presets } from 'react-motion';
import ServiceItem from '../components/ServiceItem';
import MoreBubble from '../components/MoreBubble';
import DateTime from '../components/DateTime';
import Transition from 'react-motion-ui-pack';
import IconText from '../components/IconText';
import CopyBtn from '../components/CopyBtn';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

@connect(
  state => ({
    searchValue: uiSelectors.getDashboardSearchValue(state),
    domainsList: domainsSelectors.getList(state),
    isListFetching: domainsSelectors.isListFetching(state),
    getListStatus: domainsSelectors.getListStatus(state),
    getListError: domainsSelectors.getListError(state)
  }),
  {
    requestDomainsList: domainsActions.requestDomainsList
  }
)
class Domains extends Component {
  constructor(props) {
    super(props);

    this.retryClicked = this.retryClicked.bind(this);
  }

  componentWillMount() {
    this.props.requestDomainsList();
  }

  retryClicked() {
    this.props.requestDomainsList();
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

  render() {
    let { searchValue, domainsList, requestDomainsList, isListFetching, getListError } = this.props;

    return (
      <div>
        <TableWithSorting
          columns={[
            {
              key: 'url',
              title: 'آدرس',
              template: row => (
                <span className="domains__row__url">
                  <Link to={`/domains/${row.url}/${row.domain_id}/`}>{row.url}</Link>
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
                <DateTime time={parseInt(row.domain_created) * 1000} />
              ),
              sortBy: row => row.createdAt * -1
            },
            {
              key: 'expiresAt',
              title: 'انقضا',
              template: row => (
                <DateTime time={parseInt(row.domain_expire) * 1000} />
              ),
              sortBy: row => row.expiresAt * -1
            },
            {
              key: 'more',
              title: '',
              template: row => (
                <MoreBubble
                  bubbleItems={[
                    { title: 'نام‌سرور ها',  linkTo: `/domains/${row.url}/${row.domain_id}/dns` },
                    { title: 'تمدید دامنه', linkTo: `/domains/${row.url}/${row.domain_id}/renew` },
                    { title: 'انتقال دامنه', linkTo: `/domains/${row.url}/${row.domain_id}/transfer` },
                    { separator: true },
                    { title: 'حذف دامنه', linkTo: `/domains/${row.url}/${row.domain_id}/remove`, style: { color: '#d46307' } },
                  ]}
                  children="بیشتر"
                />
              )
            }
          ]}
          data={domainsList}
          filter={row => {
            return row.url.indexOf(this.props.searchValue) > -1;
          }}
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

export default Domains;
