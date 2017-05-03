import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
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

@withRouter
@connect(
  state => ({
    getLoginEmail: selectors.getLoginEmail(state),
    getLoginPassword: selectors.getLoginPassword(state),
    isLoginFetching: selectors.isLoginFetching(state),
    getLoginStatus: selectors.getLoginStatus(state),
    getLoginError: selectors.getLoginError(state),
    isSignupSuccessful: selectors.isSignupSuccessful(state),
  }),
  actions
)
class Login extends Component {
  constructor(p) {
    super(p);

    this.emailChanged     = this.emailChanged.bind(this);
    this.passwordChanged  = this.passwordChanged.bind(this);
    this.loginClicked     = this.loginClicked.bind(this);
  }

  state = {
    emailBlured    : false,
    passwordBlured : false,
    isBtnDisabled  : false,
  }

  getLoginError(status, error) {
    switch (status) {
      case 1:
        return 'ورود انجام شد، صفحه را دوباره باز کنید.';

      case 7:
        return 'ایمیل یا کلمه‌عبور اشتباه وارد شده‌اند.';

      default:
        return error.message || 'خطا، با ۰۲۱۳۴۸۹ تماس بگیرید';
    }
  }

  emailChanged(e) {
    this.props.setLoginEmail(e.target.value);
  }

  passwordChanged(e) {
    this.props.setLoginPassword(e.target.value);
  }

  loginClicked(e) {
    const { getLoginEmail, getLoginPassword, location } = this.props;
    e.preventDefault();
    if (getLoginEmail !== '' && getLoginPassword !== '') {
      this.props.requestLogin(location.query.nextPathname);
    } else {
      this.setState({ isBtnDisabled: true });
    }

    return false;
  }

  render() {
    const { getLoginEmail, getLoginPassword, isLoginFetching, getLoginStatus, getLoginError, isSignupSuccessful } = this.props;

    const { emailBlured, passwordBlured, isBtnDisabled } = this.state;

    return (
      <div className="login">
        <AuthBox>
          {(Header, Title, Subtitle, Main) => (
            <div>
              <Header>
                <Title>ورود</Title>
                <Subtitle>حساب‌کاربری ندارید؟ <Link noUnderline to="signup">ثبت‌نام کنید</Link></Subtitle>
              </Header>
              <Main>

                {getLoginStatus > 1 &&
                  <MessageBox
                    singleLine
                    style={{ marginBottom: 5 }}
                    type="warning">
                    {this.getLoginError(getLoginStatus, getLoginError)}
                  </MessageBox>
                }

                {isSignupSuccessful &&
                  <MessageBox
                    singleLine
                    style={{ marginBottom: 5 }}
                    type="success">
                    ثبت‌نام انجام شد، ایمیل تاییدیه برای شما ارسال شد، قبل از ورود آن را تایید کنید.
                  </MessageBox>
                }

                <form onSubmit={this.loginClicked}>
                  <Input
                    textboxLtr={true}
                    style={{ maxWidth: '100%' }}
                    label="رایانامه یا تلفن‌همراه"
                    value={getLoginEmail}
                    onChange={this.emailChanged}
                    onBlur={() => this.setState({ emailBlured: true })}
                    error={emailBlured && getLoginEmail === '' && 'این فیلد را پر کنید.'}
                  />

                  <Input
                    textboxLtr={true}
                    style={{ maxWidth: '100%' }}
                    label="کلمه عبور"
                    endLabel={() => (<Link noUnderline tabIndex={-1} href="forgot-password">فراموش کردید؟</Link>)}
                    inputProps={{ type: 'password' }}
                    value={getLoginPassword}
                    onChange={this.passwordChanged}
                    onBlur={() => this.setState({ passwordBlured: true })}
                    error={passwordBlured && getLoginEmail === '' && 'این فیلد را پر کنید.'}
                  />

                  <div style={{ marginTop: 6, textAlign: 'left' }}>
                    <Button
                      theme="success"
                      disabled={isBtnDisabled}
                      loading={isLoginFetching}
                      onClick={this.loginClicked}>
                      ورود به حساب
                    </Button>
                  </div>
                </form>

                <div className="login__or"></div>

                <Row gutter="10px">
                  <Col width={6}>
                    <Button
                      style={{ width: '100%' }}
                      iconClass="icon-google"
                      theme="info">
                      ورود با گوگل
                    </Button>
                  </Col>
                  <Col width={6} gutterPosition="right">
                    <Button
                      style={{ width: '100%' }}
                      className="login__github-btn"
                      iconClass="icon-github">
                      ورود با گیت‌هاب
                    </Button>
                  </Col>
                </Row>

              </Main>
            </div>
          )}
        </AuthBox>
      </div>
    );
  }
}

export default Login;
