import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import * as actions from '../actions/settings';
import * as selectors from '../selectors/settings';

import SectionTitle from '../components/SectionTitle';
import Checklist from '../components/Checklist';
import Checkbox from '../components/Checkbox';
import IconText from '../components/IconText';
import Spinner from '../components/Spinner';
import Select from '../components/Select';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Line from '../components/Line';
import Row from '../components/Row';
import Col from '../components/Col';

@connect(
  state => ({
    notices: selectors.getSeNotices(state),
    isSettingsFetching: selectors.isSettingsFetching(state),
    settingsError: selectors.getSettingsError(state),
    // ---
    mobile: selectors.getSeMobile(state),
    // ---
    automation: selectors.getSeAutomation(state),
    isUpdateSettingsSending: selectors.isUpdateSettingsSending(state),
    updateSettingsError: selectors.getUpdateSettingsError(state),
    updateSettingsStatus: selectors.getUpdateSettingsStatus(state),
  }),
  {
    toggleSeNoticeEmail: actions.toggleSeNoticeEmail,
    toggleSeNoticeSms: actions.toggleSeNoticeSms,
    setSeMobile: actions.setSeMobile,
    toggleSeAutomation: actions.toggleSeAutomation,
    // ---
    requestSettings: actions.requestSettings,
    // ---
    requestUpdateSettings: actions.requestUpdateSettings,
  }
)
class Settings extends Component {
  constructor(props) {
    super(props);

    this._mobileChanged = this._mobileChanged.bind(this);
    this._sendToAnotherChanged = this._sendToAnotherChanged.bind(this);
    this._retryClicked = this._retryClicked.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestSettings();
  }

  _retryClicked() {
    this.props.requestSettings();
  }

  _noticeEmailToggled(id) {
    this.props.toggleSeNoticeEmail(id);
  }

  _noticeSmsToggled(id) {
    this.props.toggleSeNoticeSms(id);
  }

  _sendToAnotherChanged(e) {
    if(e.target.checked) {
      this.props.setSeMobile('');
    } else {
      this.props.setSeMobile(null);
    }
  }

  _mobileChanged(e) {
    this.props.setSeMobile(e.target.value);
  }

  _automationToggled(id) {
    this.props.toggleSeAutomation(id);
  }

  _submitClicked(e) {
    this.props.requestUpdateSettings();
  }

  renderLoading() {
    return this.props.isSettingsFetching && (
      <div
        className="page__loading">
        <Spinner
          className="page__loading__spinner"
          theme="info"
          spinnerName="cube-grid" />
        <span className="page__loading__text">درحال بارگذاری اطلاعات ...</span>
      </div>
    );
  }

  renderError() {
    return !!this.props.settingsError && (
      <div
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
    const { notices, mobile, automation, isUpdateSettingsSending, updateSettingsError, updateSettingsStatus, ...props } = this.props;

    return (
      <div>

        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="اطلاع‌رسانی ها" />

        <Checklist
          style={{ marginTop: 5 }}
          rows={
            notices.map(no => {
              const email = no.notices_email === '1' && {
                key: v4(),
                label: 'رایانامه',
                checked: no.email,
                onChange: this._noticeEmailToggled.bind(this, no.id)
              };
              const sms = no.notices_sms === '1' && {
                key: v4(),
                label: 'پیامک',
                checked: no.sms,
                onChange: this._noticeSmsToggled.bind(this, no.id)
              };
              return {
                label: no.name,
                checkboxes: [
                  email,
                  sms,
                ]
              };
            })
          }
        />

        {this.renderLoading()}
        {this.renderError()}

        <Card style={{ marginTop: 15 }}>
          <Col width={7} smallFullWidth mediumFullWidth>
            <Checkbox
              checked={mobile !== null}
              onChange={this._sendToAnotherChanged}>
              اطلاع‌رسانی های پیامکی را به این شماره همراه هم ارسال کن:
            </Checkbox>
          </Col>
          <Col width={5} gutter="0" smallFullWidth mediumFullWidth>
            <Input
              textboxLtr={true}
              disabled={mobile === null}
              startIcons={[
                { className: 'icon-phone' }
              ]}
              label="تلفن‌ همراه دوم را وارد کنید"
              value={mobile || ''}
              onChange={this._mobileChanged} />
          </Col>
        </Card>

        <SectionTitle
          style={{ marginTop: 25 }}
          title="عملیات های خودکار" />

        {automation.map(at => {
          return (
            <Row key={v4()}>
              <Checkbox
                fullWidth={true}
                checked={at.checked}
                onChange={this._automationToggled.bind(this, at.id)}>
                {at.name}
              </Checkbox>
            </Row>
          );
        })}

        {this.renderLoading()}
        {this.renderError()}

        <Line style={{ margin: '20px 0' }} />

        <div>
          <Button
            style={{ display: 'inline-block', marginLeft: 10, marginBottom: 10 }}
            loading={isUpdateSettingsSending}
            theme="success"
            onClick={this._submitClicked}>
            ذخیره اطلاعات
          </Button>
          {!!updateSettingsError &&
            <IconText
              style={{ display: 'inline-block' }}
              color="warning"
              iconClass="icon-attention">
              مشکلی در ذخیره‌سازی پیش‌آمده‌است. دوباره تلاش کنید.
            </IconText>
          }
          {updateSettingsStatus === 1 &&
            <IconText
              style={{ display: 'inline-block' }}
              color="success"
              iconClass="icon-ok">
              ذخیره شد!
            </IconText>
          }
        </div>

      </div>
    );
  }
}

export default Settings;
