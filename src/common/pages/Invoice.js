import { invoiceItemTypes, gatewayTypes, banks, fromWalletTypes, invoiceStates } from '../constants/Wallet';
import { toPersian, formatString } from '../utils/numberUtils';
import { readableCardNo } from '../utils/numberUtils';
import React, { Component, PropTypes } from 'react';
import { shamsiMonths } from '../data/calendar';
import { bankNumbers } from '../data/wallet';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getImage from '../data/images';
import moment from 'moment-jalaali';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/wallet';
import * as selectors from '../selectors/wallet';

import { Motion, spring, presets } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import SectionTitle from '../components/SectionTitle';
import InlineSelect from '../components/InlineSelect';
import RetinaImage from '../components/RetinaImage';
import CouponForm from '../containers/CouponForm';
import RichRadio from '../components/RichRadio';
import DateTime from '../components/DateTime';
import Checkbox from '../components/Checkbox';
import IconText from '../components/IconText';
import CopyBtn from '../components/CopyBtn';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Skewer from '../components/Skewer';
import Select from '../components/Select';
import Kebab from '../components/Kebab';
import Input from '../components/Input';
import Card from '../components/Card';
import Line from '../components/Line';
import Row from '../components/Row';
import Col from '../components/Col';

const itemTypes = {
  '': '-',
  [invoiceItemTypes.OTHER]: 'سایر خدمات',
  [invoiceItemTypes.DOMAIN]: 'دامنه',
  [invoiceItemTypes.HOST]: 'میزبانی وب',
  [invoiceItemTypes.THEME]: 'قالب',
  [invoiceItemTypes.CMS]: 'سیستم مدیریت'
};

const invoiceRecords = [
  {
    type: 'domain',
    description: 'تمدید دامنه platinum.com برای یک سال',
    price: 42000,
  },
  {
    type: 'host',
    description: 'میزبانی‌وب فوق حرفه‌ای - ۱۰ گیگ فضا - ۵۰ گیگ ترافیک ماهانه',
    price: 169000,
    off: 9000
  },
  {
    type: 'theme',
    description: 'قالب لمون تم فارسی و چیدمان فروشگاهی ساده',
    price: 86000,
  },
];

@connect(
  state => ({
    isInvoiceFetching: selectors.isInvoiceFetching(state),
    invoiceError: selectors.getInvoiceError(state),
    invoiceItems: selectors.getInvoiceItems(state),
    // -- Invoices List
    invoicesListById: selectors.getInvoicesListById(state),
  }),
  {
    setInvoiceGateway: actions.setInvoiceGateway,
    requestInvoice: actions.requestInvoice
  }
)
@withRouter
class Invoices extends Component {
  constructor(props) {
    super(props);

    this.invoiceId              = this.props.params.id;
    this._retryClicked          = this._retryClicked.bind(this);
    this._paymentMethodChanged  = this._paymentMethodChanged.bind(this);
  }

  componentDidMount() {
    this.props.requestInvoice(this.invoiceId);
  }

  _retryClicked() {
    this.props.requestInvoice(this.invoiceId);
  }

  _paymentMethodChanged({ id, type }) {
    this.props.setInvoiceGateway(this.invoiceId, id, type);
  }

  getStamp(status) {
    switch(status) {
      case invoiceStates.PAID:
        return getImage('paidCircularStamp');
      case invoiceStates.NOTPAID:
        return getImage('notPaidStamp');
      case invoiceStates.EXPIRED:
        return getImage('expiredStamp');
      default:
        return {};
    }
  }

