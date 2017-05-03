import { onlineGateways, gatewayTypes } from '../constants/Wallet';
import React, { Component, PropTypes } from 'react';
import { formatString } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import last from 'lodash/last';

import * as actions from '../actions/wallet';
import * as selectors from '../selectors/wallet';

import SectionTitle from '../components/SectionTitle';
import SwitchTab from '../components/SwitchTab';
import IconText from '../components/IconText';
import TabBar from '../components/TabBar';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Card from '../components/Card';
import Row from '../components/Row';
import Col from '../components/Col';

@withRouter
class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  activeTab() {
    const { routes } = this.props;
    return last(routes).path;
  }

  render() {
    const { router, children, ...props } = this.props;

    return (
      <div>

        <AddCredit />

        <TabBar
          tabs={[
            { key: 'invoices', title: 'فاکتور‌ ها',
              onClick: () => router.push('/account/wallet/invoices')},
            // { key: 'payments', title: 'گردش مالی',
            //   onClick: () => router.push('/account/wallet/payments')},
          ]}
          activeTab={this.activeTab()}
        />

        <div style={{ marginTop: 15 }}>
          {children}
        </div>
      </div>
    );
  }
}

export default Wallet;

// --- Add Credit
@connect(
  state => ({
    gatewaysById: selectors.getGatewaysById(state),
    // --- Add To Wallet
    addToWalletAmount: selectors.getAddToWalletAmount(state),
    addToWalletGateway: selectors.getAddToWalletGateway(state),
    isAddToWalletSending: selectors.isAddToWalletSending(state),
    addToWalletError: selectors.getAddToWalletError(state),
  }),
  {
    requestGateways: actions.requestGateways,
    // --- Add To Wallet
    setAddToWalletAmount: actions.setAddToWalletAmount,
    setAddToWalletGateway: actions.setAddToWalletGateway,
    requestAddToWallet: actions.requestAddToWallet,
  }
)
class AddCredit extends Component {
  constructor(props) {
    super(props);

    this._priceChanged   = this._priceChanged.bind(this);
    this._gatewayChanged = this._gatewayChanged.bind(this);
    this._payClicked     = this._payClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestGateways();
  }

  isDisabled(gatewayId) {
    return (this.props.gatewaysById[gatewayId] || {}).status === 'disable';
  }

  getPayBtnText() {
    const { addToWalletGateway } = this.props;
    if( !addToWalletGateway ||
        addToWalletGateway === onlineGateways.MELLAT ||
        addToWalletGateway === onlineGateways.PASARGAD ||
        addToWalletGateway === onlineGateways.PARSIAN) {
      return 'پرداخت';
    } else {
      return 'مشاهده فاکتور';
    }
  }

  _priceChanged(e) {
    this.props.setAddToWalletAmount(e.target.value);
  }

  _gatewayChanged(v) {
    this.props.setAddToWalletGateway(v.value);
  }

  _payClicked() {
    this.props.requestAddToWallet();
  }

  render() {
    const { gatewaysById, addToWalletAmount, addToWalletGateway, isAddToWalletSending, addToWalletError } = this.props;

    return (
      <Card
        style={{ marginBottom: 20 }}>

        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="افزودن اعتبار"
        />

        <div style={{ fontSize: 14, letterSpacing: '-.2px', marginTop: 10 }}>
          مبلغ را به تومان وارد کنید
        </div>

        <Row>
          <Input
            style={{ float: 'right', marginLeft: 10 }}
            placeholder="مثال:‌ 1000"
            suffix="تومان"
            value={formatString(addToWalletAmount)}
            onChange={this._priceChanged}
          />

          <Select
            wrapperProps={{ style: { float: 'right', marginLeft: 10 } }}
            placeholder="روش پرداخت را انتخاب کنید"
            name="gateway"
            options={[
              {
                value: onlineGateways.MELLAT,
                label: ' درگاه پرداخت ملت',
                disabled: this.isDisabled('3'),
              },
              {
                value: onlineGateways.PASARGAD,
                label: 'درگاه پرداخت پاسارگاد',
                disabled: this.isDisabled('4'),
              },
              {
                value: onlineGateways.PARSIAN,
                label: 'درگاه پرداخت پارسیان',
                disabled: this.isDisabled('5'),
              },
              {
                value: gatewayTypes.CART_TO_CART,
                label: 'کارت به کارت'
              },
              {
                value: gatewayTypes.PAY_TO_ACCOUNT,
                label: 'واریز به حساب'
              },
            ]}
            value={addToWalletGateway}
            onChange={this._gatewayChanged}
          />

          <Button
            style={{ float: 'right', margin: '3px 0 0 0' }}
            loading={isAddToWalletSending}
            theme="success"
            iconClass="icon-credit-card-alt"
            onClick={this._payClicked}>
            &nbsp;{this.getPayBtnText()}
          </Button>

        </Row>

        {!!addToWalletError &&
          <IconText
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به‌وجود آمد. ورودی خود را بررسی و دوباره تلاش کنید.
          </IconText>
        }

      </Card>
    );
  }
}
