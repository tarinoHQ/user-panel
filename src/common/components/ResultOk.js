import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import getImage from '../data/images';

import RetinaImage from '../components/RetinaImage';
import Button from '../components/Button';

const types = {
  SERVICE: 'service',
  DOMAIN: 'domain',
}

@withRouter
class ResultOk extends Component {
  constructor(props) {
    super(props);
    this.setData(props);
    this._showListClicked    = this._showListClicked.bind(this);
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

  _showListClicked() {
    const { router } = this.props;

    if (this.type === types.DOMAIN) {
      router.push('/domains');
    } else {
      router.push('/services');
    }
  }

  _showInvoiceClicked() {
    const { router } = this.props;
    router.push(`/invoices/${this.invoiceId}`);
  }

  get buttonText() {
    return this.type === types.DOMAIN 
      ? 'لیست آدرس‌ها' 
      : 'لیست سرویس‌ها'
      ;
  }

  render() {
    const { router } = this.props;

    return (
      <div className="result result--ok">
        <RetinaImage
          className="result__image"
          src={getImage('achievement')} />
        <h2 className="result__title">پرداخت بی‌نقص انجام شد.</h2>
        <p className="result__message">
          برای مشاهده سرویس خریداری شده به لیست سرویس‌ها بروید و وضعیت آن را مشاهده کنید.
        </p>
        <div className="result__actions">
          <Button
            className="result__cta"
            onClick={this._showListClicked}
            theme="success">
            {this.buttonText}
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

export default ResultOk;
