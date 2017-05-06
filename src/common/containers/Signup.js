import React, { Component, PropTypes } from 'react';
import { isEmail } from '../utils/validators';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import * as selectors from '../selectors/auth';

import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import AuthBox from '../components/AuthBox';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from '../components/Link';
import Row from '../components/Row';
import Col from '../components/Col';

@connect(
  state => ({
    getSignupFirstName: selectors.getSignupFirstName(state),
    getSignupLastName : selectors.getSignupLastName(state),
    getSignupEmail    : selectors.getSignupEmail(state),
    getSignupPassword : selectors.getSignupPassword(state),
    getSignupMobile   : selectors.getSignupMobile(state),
    isSignupFetching  : selectors.isSignupFetching(state),
    getSignupStatus   : selectors.getSignupStatus(state),
    getSignupError    : selectors.getSignupError(state),
  }),
  actions
)
class Signup extends Component {
  constructor(p) {
    super(p);

    this.firstNameChanged = this.firstNameChanged.bind(this);
    this.lastNameChanged  = this.lastNameChanged.bind(this);
    this.emailChanged     = this.emailChanged.bind(this);
    this.passwordChanged  = this.passwordChanged.bind(this);
    this.mobileChanged    = this.mobileChanged.bind(this);
    this.signupClicked    = this.signupClicked.bind(this);
  }

  state = {
    firstNameBlured: false,
    lastNameBlured : false,
    emailBlured    : false,
    passwordBlured : false,
    btnClicked     : false,
  }

  getSignupError(status, error) {
    switch (status) {
      case 1:
        return 'انجام شد!';
      case 7:
        return 'ورودی خود را چک کنید';
      default:
        return error.message || 'خطا، با ۰۲۱ ۲۸۴ ۲۲۵ ۳۴ تماس بگیرید';
    }
  }

  getEmailError() {
    const { getSignupEmail } = this.props;

    if (getSignupEmail === '') {
      return 'ایمیل را باید وارد کنید.';
    } else if (!isEmail(getSignupEmail)) {
      return 'ایمیل خود را دوباره چک کنید.';
    }

    return undefined;
  }

  firstNameChanged(e) {
    this.props.setSignupFirstName(e.target.value);
  }

  lastNameChanged(e) {
    this.props.setSignupLastName(e.target.value);
  }

  emailChanged(e) {
    this.props.setSignupEmail(e.target.value);
  }

  passwordChanged(e) {
    this.props.setSignupPassword(e.target.value);
  }

  mobileChanged(e) {
    this.props.setSignupMobile(e.target.value);
  }

  isBtnDisabled() {
    const { getSignupFirstName, getSignupLastName, getSignupEmail, getSignupPassword } = this.props;

    return getSignupFirstName === '' ||
            getSignupLastName === '' ||
            getSignupPassword === '' ||
            !!this.getEmailError();
  }

  signupClicked() {
    if (!this.isBtnDisabled()) {
      this.props.requestSignup();
    } else {
      this.setState({
        firstNameBlured : true,
        lastNameBlured  : true,
        emailBlured     : true,
        passwordBlured  : true,
        mobileBlured    : true,
        btnClicked      : true,
      });
    }
  }

  getError() {
    const { getSignupStatus, getSignupError } = this.props;

    switch (getSignupStatus) {
      case 13:
        return <span>ایمیل تکراریه. <Link to="/login" noUnderline>قبلاً ثبت‌نام کرده‌اید؟</Link></span>;
      
      case 32:
        return getSignupError;

      default:
        return 'مشکلی پیش آمد.';
    }
  }

