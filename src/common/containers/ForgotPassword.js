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
    forgotPasswordEmail      : selectors.getForgotPasswordEmail(state),
    isForgotPasswordFetching : selectors.isForgotPasswordFetching(state),
    forgotPasswordStatus     : selectors.getForgotPasswordStatus(state),
    forgotPasswordError      : selectors.getForgotPasswordError(state),
  }),
  actions
)
class ForgotPassword extends Component {
  constructor(p) {
    super(p);

    this._emailChanged     = this._emailChanged.bind(this);
    this._submitClicked    = this._submitClicked.bind(this);
  }

  state = {
    emailBlured : false,
    btnClicked  : false,
  }

  getForgotPasswordError(status, error) {
    switch (status) {
      case 1:
        return 'انجام شد!';
      case 7:
        return 'ورودی خود را چک کنید';
      default:
        return error.message || 'خطا در ارتباط، در صورت لزوم با پشتیبانی در ارتباط باشید.';
    }
  }

  getEmailError() {
    const { forgotPasswordEmail } = this.props;

    if (forgotPasswordEmail === '') {
      return 'ایمیل را باید وارد کنید.';
    } else if (!isEmail(forgotPasswordEmail)) {
      return 'ایمیل خود را دوباره چک کنید.';
    }

    return undefined;
  }

  isBtnDisabled() {
    return !!this.getEmailError();
  }

  _emailChanged(e) {
    this.props.setForgotPasswordEmail(e.target.value);
  }

  _submitClicked() {
    if (!this.isBtnDisabled()) {
      this.props.requestSignup();
    } else {
      this.setState({
        emailBlured     : true,
        btnClicked      : true,
      });
    }
  }

  render() {
    const { forgotPasswordEmail, isForgotPasswordFetching, forgotPasswordStatus, forgotPasswordError } = this.props;

    const { firstNameBlured, lastNameBlured, emailBlured, passwordBlured, btnClicked } = this.state;

    return (
      <div className="login">
        <AuthBox>
          {(Header, Title, Subtitle, Main, SocialLogin) => (
            <div>
              <Header>
                <Title>بازیابی کلمه‌عبور</Title>
                <Subtitle>یا <Link noUnderline to="login"> وارد شوید!</Link></Subtitle>
              </Header>
              <Main>

                <MessageBox
                  singleLine
                  style={{ marginBottom: 5 }}
                  type="success">
                  ایمیل خود را بررسی کنید. لینک تغییر کلمه‌عبور برایتان ایمیل شده‌است.
                </MessageBox>

                <Input
                  ltrTextbox={true}
                  style={{ maxWidth: '100%' }}
                  label="رایانامه"
                  placeholder="مثال:‌ ali@gmail.com"
                  value={forgotPasswordEmail}
                  onChange={this._emailChanged}
                  onBlur={() => this.setState({ emailBlured: true })}
                  error={emailBlured && this.getEmailError()}
                />

                <div style={{ marginTop: 6, textAlign: 'left' }}>
                  <Button
                    theme="success"
                    disabled={btnClicked && this.isBtnDisabled()}
                    loading={isForgotPasswordFetching}
                    onClick={this._submitClicked}>
                    بازیابی و تغییر کلمه‌عبور 
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

export default ForgotPassword;
