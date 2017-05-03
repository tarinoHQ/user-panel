import React, { Component, PropTypes } from 'react';
import { isEmail } from '../utils/validators';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import * as selectors from '../selectors/auth';

import MessageBox from '../components/MessageBox';
import AuthBox from '../components/AuthBox';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from '../components/Link';
import Row from '../components/Row';
import Col from '../components/Col';

@connect(
  state => ({
    changeFPwPassword   : selectors.getChangeFPwPassword(state),
    isChangeFPwFetching : selectors.isChangeFPwFetching(state),
    changeFPwStatus     : selectors.getChangeFPwStatus(state),
    changeFPwError      : selectors.getChangeFPwError(state),
  }),
  actions
)
class ForgotCode extends Component {
  constructor(p) {
    super(p);

    this._passwordChanged     = this._passwordChanged.bind(this);
    this._showPasswordToggled = this._showPasswordToggled.bind(this);
    this._submitClicked       = this._submitClicked.bind(this);
  }

  state = {
    showPassword    : false,
    passwordBlured  : false,
    btnClicked      : false,
  }

  getChangeFPwError(status, error) {
    switch (status) {
      case 1:
        return 'انجام شد!';
      case 7:
        return 'ورودی خود را چک کنید';
      default:
        return error.message || 'خطا در ارتباط، در صورت لزوم با پشتیبانی در ارتباط باشید.';
    }
  }

  getPasswordError() {
    const { changeFPwPassword } = this.props;

    if (changeFPwPassword === '') {
      return 'کلمه‌عبور جایگزین را باید وارد کنید.';
    }

    return undefined;
  }

  isBtnDisabled() {
    return !!this.getPasswordError();
  }

  _passwordChanged(e) {
    this.props.setChangeFPwPassword(e.target.value);
  }

  _showPasswordToggled() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  _submitClicked() {
    if (!this.isBtnDisabled()) {
      this.props.requestChangeFPw();
    } else {
      this.setState({
        codeBlured     : true,
        passwordBlured : true,
        btnClicked     : true,
      });
    }
  }

  render() {
    const { forgotCode, forgotCodePassword, isForgotCodeFetching, forgotCodeStatus, forgotCodeError } = this.props;
    const { codeBlured, passwordBlured, btnClicked } = this.state;

    return (
      <div className="forgot-code">
        <AuthBox>
          {(Header, Title, Subtitle, Main, SocialLogin) => (
            <div>
              <Header>
                <Title>کد ارسالی را وارد کنید</Title>
                <Subtitle><Link noUnderline to="forgot-password">دریافت نکردید؟</Link></Subtitle>
              </Header>
              <Main>

                <Input
                  textboxLtr={true}
                  style={{ maxWidth: '100%' }}
                  label="کد ارسال‌شده برایتان را وارد کنید"
                  name="code"
                  placeholder="مثال:‌ 835701"
                  value={forgotCode}
                  onChange={this._codeChanged}
                  onBlur={() => this.setState({ codeBlured: true })}
                  error={codeBlured && this.getCodeError()}
                />

                <Input
                  textboxLtr={true}
                  style={{ maxWidth: '100%' }}
                  label="کلمه‌عبور جدید"
                  endLabel="بیش از ۸ کارکتر"
                  name="newPassword"
                  type={this.state.showPassword ? 'text' : 'password'}
                  startIcons={[
                    {
                      className: this.state.showPassword ? 'icon-eye-off' : 'icon-eye',
                      onClick: this._showPasswordToggled
                    }
                  ]}
                  placeholder=""
                  value={forgotCodePassword}
                  onChange={this._passwordChanged}
                  onBlur={() => this.setState({ passwordBlured: true })}
                  error={passwordBlured && this.getPasswordError()}
                />

                <div style={{ marginTop: 6, textAlign: 'left' }}>
                  <Button
                    theme="success"
                    disabled={btnClicked && this.isBtnDisabled()}
                    loading={isForgotCodeFetching}
                    onClick={this._submitClicked}>
                    بررسی و تغییر کلمه عبور
                  </Button>
                </div>

              </Main>
            </div>
          )}
        </AuthBox>
      </div>
    );
  }
}

export default ForgotCode;
