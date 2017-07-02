
import React, { Component, PropTypes } from 'react';
import provinces from '../data/provinces.json';
import { connect } from 'react-redux';
import map from 'lodash/map';

import * as actions from '../actions/profile';
import * as selectors from '../selectors/profile';

import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import Select from '../components/Select';
import Button from '../components/Button';
import Skewer from '../components/Skewer';
import Kebab from '../components/Kebab';
import Input from '../components/Input';
import Line from '../components/Line';
import Card from '../components/Card';
import Row from '../components/Row';
import Col from '../components/Col';

@connect(
  state => ({
    changePasswordNew: selectors.getChangePasswordNew(state),
    changePasswordCurrent: selectors.getChangePasswordCurrent(state),
    isChangePasswordFetching: selectors.isChangePasswordFetching(state),
    changePasswordStatus: selectors.getChangePasswordStatus(state),
    changePasswordError: selectors.getChangePasswordError(state),
    isCheckEmailFetching: selectors.isCheckEmailFetching(state),
    checkEmailStatus: selectors.getCheckEmailStatus(state),
    checkEmailError: selectors.getCheckEmailError(state),
    profileMobile: selectors.getProfileMobile(state),
    profileEmail: selectors.getProfileEmail(state),
    profileTel: selectors.getProfileTel(state),
    profileFirstName: selectors.getProfileFirstName(state),
    profileLastName: selectors.getProfileLastName(state),
    profileAddress: selectors.getProfileAddress(state),
    profileCity: selectors.getProfileCity(state),
    profileState: selectors.getProfileState(state),
    isUpdateProfileFetching: selectors.isUpdateProfileFetching(state),
    updateProfileStatus: selectors.getUpdateProfileStatus(state),
    updateProfileError: selectors.getUpdateProfileError(state),
  }),
  {
    setChangePasswordNew: actions.setChangePasswordNew,
    setChangePasswordCurrent: actions.setChangePasswordCurrent,
    requestChangePassword: actions.requestChangePassword,
    requestCheckEmail: actions.requestCheckEmail,
    requestUpdateProfile: actions.requestUpdateProfile,
    // ---
    setMobile: actions.setProfileMobile,
    setEmail: actions.setProfileEmail,
    setTel: actions.setProfileTel,
    setFirstName: actions.setProfileFirstName,
    setLastName: actions.setProfileLastName,
    setAddress: actions.setProfileAddress,
    setCity: actions.setProfileCity,
    setState: actions.setProfileState,
  }
)
class Profile extends Component {
  constructor(props) {
    super(props);

    this._newPasswordChanged     = this._fieldChanged.bind(this, this.props.setChangePasswordNew);
    this._currentPasswordChanged =
      this._fieldChanged.bind(this, this.props.setChangePasswordCurrent);
    this._showPasswordToggled    = this._showPasswordToggled.bind(this);
    this._mobileChanged          = this._fieldChanged.bind(this, this.props.setMobile);
    this._fistNameChanged        = this._fieldChanged.bind(this, this.props.setFirstName);
    this._lastNameChanged        = this._fieldChanged.bind(this, this.props.setLastName);
    this._telChanged             = this._fieldChanged.bind(this, this.props.setTel);
    this._addressChanged         = this._fieldChanged.bind(this, this.props.setAddress);
    this._cityChanged            = this._fieldChanged.bind(this, this.props.setCity);
    this._stateChanged           = this._stateChanged.bind(this);
    this._changePasswordClicked  = this._changePasswordClicked.bind(this);
    this._updateProfileClicked   = this._updateProfileClicked.bind(this);
  }

  state = {
    showPassword: false
  }

  componentDidMount() {
    
  }

  _fieldChanged(actionCreator, e) {
    actionCreator(e.target.value);
  }

  _stateChanged(v) {
    this.props.setState(v.value);
  }