  loadingStyles() {
    if (this.props.isInvoiceFetching) {
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
    return !!this.props.invoiceError && (
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
    const { isInvoiceFetching, invoiceError, invoiceItems, invoicesListById, requestInvoice, ...props } = this.props;
    const invoice = invoicesListById[this.invoiceId] || {};

    return (
      <div className="page">
        <div className="page__content invoice__wrapper">

          <Row className="invoice__header">
            <Col width={6} className="invoice__header__half">

              <div className="invoice__tarino">
                <Row>
                  <div className="invoice__tarino__logo">
                    <img src={getImage('logo_black').normal} />
                  </div>
                  <div className="invoice__tarino__details">
                    <div className="invoice__tarino__detail">
                      <span className="invoice__tarino__detail__label">تماس با تارینو</span>
                      ۰۲۱-۲۵۶۲۲
                    </div>
                    <div className="invoice__tarino__detail">
                      <span className="invoice__tarino__detail__label">ایمیل</span>
                      hi@tarino.ir
                    </div>
                  </div>
                </Row>

                <div className="invoice__tarino__title">سرویس میزبانی‌وب و راه‌اندازی سایت باکیفیت</div>

              </div>

            </Col>
            <Col width={6} className="invoice__header__half">
              <div className="invoice__number">
                <span className="invoice__number__label">فاکتور</span>
                {toPersian(this.invoiceId)}
              </div>

              <ul className="invoice__metas">
                <li className="invoice__meta">
                  <span className="invoice__meta__label">تاریخ صدور</span>
                  در {invoice.created ? moment(Number(invoice.created) * 1000).locale('fa').format('jYYYY/jM/jD') : '...'}
                </li>
                <li className="invoice__meta">
                  <span className="invoice__meta__label">سررسید</span>
                  در {invoice.expireDate ? moment(Number(invoice.expireDate) * 1000).locale('fa').format('jYYYY/jM/jD') : '...'}
                </li>
                <li className="invoice__meta">
                  <span className="invoice__meta__label">عنوان</span>
                  خرید محصول از تارینو
                </li>
              </ul>

              <div className="invoice__stamp">
                <RetinaImage src={this.getStamp(invoice.status)}/>
              </div>
            </Col>
          </Row>

          {this.renderLoading()}
          {this.renderError()}

          <TableWithSorting
            className="invoice__table"
            columns={[
              {
                key: 'type',
                title: 'نوع',
                template: row => (
                  <span
                    style={{
                      color: '#d28c15',
                      fontWeight: '600'
                    }}>
                    {itemTypes[row.type]}
                  </span>
                ),
                sortBy: row => row.type
              },
              {
                key: 'description',
                title: 'توضیحات',
                props: { className: 'invoice__description' },
                template: row => row.description,
                sortBy: row => row.description
              },
              {
                key: 'price',
                title: 'بها',
                props: row => ({ className: c('invoice__price', {
                  'invoice__price--has-discount': row.priceItem !== row.price && row.off
                }) }),
                template: row => {
                  const hasOff = row.priceItem !== row.price && row.off;
                  return (
                    <div>
                      <span className="invoice__price__amount">
                        {toPersian(row.priceItem, true)} تومان
                      </span>
                      {hasOff && <span className="invoice__discount">
                        <span className="invoice__discount__label">
                          <span className="icon-left-small" /> تخفیف:
                        </span>
                        <span className="invoice__discount__value">{toPersian(row.off, true)} تومان</span>
                      </span>}
                    </div>
                  );
                },
                sortBy: row => row.price
              },
              {
                key: 'total',
                title: 'مبلغ نهایی',
                props: { className: 'invoice__total-price' },
                template: row => toPersian(row.price, true) + ' تومان',
                sortBy: row => row.price
              },
            ]}
            data={invoiceItems}
          />

          <div className="invoice__total-row">
            <div className="invoice__total-row__subtotal">
              <div className="invoice__total-row__label">بهای کل</div>
              <div className="invoice__total-row__value">
                {invoice.totalPrice && toPersian(invoice.totalPrice, true)} تومان
              </div>
            </div>
            <div className="invoice__total-row__discount">
              <div className="invoice__total-row__label">- جمع تخفیف</div>
              <div className="invoice__total-row__value">
                {invoice.totalPrice && invoice.totalOffPrice &&
                  toPersian(parseInt(invoice.totalPrice) - parseInt(invoice.totalOffPrice), true)} تومان
              </div>
            </div>

            {invoice.status !== 'paid' && !invoice.offCode &&
              <div className="invoice__total-row__coupon">
                <div className="invoice__total-row__full">
                    <CouponForm invoiceId={this.invoiceId} />
                </div>
              </div>
            }

            {!!invoice.paidAmount &&
              <div className="invoice__total-row__paid">
                <div className="invoice__total-row__label">- پرداخت‌شده</div>
                <div className="invoice__total-row__value">
                  {toPersian(invoice.paidAmount, true)} تومان
                </div>
              </div>
            }

            <div className="invoice__total-row__total">
              <div className="invoice__total-row__label">مبلغ کل</div>
              <div className="invoice__total-row__value">
                {invoice.totalOffPrice && toPersian(invoice.totalOffPrice, true)} تومان
              </div>
            </div>
          </div>

          {invoice.status !== 'paid' &&
            <InvoicePaymentMethod
              invoice={invoice}
              invoiceId={this.invoiceId}
              selectedGateway={{
                id: invoice.gatewayId,
                type: invoice.gatewayType,
              }}
              onChange={this._paymentMethodChanged}
            />
          }

        </div>
      </div>
    );
  }
}

export default Invoices;

// ---
// PaymentMethods
@connect(
  state => ({
    // Credit
    creditAmount: selectors.getCreditAmount(state),
    // Gateway
    isGatewaysFetching: selectors.isGatewaysFetching(state),
    gatewaysError: selectors.getGatewaysError(state),
    gatewaysById: selectors.getGatewaysById(state),
    // --- Transfer Info
    TFCardNo: selectors.getTFCardNo(state),
    TFSerial: selectors.getTFSerial(state),
    TFDay: selectors.getTFDay(state),
    TFMonth: selectors.getTFMonth(state),
    TFYear: selectors.getTFYear(state),
    TFHour: selectors.getTFHour(state),
    TFMinute: selectors.getTFMinute(state),
    // --- Invoice Pay
    invoicePayFromWalletType: selectors.getInvoicePayFromWalletType(state),
    invoicePayFromWalletPrice: selectors.getInvoicePayFromWalletPrice(state),
  }),
  {
    requestGateways: actions.requestGateways,
    // --- Transfer Info
    setTFCardNo: actions.setTFCardNo,
    setTFSerial: actions.setTFSerial,
    setTFDay: actions.setTFDay,
    setTFMonth: actions.setTFMonth,
    setTFYear: actions.setTFYear,
    setTFHour: actions.setTFHour,
    setTFMinute: actions.setTFMinute,
    // --- Invoices List
    setInvoiceBank: actions.setInvoiceBank,
    // --- Invoice Pay
    setInvoicePayFromWalletType: actions.setInvoicePayFromWalletType,
    setInvoicePayFromWalletPrice: actions.setInvoicePayFromWalletPrice,
    requestInvoicePay: actions.requestInvoicePay,
  }
)
class InvoicePaymentMethod extends Component {
  constructor(p) {
    super(p);

    this._payClicked = this._payClicked.bind(this);
    this._walletTypeChanged = this._walletTypeChanged.bind(this);
    this._walletPriceChanged = this._walletPriceChanged.bind(this);
    this._bankChanged = this._bankChanged.bind(this);
  }

  static propTypes = {
    selectedGateway: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    invoice: PropTypes.object,
    invoiceId: PropTypes.string,
  }

  static defaultProps = {
    invoice: {
      bank: banks.MELLAT,
      totalOffPrice: 0,
    }
  }

  componentWillMount() {
    const { invoicePayFromWalletType, creditAmount, invoice } = this.props;
    const hasEnoughCredit = parseInt(creditAmount) > parseInt(invoice.totalOffPrice);

    if(!invoicePayFromWalletType) {
      this._walletTypeChanged(
        hasEnoughCredit ? fromWalletTypes.WHOLE : fromWalletTypes.PARTOF
      );
    }
  }

  componentDidMount() {
    this.props.requestGateways();
  }

  _payClicked() {
    this.props.requestInvoicePay(this.props.invoiceId);
  }

  _walletTypeChanged(v) {
    const { invoice } = this.props;
    this.props.setInvoicePayFromWalletType(v);
    if(v === fromWalletTypes.WHOLE) {
      this.props.setInvoicePayFromWalletPrice(invoice.totalOffPrice);
    }
  }

  _walletPriceChanged(e) {
    this.props.setInvoicePayFromWalletPrice(e.target.value);
  }

  _bankChanged(v) {
    this.props.setInvoiceBank(this.props.invoiceId, v);
  }

  isChecked(id, type) {
    const selected = this.props.selectedGateway;
    const idCond = id === null ? true : selected.id === id;
    const typeCond = type === null ? true : selected.type === type;
    return idCond && typeCond;
  }

  isDisabled(id) {
    const byId = this.props.gatewaysById;
    return byId[id] && byId[id].status !== 'enable';
  }

  paymentMethodTitle() {
    switch (this.props.selectedGateway.type) {
      case gatewayTypes.WALLET:
        return 'کیف پول';

      case gatewayTypes.ONLINE_GATEWAY:
        return 'پرداخت آنلاین';

      case gatewayTypes.PAY_TO_ACCOUNT:
        return 'واریز به حساب';

      case gatewayTypes.CART_TO_CART:
        return 'کارت به کارت';

      default:
        return '...';
    }
  }

  renderBankOptions() {
    const { invoice } = this.props;
    const { bank } = invoice;
    const isSelected = (v) => {
      return bank === v;
    };

    return (
      <div>
        <RichRadio
          style={{ marginBottom: 10 }}
          checked={isSelected(banks.MELLAT)}
          name="bank"
          value={banks.MELLAT}
          title="بانک ملت"
          icon={getImage('mellat-bank')}
          onChange={this._bankChanged}
        />
        <RichRadio
          style={{ marginBottom: 10 }}
          checked={isSelected(banks.PARSIAN)}
          name="bank"
          value={banks.PARSIAN}
          title="بانک پارسیان"
          icon={getImage('persian-bank')}
          onChange={this._bankChanged}
        />
        <RichRadio
          style={{ marginBottom: 10 }}
          checked={isSelected(banks.PASARGAD)}
          name="bank"
          value={banks.PASARGAD}
          title="پاسارگاد"
          icon={getImage('pasargad-bank')}
          onChange={this._bankChanged}
        />
      </div>
    );
  }

  // ---
  // Payment Method Contents
  renderWallet() {
    const { invoicePayFromWalletPrice, invoicePayFromWalletType, creditAmount, invoice } = this.props;
    const { totalOffPrice } = invoice;
    const hasEnoughCredit = () => parseInt(creditAmount) > parseInt(totalOffPrice);
    const hasAnyCredit = () => parseInt(creditAmount) > 0;
    const getCreditColor = () => {
      if (hasEnoughCredit()) {
        return 'success';
      } else if (hasAnyCredit()) {
        return 'warning';
      } else {
        return 'danger';
      }
    };

    return (
      <div>
        <h3>پرداخت از کیف‌پول</h3>

        {!hasAnyCredit() ?
          <p>شما مقدار کافی در کیف‌پول‌تان موجودی ندارید، از روش پرداخت اینترنتی استفاده کنید.</p>
          :
          <div>
            <Checkbox
              fullWidth={true}
              checked={invoicePayFromWalletType === fromWalletTypes.WHOLE}
              disabled={!hasEnoughCredit()}
              type="radio"
              onChange={() => this._walletTypeChanged(fromWalletTypes.WHOLE)}>
              تمام مبلغ را از کیف پول کسر کن.
            </Checkbox>
            <Checkbox
              fullWidth={true}
              checked={invoicePayFromWalletType === fromWalletTypes.PARTOF}
              disabled={!hasAnyCredit()}
              type="radio"
              onChange={() => this._walletTypeChanged(fromWalletTypes.PARTOF)}>
              میخواهم فقط بخشی را از کیف‌پول پرداخت کنم.
            </Checkbox>
            <Skewer style={{ paddingRight: 20 }}>
              <Kebab smallFullWidth width={4}>
                <Input
                  style={{ maxWidth: 250 }}
                  disabled={invoicePayFromWalletType === fromWalletTypes.WHOLE}
                  label="چقدر از کیف‌پولتان کسر شود؟"
                  value={formatString(invoicePayFromWalletPrice)}
                  onChange={this._walletPriceChanged} />
              </Kebab>
              <Kebab smallFullWidth width={8} style={{ verticalAlign: 'bottom' }}>
                <IconText
                  style={{ display: 'inline-block', paddingBottom: 15 }}
                  color={getCreditColor()}
                  iconClass="icon-credit-card">
                  موجودی فعلی: {toPersian(creditAmount, true)} تومان
                </IconText>
              </Kebab>
            </Skewer>
          </div>
        }
      </div>
    );
  }

  renderOnlineGateway() {
    const { onChange } = this.props;

    return (
      <div>
        <h3>پرداخت از درگاه اینترنتی امن</h3>
        <RichRadio
          checked={this.isChecked('3', gatewayTypes.ONLINE_GATEWAY)}
          disabled={this.isDisabled('3', gatewayTypes.ONLINE_GATEWAY)}
          inline={true}
          name="online-gateway"
          value="mellat"
          title="درگاه ملت"
          icon={getImage('mellat-bank')}
          onChange={v => onChange({id: '3', type: gatewayTypes.ONLINE_GATEWAY})}
        />

        <RichRadio
          checked={this.isChecked('4', gatewayTypes.ONLINE_GATEWAY)}
          disabled={this.isDisabled('4', gatewayTypes.ONLINE_GATEWAY)}
          inline={true}
          disabled={false}
          name="online-gateway"
          value="pasargad"
          title="درگاه پاسارگاد"
          icon={getImage('pasargad-bank')}
          onChange={v => onChange({id: '4', type: gatewayTypes.ONLINE_GATEWAY})}
        />

        <RichRadio
          checked={this.isChecked('5', gatewayTypes.ONLINE_GATEWAY)}
          disabled={this.isDisabled('5', gatewayTypes.ONLINE_GATEWAY)}
          inline={true}
          disabled={true}
          name="online-gateway"
          value="parsian"
          title="درگاه پارسیان"
          icon={getImage('persian-bank')}
          onChange={v => onChange({id: '5', type: gatewayTypes.ONLINE_GATEWAY})}
        />

      </div>
    );
  }

  renderPayToAccount() {
    const {
      invoice,
      TFCardNo,
      TFSerial,
      TFDay,
      TFMonth,
      TFYear,
      TFHour,
      TFMinute,
      setTFCardNo,
      setTFSerial,
      setTFDay,
      setTFMonth,
      setTFYear,
      setTFHour,
      setTFMinute,
    } = this.props;

    return (
      <div>
        <h3>واریز به حساب</h3>
        <p>مبلغ فاکتور را تا حداکثر ۲۴ ساعت دیگر به حساب تارینو واریز کرده و اطلاعات آن را اینجا وارد کنید.</p>
        <Row>
          <Col smallFullWidth width={4}>
            {this.renderBankOptions()}
          </Col>
          <Col smallFullWidth width={8}>

            <div className="invoice__bank">
              <div className="invoice__bank__card">
                <RetinaImage
                  className="invoice__bank__img invoice__bank__img--account"
                  src={[
                    getImage(`${invoice.bank}Plain`).normal,
                    getImage(`${invoice.bank}Plain`).retina
                  ]}
                />
              </div>

              <div className="invoice__bank__number">
                <span className="invoice__bank__number__num">
                  {bankNumbers[invoice.bank].accountNo}
                </span>
                <CopyBtn
                  text={bankNumbers[invoice.bank].accountNo}
                  title={`کپی کردن شماره‌حساب`}
                />
              </div>
            </div>

            <TransferInfo
              className="invoice__transfer-info"
              cardNo={false}
              serial={TFSerial}
              year={moment().format('jYYYY')}
              month={TFMonth}
              day={TFDay}
              hour={TFHour}
              minute={TFMinute}
              onCardNoChange={setTFCardNo}
              onSerialChange={setTFSerial}
              onDayChange={setTFDay}
              onMonthChange={setTFMonth}
              onYearChange={setTFYear}
              onHourChange={setTFHour}
              onMinuteChange={setTFMinute}
            />

          </Col>
        </Row>
      </div>
    );
  }

  renderCartToCart() {
    const {
      invoice,
      invoiceId,
      TFCardNo,
      TFSerial,
      TFDay,
      TFMonth,
      TFYear,
      TFHour,
      TFMinute,
      setTFCardNo,
      setTFSerial,
      setTFDay,
      setTFMonth,
      setTFYear,
      setTFHour,
      setTFMinute,
    } = this.props;

    return (
      <div>
        <h3>کارت به کارت</h3>
        <p>مبلغ فاکتور را تا حداکثر ۲۴ ساعت دیگر به حساب تارینو واریز کرده و اطلاعات آن را اینجا وارد کنید.</p>
        <Row>
          <Col smallFullWidth width={4}>
            {this.renderBankOptions()}
          </Col>
          <Col smallFullWidth width={8}>

            <div className="invoice__bank">
              <div className="invoice__bank__card">
                <RetinaImage
                  className="invoice__bank__img invoice__bank__img--cart"
                  src={[
                    getImage(`${invoice.bank}Card`).normal,
                    getImage(`${invoice.bank}Card`).retina
                  ]}
                />
              </div>

              <div className="invoice__bank__number">
                <span className="invoice__bank__number__num">
                  {readableCardNo(bankNumbers[invoice.bank].cardNo)}
                </span>
                <CopyBtn
                  text={bankNumbers[invoice.bank].cardNo}
                  title={`کپی کردن شماره‌کارت`}
                />
              </div>
            </div>

            <TransferInfo
              className="invoice__transfer-info"
              cardNo={TFCardNo}
              serial={TFSerial}
              year={moment().format('jYYYY')}
              month={TFMonth}
              day={TFDay}
              hour={TFHour}
              minute={TFMinute}
              onCardNoChange={setTFCardNo}
              onSerialChange={setTFSerial}
              onDayChange={setTFDay}
              onMonthChange={setTFMonth}
              onYearChange={setTFYear}
              onHourChange={setTFHour}
              onMinuteChange={setTFMinute}
            />

          </Col>
        </Row>
      </div>
    );
  }

  renderSomeFromWallet() {
    return (
      <Card>
        <Checkbox>
          می‌خواهم بخشی از هزینه را از کیف‌پول پرداخت کنم.
        </Checkbox>
        <Skewer style={{ paddingRight: 20 }}>
          <Kebab smallFullWidth width={4}>
            <Input
              style={{ maxWidth: 250 }}
              label="چقدر از کیف‌پولتان کسر شود؟"
              value="0" />
          </Kebab>
          <Kebab smallFullWidth width={8} style={{ verticalAlign: 'bottom' }}>
            <span style={{ display: 'inline-block', paddingBottom: 15 }}>موجودی فعلی: ۱۳،۴۰۰</span>
          </Kebab>
        </Skewer>
      </Card>
    );
  }

  renderMethod() {
    switch (this.props.selectedGateway.type) {
      case gatewayTypes.WALLET:
        return this.renderWallet();

      case gatewayTypes.ONLINE_GATEWAY:
        return this.renderOnlineGateway();

      case gatewayTypes.PAY_TO_ACCOUNT:
        return this.renderPayToAccount();

      case gatewayTypes.CART_TO_CART:
        return this.renderCartToCart();

      default:
        return <p>یک روش پرداخت انتخاب کنید.</p>;
    }
  }

  render() {
    const { isGatewaysFetching, gatewaysError, gatewaysById, requestGateways, selectedGateway, requestInvoicePay, onChange } = this.props;

    return (
      <div className="invoice__payment-method">

        <SectionTitle
          title="روش های پرداخت"
        />

        <RichRadio
          checked={this.isChecked(null, gatewayTypes.WALLET)}
          inline={true}
          name="payment-method"
          value="wallet"
          title="از کیف‌پول"
          icon={getImage(gatewayTypes.WALLET)}
          onChange={v => onChange({id: null, type: v})}
        />

        <RichRadio
          checked={this.isChecked(null, gatewayTypes.ONLINE_GATEWAY)}
          inline={true}
          name="payment-method"
          value="onlineGateway"
          title="درگاه پرداخت اینترنتی"
          icon={getImage('credit-card')}
          onChange={v => onChange({id: '3', type: v})}
        />

        <RichRadio
          checked={this.isChecked('1', gatewayTypes.PAY_TO_ACCOUNT)}
          disabled={this.isDisabled('1', gatewayTypes.PAY_TO_ACCOUNT)}
          inline={true}
          name="payment-method"
          value="payToAccount"
          title="واریز به حساب"
          icon={getImage('safebox')}
          onChange={v => onChange({id: '1', type: v})}
        />

        <RichRadio
          checked={this.isChecked('2', gatewayTypes.CART_TO_CART)}
          disabled={this.isDisabled('2', gatewayTypes.CART_TO_CART)}
          inline={true}
          name="payment-method"
          value="cartToCart"
          title="کارت به کارت"
          icon={getImage('cartToCart')}
          onChange={v => onChange({id: '2', type: v})}
        />

        <div className="invoice__payment-method__content">

          <Card>{this.renderMethod()}</Card>

          <div style={{ marginTop: 25 }}>
            <Button
              theme="success"
              iconClass="icon-credit-card"
              onClick={this._payClicked}>
              ثبت و پرداخت فاکتور
              &nbsp;<span style={{ opacity: '0.8' }}>به روش {this.paymentMethodTitle()}</span>
            </Button>
          </div>

        </div>
      </div>
    );
  }
}

class TransferInfo extends Component {

  static propTypes = {
    cardNo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    serial: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    hour: PropTypes.string,
    minute: PropTypes.string,
    onCardNoChange: PropTypes.func,
    onSerialChange: PropTypes.func,
    onPriceChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onMonthChange: PropTypes.func,
    onDayChange: PropTypes.func,
    onHourChange: PropTypes.func,
    onMinuteChange: PropTypes.func,
  };

  static defaultProps = {
    onCardNoChange: () => {},
    onSerialChange: () => {},
    onYearChange: () => {},
    onMonthChange: () => {},
    onDayChange: () => {},
    onHourChange: () => {},
    onMinuteChange: () => {},
  }

  render() {
    const {
      cardNo,
      serial,
      year,
      month,
      day,
      hour,
      minute,
      onCardNoChange,
      onSerialChange,
      onYearChange,
      onMonthChange,
      onDayChange,
      onHourChange,
      onMinuteChange,
      ...props
    } = this.props;

    return (
      <div {...props}>
        <Row>
          <Col smallFullWidth mediumFullWidth width={6}>
            <Input
              style={{ maxWidth: '100%' }}
              label="شماره پیگیری"
              value={serial}
              onChange={e => onSerialChange(e.target.value)}
            />
          </Col>
          <Col smallFullWidth mediumFullWidth width={6} gutterPosition="right">
            {!!cardNo === false ||
              <Input
                style={{ maxWidth: '100%' }}
                label="چهاررقم پایانی شماره‌کارت"
                value={cardNo}
                onChange={e => onCardNoChange(e.target.value)}
              />
            }&nbsp;
          </Col>
        </Row>

        <Row>
          <Col smallFullWidth mediumFullWidth width={6}>
            <Skewer>
              <Kebab width={3}>
                <Input
                  style={{ maxWidth: '100%' }}
                  label="روز"
                  placeholder="01"
                  value={day}
                  onChange={e => onDayChange(e.target.value)}
                />
              </Kebab>
              <Kebab width={6}>
                <Select
                  style={{ maxWidth: '100%' }}
                  label="ماه"
                  placeholder="انتخاب کنید"
                  clearable={false}
                  options={map([1,2,3,4,5,6,7,8,9,10,11,12], n => ({
                    value: n + '',
                    label: shamsiMonths[n],
                  }))}
                  value={month}
                  onChange={v => onMonthChange(v.value)}
                />
              </Kebab>
              <Kebab width={3} gutter="0">
                <Input
                  style={{ maxWidth: '100%' }}
                  disabled={true}
                  label="سال"
                  value={year}
                  onChange={e => onYearChange(e.target.value)}
                />
              </Kebab>
            </Skewer>
          </Col>
          <Col smallFullWidth mediumFullWidth width={6} gutterPosition="right">
            <Skewer>
              <Kebab width={6}>
                <Input
                  style={{ maxWidth: '100%' }}
                  label="دقیقه"
                  value={hour}
                  onChange={e => onHourChange(e.target.value)}
                />
              </Kebab>
              <Kebab
                width={1}
                verticalAlign="bottom"
                style={{ paddingBottom: 10, fontSize: '20px'}}>
                :
              </Kebab>
              <Kebab width={5} gutter="0">
                <Input
                  style={{ maxWidth: '100%' }}
                  label="ساعت"
                  value={minute}
                  onChange={e => onMinuteChange(e.target.value)}
                />
              </Kebab>
            </Skewer>
          </Col>
        </Row>
      </div>
    );
  }
}
