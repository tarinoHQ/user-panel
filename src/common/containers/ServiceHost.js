import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as selectors from '../selectors/services';
import * as actions from '../actions/services';

import GridPad, { GridHead, GridBody, GridBar, GridCell } from '../components/GridPad';
import { Motion, presets, spring } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';
import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import HelpBtn from '../components/HelpBtn';
import Button from '../components/Button';
import Skewer from '../components/Skewer';
import Input from '../components/Input';
import Kebab from '../components/Kebab';
import Card from '../components/Card';
import Link from '../components/Link';

@connect(
  state => ({
    username: selectors.getMsUsername(state),
    // Ajax
    isFetching: selectors.isMsHostFetching(state),
    status: selectors.getMsHostStatus(state),
    error: selectors.getMsHostError(state),
  }),
  actions,
)
@withRouter
class ServiceHost extends Component {
  constructor(props) {
    super(props);
    this.orderId       = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  componentDidMount() {
    // @TODO: req service summery
  }

  _retryClicked() {
    // @TODO: req service summery
  }

  loadingStyles() {
    if (this.props.isFetching) {
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
            <span className="page__loading__text">درحال بارگذاری اطلاعات ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.error && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد.</IconText>
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
    const { router, username, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="مدیریت هاست"
          subtitle="مِلک خود را مدیریت کنید"
        />

        <GridPad width="100%">
          <GridHead>
            <GridBar>
              <GridCell colSpan={2}><h3>اطلاعات پنل مدیریت هاست</h3></GridCell>
            </GridBar>
          </GridHead>
          <GridBody>
            <GridBar>
              <GridCell width="20%">ورود</GridCell>
              <GridCell>
                <PanelButton 
                  orderId={this.orderId} />
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell width="20%">نام‌کاربری</GridCell>
              <GridCell>
                <span style={{ letterSpacing: 1 }}>{username}</span>
              </GridCell>
            </GridBar>

            <ChangePassword orderId={this.orderId} />

          </GridBody>
        </GridPad>

        <h3 style={{ marginTop: 25 }}>ایمیل های اختصاصی شما</h3>

        <Emails orderId={this.orderId} />

      </div>
    );
  }
}

export default ServiceHost;


/* --- Emails --- */
@connect(
  state => ({
    emails: selectors.getMsEmails(state),
    // Ajax
    isFetching: selectors.isMsEmailsFetching(state),
    error: selectors.getMsEmailsError(state),
    status: selectors.getMsEmailsStatus(state),
  }),
  actions,
)
class Emails extends Component {
  constructor(props) {
    super(props);
    this.orderId       = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestMsEmails(this.orderId);
  }

  _retryClicked() {
    this.props.requestMsEmails(this.orderId);
  }

  loadingStyles() {
    if (this.props.isFetching) {
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
            <span className="page__loading__text">درحال بارگذاری اطلاعات ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.error && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد.</IconText>
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
    const { router, emails, ...props } = this.props;

    return (
      <div>

        <TableWithSorting
          columns={[
            {
              key: 'email',
              title: 'نشانی ایمیل',
              template: row => row.email,
              sortBy: row => row.email,
            },
            {
              key: 'username',
              title: 'نام کاربری',
              template: row => row.user,
              sortBy: row => row.user,
            },
            {
              key: 'diskUsage',
              title: 'مصرف فضا',
              template: row => (
                row.maxLimit !== 'unlimited' ?
                <ProgressBar
                  theme="success"
                  progress={row.diskUsed * 100 / row.maxLimit}
                /> :
                <span>فضای نامحدود</span>
              ),
              sortBy: row => row.diskUsed * 100 / row.maxLimit,
            },
            {
              key: 'actions',
              title: '',
              template: row => (
                <Link
                  noUnderline
                  iconClass="icon-left-open"
                  href={row.loginLink}>
                  ورود
                </Link>
              ),
            }
          ]}
          data={emails}
        />

        {this.renderError()}
        {this.renderLoading()}

      </div>
    );
  }
}


/* --- Change Password --- */
@connect(
  state => ({
    password: selectors.getMsChangePassword(state),
    // Ajax
    isSending: selectors.isMsChangePasswordSending(state),
    error: selectors.getMsChangePasswordError(state),
    status: selectors.getMsChangePasswordStatus(state),
  }),
  actions,
)
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.orderId          = props.orderId;
    this._submitClicked   = this._submitClicked.bind(this);
    this._passwordChanged = this._passwordChanged.bind(this);
  }

  state = {
    show: false
  }

  _passwordChanged(e) {
    this.props.setMsChangePassword(e.target.value);
  }

  _submitClicked() {
    this.props.requestMsChangePassword(this.orderId);
  }

  render() {
    const { password, isSending, error, status, ...props } = this.props;

    return (
      <GridBar>
        <GridCell width="20%">تغییر کلمه عبور</GridCell>
        <GridCell>
          <Skewer>
            <Kebab mediumFullWidth width={5}>
              <Input
                textboxLtr={true}
                type={this.state.show ? 'text' : 'password'}
                label="کلمه عبور جدید"
                value={password}
                onChange={this._passwordChanged}
                endIcons={[
                  {
                    className: this.state.show ? 'icon-eye-off' : 'icon-eye',
                    onClick: e => this.setState({ show: !this.state.show })
                  }
                ]}
              />
            </Kebab>
            <Kebab mediumFullWidth verticalAlign="bottom" width={7}>
              <Button
                style={{ display: 'inline', marginBottom: '8px' }}
                loading={isSending}
                theme="success"
                onClick={this._submitClicked}>
                تغییر کلمه‌عبور
              </Button>
              {!!error &&
                <IconText
                  style={{ display: 'inline', marginRight: '8px' }}
                  color="warning"
                  iconClass="icon-attention">
                  اوه، دوباره تلاش کنید.
                </IconText>
              }
              {status === 1 &&
                <IconText
                  style={{ display: 'inline', marginRight: '8px' }}
                  color="success"
                  iconClass="icon-ok">
                  کلمه‌عبور جدید جایگزین شد.
                </IconText>
              }
            </Kebab>
          </Skewer>
        </GridCell>
      </GridBar>
    );
  }
}



/* --- Create Login --- */
@connect(
  state => ({
    // Ajax
    isSending: selectors.isMsCreateLoginFetching(state),
    error: selectors.getMsCreateLoginError(state),
    status: selectors.getMsCreateLoginStatus(state),
  }),
  actions,
)
class PanelButton extends Component {
  constructor(props) {
    super(props);
    this.orderId          = props.orderId;
    this._submitClicked   = this._submitClicked.bind(this);
  }

  _submitClicked() {
    this.props.requestMsCreateLogin(this.orderId);
  }

  render() {
    const { password, isSending, error, status, ...props } = this.props;

    return (
      <div>
        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isSending}
          theme="info"
          onClick={this._submitClicked}>
          ورود به پنل هاست (CPanel)
        </Button>
        {!!error &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            اوه، دوباره تلاش کنید.
          </IconText>
        }
        {status === 1 &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="success"
            iconClass="icon-ok">
            پنل در تب جدید باز شد.
          </IconText>
        }
      </div>
    );
  }
}