  render() {
    const { getSignupFirstName, getSignupLastName, getSignupEmail, getSignupPassword, getSignupMobile, isSignupFetching, getSignupStatus, getSignupError } = this.props;

    const { firstNameBlured, lastNameBlured, emailBlured, passwordBlured, mobileBlured, btnClicked } = this.state;

    return (
      <div className="login">
        <AuthBox>
          {(Header, Title, Subtitle, Main, SocialLogin) => (
            <div>
              <Header>
                <Title>ثبت‌نام</Title>
                <Subtitle>قبلآ ثبت‌نام کرده‌اید؟<Link noUnderline to="login"> وارد شوید!</Link></Subtitle>
              </Header>
              <Main>

                <Row>
                  <Col width={5}>
                    <Input
                      ltrTextbox={true}
                      label={() => <span>نام <small>به انگلیسی</small></span>}
                      placeholder="مثال:‌ Sara"
                      value={getSignupFirstName}
                      onChange={this.firstNameChanged}
                      onBlur={() => this.setState({ firstNameBlured: true })}
                      error={firstNameBlured && getSignupFirstName === '' && 'نامتان را وارد کنید.'}
                    />
                  </Col>
                  <Col width={7} gutter="0">
                    <Input
                      ltrTextbox={true}
                      label={() => <span>نام خانوادگی <small>به انگلیسی</small></span>}
                      placeholder="مثال:‌ Jafari"
                      value={getSignupLastName}
                      onChange={this.lastNameChanged}
                      onBlur={() => this.setState({ lastNameBlured: true })}
                      error={lastNameBlured && getSignupLastName === '' && 'نام خانوادگی باید پر شود'}
                    />
                  </Col>
                </Row>

                <Input
                  ltrTextbox={true}
                  style={{ maxWidth: '100%' }}
                  label="رایانامه"
                  endLabel={() => <Link noUnderline target="_blank" href="https://www.chmail.ir/signUp">رایانامه ندارید؟</Link>}
                  placeholder="مثال:‌ ali@gmail.com"
                  value={getSignupEmail}
                  onChange={this.emailChanged}
                  onBlur={() => this.setState({ emailBlured: true })}
                  error={emailBlured && this.getEmailError()}
                />

                <Input
                  ltrTextbox={true}
                  style={{ maxWidth: '100%' }}
                  label="کلمه عبور"
                  // TODO: Password strength progress
                  inputProps={{ type: 'password' }}
                  value={getSignupPassword}
                  onChange={this.passwordChanged}
                  onBlur={() => this.setState({ passwordBlured: true })}
                  error={passwordBlured && getSignupPassword === '' && 'کلمه عبور را ننوشتید!'}
                />

                <Input
                  ltrTextbox={true}
                  style={{ maxWidth: '100%' }}
                  label={() => <span>تلفن‌همراه <span style={{ opacity: .5 }}>فقط برای اطلاع‌رسانی از طریق پیامک</span></span>}
                  placeholder="مثال: 09301112233"
                  value={getSignupMobile}
                  onChange={this.mobileChanged}
                  onBlur={() => this.setState({ mobileBlured: true })}
                />

                {!!getSignupError &&
                  <IconText
                    style={{ display: 'block', marginTop: 6, textAlign: 'left' }}
                    iconClass="icon-attention">
                    {this.getError()}
                  </IconText>
                }

                <div style={{ marginTop: 8, textAlign: 'left' }}>
                  <Button
                    theme="success"
                    disabled={btnClicked && this.isBtnDisabled()}
                    loading={isSignupFetching}
                    onClick={this.signupClicked}>
                    ساخت حساب‌کاربری
                  </Button>
                </div>

                <div className="signup__or"></div>

                <Row gutter="10px">
                  <Col width={6}>
                    <a href="https://m.tarino.ir/v1/google_login">
                      <Button
                        style={{ width: '100%' }}
                        iconClass="icon-google"
                        theme="info">
                        ورود با گوگل
                      </Button>
                    </a>
                  </Col>
                  <Col width={6} gutterPosition="right">
                    <a href="https://m.tarino.ir/v1/google_login">
                      <Button
                        style={{ width: '100%' }}
                        className="signup__github-btn"
                        iconClass="icon-github">
                        ورود با گیت‌هاب
                      </Button>
                    </a>
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

export default Signup;
