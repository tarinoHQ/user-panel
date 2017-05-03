import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import getImage from '../data/images';

import RetinaImage from '../components/RetinaImage';
import Button from '../components/Button';

@withRouter
class ResultError extends Component {
  constructor(props) {
    super(props);
    this.setData(props);
    this._ticketClicked      = this._ticketClicked.bind(this);
    this._showInvoiceClicked = this._showInvoiceClicked.bind(this);
  }

  componentDidUpdate(nextProps) {
    this.setData(nextProps);
  }
  
  setData({ location }) {
    this.invoiceId = location.query.invoice_id;
    this.type      = location.query.type;
    this.msg       = '';
  }

  _showInvoiceClicked() {
    const { router } = this.props;
    router.push(`/invoices/${this.invoiceId}`);
  }

  _ticketClicked() {
    const { router } = this.props;
    router.push('/support/new');
  }

  render() {
    return (
      <div className="result result--error">
        <RetinaImage
          className="result__image"
          src={getImage('sad')} />
        <h2 className="result__title">مشکلی در پرداخت به‌وجود آمد.</h2>
        <p className="result__message">
          برای مشاهده سرویس خریداری شده به لیست سرویس‌ها بروید و وضعیت آن را مشاهده کنید.
        </p>
        <div className="result__actions">
          <Button
            className="result__cta"
            onClick={this._ticketClicked}
            theme="success">
            ارسال درخواست به پشتیبانی
          </Button>
          <Button
            noBg={true}
            className="result__cta"
            onClick={this._showInvoiceClicked}
            theme="info">
            بازبینی فاکتور
          </Button>
        </div>
      </div>
    );
  }
}

export default ResultError;
