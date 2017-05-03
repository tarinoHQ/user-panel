import React, { Component, PropTypes } from 'react';
import { ticketStates } from '../constants/Support';
import { toPersian } from '../utils/numberUtils';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import Sort from '../utils/sort';
import { v4 } from 'node-uuid';

import * as actions from '../actions/support';
import * as uiSelectors from '../selectors/ui';
import * as selectors from '../selectors/support';

import Table, { TableWithSorting } from '../components/Table';
import { Motion, spring, presets } from 'react-motion';
import DateTime from '../components/DateTime';
import IconText from '../components/IconText';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { Link } from 'react-router';

@connect(
  state => ({
    searchValue: uiSelectors.getSupportSearchValue(state),
    isFetching: selectors.isTicketsFetching(state),
    getError: selectors.getTicketsError(state),
    getTickets: selectors.getTickets(state),
  }),
  {
    requestTickets: actions.requestTickets,
  }
)
class SupportThreads extends Component {
  constructor(props) {
    super(props);

    this.retryClicked = this.retryClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestTickets();
  }

  retryClicked() {
    this.props.requestTickets();
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
            <span className="page__loading__text">درحال بارگذاری موارد ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.getError && (
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
    const { searchValue, isFetching, getError, getTickets, requestTickets } = this.props;

    return (
      <div>
        <TableWithSorting
          columns={[
            {
              key: 'details',
              title: 'درخواست',
              template: row => (
                <div>
                  <div className="ticket__details">
                    <div className="ticket__detail">
                      <span className="ticket__detail__key">کد</span>
                      {toPersian(row.ticket_id)}
                    </div>
                    <div className="ticket__detail">
                      <span className="ticket__detail__key">محصول</span>
                      {row.order.name}
                    </div>
                  </div>
                  <Link
                    to={`/support/threads/${row.ticket_id}`}
                    className="ticket__title">
                    {row.title}
                  </Link>
                </div>
              ),
              sortBy: row => row.title
            },
            {
              key: 'status',
              title: 'وضعیت',
              template: row => {
                switch (row.status) {
                  case ticketStates.PENDING:
                    return (
                      <span
                        className="ticket__status ticket__status--pending hint--top hint--large"
                        aria-label="متاسفیم که هنوز پاسخ خود را دریافت نکرده‌اید، بزودی به درخواست شما رسیدگی می‌کنیم.">
                        در صف مشاهده
                      </span>
                    );

                  case ticketStates.INPROGRESS:
                    return (<span className="ticket__status ticket__status--inprogress">در حال رسیدگی</span>);

                  case ticketStates.ANSWERED:
                    return (<span className="ticket__status ticket__status--answered">پاسخ داده شد!</span>);

                  case ticketStates.CLOSED:
                    return (<span className="ticket__status ticket__status--closed">بسته شده</span>);

                  default:
                    return <span>--</span>;
                }
              },
              sortBy: row => row.status
            },
            {
              key: 'created',
              title: 'ارسال‌شده از',
              template: row => (
                <DateTime time={row.created * 1000} />
              ),
              sortBy: row => row.created * -1
            }
          ]}
          data={getTickets}
          filter={row => {
            return row.title.indexOf(this.props.searchValue) > -1;
          }}
          defaultSortBy="created"
          defaultSortDirection="asc"
          sortFunction={Sort.numeric}
        />

        {this.renderError()}
        {this.renderLoading()}

      </div>
    );
  }
}

export default SupportThreads;