  _showPasswordToggled(v) {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _changePasswordClicked(e) {
    this.props.requestChangePassword();
    e.preventDefault();
    return false;
  }

  _updateProfileClicked(e) {
    this.props.requestUpdateProfile();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      changePasswordNew,
      changePasswordCurrent,
      isChangePasswordFetching,
      changePasswordStatus,
      changePasswordError,
      isCheckEmailFetching,
      checkEmailStatus,
      checkEmailError,
      profileMobile,
      profileEmail,
      profileFirstName,
      profileLastName,
      profileTel,
      profileAddress,
      profileCity,
      profileState,
      isUpdateProfileFetching,
      updateProfileStatus,
      updateProfileError,
      // ---
      setChangePasswordNew,
      setChangePasswordCurrent,
      requestChangePassword,
      requestCheckEmail,
      requestUpdateProfile,
      setProfileMobile,
      setProfileEmail,
      setProfileTel,
      setProfileFirstName,
      setProfileLastName,
      setProfileAddress,
      setProfileCity,
      setProfileState,
    } = this.props;

    return (
      <div>

        <SectionTitle
          style={{ margin: 0, padding: 0 }}
          title="تغییر کلمه عبور" />

        <Skewer>
          <Kebab width={4} smallFullWidth mediumFullWidth>
            <Input
              textboxLtr={true}
              label="کلمه عبور فعلی"
              type="password"
              value={changePasswordCurrent}
              onChange={this._currentPasswordChanged}
            />
          </Kebab>
          <Kebab width={4} smallFullWidth mediumFullWidth>
            <Input
              textboxLtr={true}
              type={this.state.showPassword ? 'text' : 'password'}
              label="کلمه عبور جدید"
              startIcons={[
                {
                  className: this.state.showPassword ? 'icon-eye-off' : 'icon-eye',
                  onClick: this._showPasswordToggled
                }
              ]}
              value={changePasswordNew}
              onChange={this._newPasswordChanged}
            />
          </Kebab>
          <Kebab
            width={4}
            style={{ verticalAlign: 'bottom' }}
            smallFullWidth
            mediumFullWidth>
            <Button
              style={{ display: 'inline', marginBottom: '8px' }}
              loading={isChangePasswordFetching}
              onClick={this._changePasswordClicked}>
              تغییر کلمه‌عبور
            </Button>
          </Kebab>
        </Skewer>

        {!!changePasswordError &&
          <IconText
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }

        {changePasswordStatus === 1 &&
          <IconText
            color="success"
            iconClass="icon-ok">
            با موفقیت تغییر کرد.
          </IconText>
        }

        <SectionTitle
          title="حساب کاربری تارینو" />

        <Row style={{ overflow: 'hidden' }}>
          <Col width={6}>
            <Input
              label="تلفن همراه"
              value={profileMobile}
              onChange={this._mobileChanged}
            />
          </Col>
          <Col width={6}>
            <EmailInputWithCheck />
          </Col>
        </Row>

        <SectionTitle
          title={() => (<span>اطلاعات شخصی <small style={{ fontSize: '.7em' }}>استفاده برای اطلاعات دامنه</small></span>)} />

        <MessageBox
          style={{ marginBottom: 10 }}
          singleLine={false}
          type="info"
          title="توجه کنید!">
          بدلیل ثبت این اطلاعات به‌صورت بین‌المللی در مشخصات دامنه، باید با حروف <strong>انگلیسی</strong> بنویسید (فینگیلیش)
        </MessageBox>

        <Row>
          <Col width={6}>
            <Input
              label="نام"
              value={profileFirstName}
              onChange={this._fistNameChanged}
            />
          </Col>
          <Col width={6}>
            <Input
              label="نام خانوادگی"
              value={profileLastName}
              onChange={this._lastNameChanged}
            />
          </Col>
        </Row>

        <Input
          label="شماره تماس"
          placeholder=""
          value={profileTel}
          onChange={this._telChanged}
        />

        <Line style={{ margin: '20px 0' }} />

        <Input
          style={{ maxWidth: '100%' }}
          label="آدرس دقیق"
          placeholder="مثال: Farhang St - Kooche Nasim - no 358"
          value={profileAddress}
          onChange={this._addressChanged}
        />

        <Row>
          <Col width={6}>
            <Input
              label="شهر"
              placeholder="مثال:‌Tehran"
              value={profileCity}
              onChange={this._cityChanged}
            />
          </Col>
          <Col width={6}>
            <Select
              label="استان / ایالت"
              options={map(provinces, p => ({
                value: p.name_en, label: p.name + ' - ' + p.name_en
              }))}
              placeholder="انتخاب کنید"
              value={profileState || 'Tehran'}
              onChange={this._stateChanged}
            />
          </Col>
        </Row>

        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isUpdateProfileFetching}
          theme="success"
          iconClass="icon-paper-plane"
          onClick={this._updateProfileClicked}>
          ثبت اطلاعات
        </Button>

        {!!updateProfileError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
      </div>
    );
  }
}

export default Profile;

@connect(
  state => ({
    isCheckEmailFetching: selectors.isCheckEmailFetching(state),
    checkEmailStatus: selectors.getCheckEmailStatus(state),
    checkEmailError: selectors.getCheckEmailError(state),
    profileEmail: selectors.getProfileEmail(state),
  }),
  {
    requestCheckEmail: actions.requestCheckEmail,
    setProfileEmail: actions.setProfileEmail,
  }
)
class EmailInputWithCheck extends Component {
  constructor(p) {
    super(p);

    this._inputFocused  = this._inputFocused.bind(this);
    this._inputChanged  = this._inputChanged.bind(this);
    this.getMsg         = this.getMsg.bind(this);
  }

  state = {
    isFocused: false
  }

  getMsg() {
    if(this.props.isCheckEmailFetching) {
      return <IconText>در حال بررسی ...</IconText>;
    }

    switch (this.props.checkEmailStatus) {
      case 1:
        return <IconText color="success">تبریک! موجود است.</IconText>;
      case 25:
        return <IconText color="danger">قبلا ثبت شده است.</IconText>;
      case 26:
        return <IconText color="warning">ایمیل نامعتبر است.</IconText>;
      default:
        return <span />;
    }
  }

  _inputFocused() {
    this.setState({ isFocused: true });
  }

  _inputChanged(e) {
    this.props.setProfileEmail(e.target.value);
    this.props.requestCheckEmail();
  }

  render() {
    const { isCheckEmailFetching, checkEmailStatus, checkEmailError, profileEmail, requestCheckEmail, checkEmailSucceed, checkEmailFailed, setProfileEmail, ...props } = this.props;
    const { isFocused } = this.state;

    return (
      <Input
        {...props}
        label="رایانامه"
        endLabel={this.getMsg}
        value={profileEmail}
        onFocus={this._inputFocused}
        onChange={this._inputChanged}
      />
    );
  }
}
