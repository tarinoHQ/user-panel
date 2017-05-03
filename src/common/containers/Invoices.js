import React, { Component, PropTypes } from 'react';
import { invoiceStates } from '../constants/Wallet';
import { toPersian } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';

import * as actions from '../actions/wallet';
import * as selectors from '../selectors/wallet';

import { Motion, spring, presets } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

const statusTexts = {
  [invoiceStates.PAID]    : 'پرداخت شده',
  [invoiceStates.NOTPAID] : 'در انتظار پرداخت',
  [invoiceStates.EXPIRED] : 'منقضی شده'
};

@connect(
  state => ({
    isInvoicesListFetching: selectors.isInvoicesListFetching(state),
    invoicesListError: selectors.getInvoicesListError(state),
    invoicesListStatus: selectors.getInvoicesListStatus(state),
    invoicesList: selectors.getInvoicesList(state),
  }),
  {
    requestInvoicesList: actions.requestInvoicesList
  }
)
@withRouter
class Invoices extends Component {
  constructor(props) {
    super(props);

    this._retryClicked = this._retryClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestInvoicesList();
  }

  _retryClicked() {
    this.props.requestInvoicesList();
  }

  loadingStyles() {
    if (this.props.isInvoicesListFetching) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: 0,
        scale: 0,
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
    return !!this.props.invoicesListError && (
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
    const { invoicesList, isInvoicesListFetching, invoicesListError, invoicesListStatus, router, ...props } = this.props;

    return (
      <div>
        <TableWithSorting
          columns={[
            {
              key: 'invoiceId',
              title: 'شناسه فاکتور',
              template: row => toPersian(row.invoiceId),
              sortBy: row => row.invoiceId
            },
            {
              key: 'amount',
              title: 'مبلغ (تومان)',
              template: row => toPersian(row.totalOffPrice, true) + ' تومان',
              sortBy: row => row.totalOffPrice
            },
            {
              key: 'datePaid',
              title: 'پرداخت‌شده در',
              template: row => (
                row.status === invoiceStates.PAID ?
                  <DateTime time={parseInt(row.datePaid) * 1000} /> :
                  <span>--</span>
              ),
              sortBy: row => row.datePaid * -1
            },
            {
              key: 'expireDate',
              title: 'سررسید',
              template: row => (
                <DateTime time={parseInt(row.expireDate) * 1000} />
              ),
              sortBy: row => row.expireDate * -1
            },
            {
              key: 'status',
              title: 'وضعیت',
              template: row => statusTexts[row.status],
              sortBy: row => row.status
            },
            {
              key: 'buttons',
              title: '',
              template: row => {
                switch(row.status) {
                  case invoiceStates.NOTPAID:
                    return (
                      <Button
                        theme="success"
                        onClick={() => router.push('/invoices/' + row.invoiceId)}>
                        پرداخت
                      </Button>
                    );

                  case invoiceStates.PAID:
                    return (
                      <Button
                        noBg={true}
                        theme="info"
                        onClick={() => router.push('/invoices/' + row.invoiceId)}>
                        مشاهده
                      </Button>
                    );

                  default:
                    return <Button noBg={true} theme="info">مشاهده</Button>;
                }
              }
            },
          ]}
          data={invoicesList}
          rowsProps={row => {
            return {
              className: c({
                ['invoices__row--' + row.status]: row.status
              })
            };
          }}
          defaultSortBy="created"
          defaultSortDirection="asc"
        />

        {this.renderError()}
        {this.renderLoading()}

        {invoicesList.length === 0 && invoicesListStatus === 1 && 
          <IconText style={{ marginTop: 20, textAlign: 'center' }} color="info" iconClass="icon-dollar">هنوز چیزی از تارینو خریداری نکرده‌اید! با افزودن اعتبار به کیف‌پول شروع کنید.</IconText>  
        }

      </div>
    );
  }
}

export default Invoices;
