import React, { Component, PropTypes } from 'react';
import { domainTypes } from '../constants/Orders';
import { connect } from 'react-redux';

import * as domainsSelectors from '../selectors/domains';
import * as domainsActions from '../actions/domains';

import NewDomain from './NewDomain';
import Collapse from 'react-collapse';
import HelpBtn from '../components/HelpBtn';
import FlatBox from '../components/FlatBox';
import Select from '../components/Select';
import Input from '../components/Input';

@connect(
  state => ({
    domainsList: domainsSelectors.getList(state),
    // ajax
    isListFetching: domainsSelectors.isListFetching(state),
    getListStatus: domainsSelectors.getListStatus(state),
    getListError: domainsSelectors.getListError(state)
  }),
  {
    requestDomainsList: domainsActions.requestDomainsList
  }
)
class DomainChooser extends Component {
  constructor(p) {
    super(p);
    this._optionSelected = this._optionSelected.bind(this);
    this._addressChanged = this._addressChanged.bind(this);
    this._selectChanged  = this._selectChanged.bind(this);
  }

  static propTypes = {
    address: PropTypes.string,
    type: PropTypes.string,
    onAddressChange: PropTypes.func,
    onTypeChange: PropTypes.func,
  };

  static defaultProps = {
    address: '',
    type: '',
    onAddressChange: () => {},
    onTypeChange: () => {},
  };
  
  componentDidMount() {
    this.props.requestDomainsList();
  }

  _optionSelected(e) {
    this.props.onTypeChange(e.target.value);
  }

  _addressChanged(e) {
    this.props.onAddressChange(e.target.value);
  }

  _selectChanged(v) {
    this.props.onAddressChange(v);
  }

  isOptionChecked(v) {
    return this.props.type === v;
  }

  render() {
    const { domainsList, isListFetching, getListStatus, getListError, requestDomainsList, onTypeChange, onAddressChange, address, type, ...props } = this.props;

    return (
      <div {...props} className="domain-ch">

        <Option
          value={domainTypes.MY_DOMAINS}
          onChange={this._optionSelected}
          checked={this.isOptionChecked(domainTypes.MY_DOMAINS)}>
          انتخاب از آدرس‌هایتان در تارینو
          <HelpBtn
            href="#"
            className="hint--left hint--info"
            aria-label="دامنه‌هایی که قبلا در تارینو خریده‌اید" />
        </Option>

        <Collapse isOpened={this.isOptionChecked(domainTypes.MY_DOMAINS)}>
          <div className="domain-ch__box">
            <Select 
              wrapperProps={{ style: { maxWidth: 350 } }}
              label="یکی از دامنه‌هایتان را انتخاب کنید"
              placeholder="انتخاب کنید ..."
              options={[
                {
                  value: 'example.com',
                  label: 'example.com',
                }
              ]}
              onChange={this._selectChanged}
              value={address}
            />
          </div>
        </Collapse>

        <Option
          value={domainTypes.OWN}
          onChange={this._optionSelected}
          checked={this.isOptionChecked(domainTypes.OWN)}>
          اتصال به دامنه خریداری‌شده از سایر شرکت‌ها
          <HelpBtn 
            href="#" 
            className="hint--left hint--info hint--medium" 
            aria-label="اگر قبلاً دامنه‌ای از شرکتی غیر از تارینو خریده‌اید، میتوانید آن‌را به سرویستان متصل کنید." />
        </Option>

        <Collapse isOpened={this.isOptionChecked(domainTypes.OWN)}>
          <div className="domain-ch__box">
            <FlatBox theme="info">
              لازم است برای اتصال دامنه به سرویس‌تان در تارینو، نام‌سرورهای (DNS) دامنه خود را طبق ایمیلی که برایتان ارسال خواهد شد تغییر دهید.
            </FlatBox>
            <Input 
              textboxLtr={true}
              style={{ maxWidth: 350 }}
              label="آدرس دامنه‌تان را دقیق وارد کنید"
              placeholder="example.com"
              prefix="www."
              onChange={this._addressChanged}
              value={address}
            />
          </div>
        </Collapse>

        <Option
          value={domainTypes.NEW}
          onChange={this._optionSelected}
          checked={this.isOptionChecked(domainTypes.NEW)}>
          خرید آدرس جدید یا دامنه رایگان .tarino.net
        </Option>

        <Collapse isOpened={this.isOptionChecked(domainTypes.NEW)}>
          <div className="domain-ch__box">
            <NewDomain noPayButton parentPath="/new/service" />
          </div>
        </Collapse>

      </div>
    );
  }
}

export default DomainChooser;

class Option extends Component {
  render() {
    const { children, value, checked, onChange, ...props } = this.props;

    return (
      <div {...props} className="domain-ch__option">
        <label>
          <input 
            checked={checked}
            className="domain-ch__option__radio"
            type="radio"
            name="domain-select-options"
            value={value} 
            onChange={onChange}
          />
          {children}
        </label>
      </div>
    );
  }
}
