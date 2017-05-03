import { notifiTypes } from '../constants/Notifications';
import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/notifications';
import * as selectors from '../selectors/notifications';

import DateTime from '../components/DateTime';
import IconText from '../components/IconText';
import Spinner from '../components/Spinner';
import ReactMarkdown from 'react-markdown';
import Button from '../components/Button';
import Link from '../components/Link';

// Base Notifi
class Notifi extends Component {

  static propTypes = {
    iconClass: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    theme: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.object),
    time: PropTypes.number.isRequired,
  }

  static defaultProps = {
    theme: 'news',
    iconClass: 'icon-left-open-big',
    image: false
  }

  render() {
    const { iconClass, title, text, theme, image, actions, time, ...props } = this.props;

    return (
      <div className={c('notifi', 'notifi--' + theme)}>

        <div className="notifi__icon">
          {iconClass && <span className={iconClass}></span>}
          {image && isBrowser() && <img className="notifi__image" src={image} />}
        </div>

        <div className="notifi__left">
          <header className="notifi__head">
            <div className="notifi__title">
              <ReactMarkdown
                source={title}
                escapeHtml={true}
              />
            </div>
            <div className="notifi__date">
              <DateTime time={time}></DateTime>
            </div>
          </header>
          <div className="notifi__content">
            {typeof text !== 'undefined' && <div className="notifi__content__text">
              <ReactMarkdown
                source={text}
                escapeHtml={true}
              />
            </div>}
            {map(actions, a => {
              const { type, text, className, ...aProps } = a;
              if (a.type === "button") {
                return (
                  <Button
                    key={v4()}
                    className={"notifi__btn " + className}
                    {...aProps}
                  >{text}</Button>
                );
              } else {
                return (
                  <Link
                    key={v4()}
                    noUnderline={true}
                    className={"notifi__link " + className}
                    {...aProps}
                  >{text}</Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}


// -
// News Notifi
class NewsNotifi extends Component {
  render() {
    const { title, text, links, time, ...props } = this.props;

    return (
      <Notifi
        theme="news"
        iconClass="icon-inbox"
        title={title}
        text={text}
        actions={map(links, l => ({
          type: 'link',
          iconClass: 'icon-left-open-big',
          iconPosition: 'left',
          text: l.text,
          href: l.href,
        }))}
        time={time}
      />
    );
  }
}

// -
// Invoice Notifi
@withRouter
class InvoiceNotifi extends Component {
  render() {
    const { title, text, time, invoiceId, router, ...props } = this.props;

    return (
      <Notifi
        theme="invoice"
        iconClass="icon-credit-card"
        title={title}
        text={text}
        actions={[
          {
            type: 'button',
            noBg: true,
            iconClass: 'icon-left-open-big',
            iconPosition: 'left',
            text: 'پرداخت',
            onClick: () => router.push('/account/wallet/invoices/' + invoiceId),
          }
        ]}
        time={time}
      />
    );
  }
}

// -
// Gift Notifi
class GiftNotifi extends Component {
  render() {
    const { title, text, links, time, ...props } = this.props;

    return (
      <Notifi
        theme="gift"
        iconClass={false}
        image={getImage('gift1')}
        title={title}
        text={text}
        actions={map(links, l => ({
          type: 'link',
          iconClass: 'icon-left-open-big',
          iconPosition: 'left',
          text: l.text,
          href: l.href,
        }))}
        time={time}
      />
    );
  }
}


// -
// Notifications List
@connect(
  state => ({
    isNotificationsFetching: selectors.isNotificationsFetching(state),
    notificationsStatus: selectors.getNotificationsStatus(state),
    notificationsError: selectors.getNotificationsError(state),
    notifications: selectors.getNotifications(state),
  }),
  {
    requestNotifications: actions.requestNotifications,
  }
)
class Notifications extends Component {
  constructor(props) {
    super(props);

    this._retryClicked = this._retryClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestNotifications();
  }

  _retryClicked() {
    this.props.requestNotifications();
  }

  renderLoading() {
    return this.props.isNotificationsFetching && (
      <div
        className="page__loading">
        <Spinner
          className="page__loading__spinner"
          theme="info"
          spinnerName="cube-grid" />
        <span className="page__loading__text">درحال بارگذاری موارد ...</span>
      </div>
    );
  }

  renderError() {
    return this.props.notificationsError && (
      <div
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
    const { isNotificationsFetching, notificationsStatus, notificationsError, requestNotifications, notifications, ...props } = this.props;

    return (
      <div>
        {map(notifications, notifi => {
          switch (notifi.type) {
            case notifiTypes.NEWS:
              return (
                <NewsNotifi
                  key={notifi.id}
                  title={notifi.title}
                  text={notifi.text}
                  links={notifi.links}
                  time={notifi.created * 1000}
                />
              );
            case notifiTypes.INVOICE:
              return (
                <InvoiceNotifi
                  key={notifi.id}
                  title={notifi.title}
                  text={notifi.text}
                  invoiceId={notifi.invoiceId}
                  links={notifi.links}
                  time={notifi.created * 1000}
                />
              );
            case notifiTypes.GIFT:
              return (
                <GiftNotifi
                  key={notifi.id}
                  title={notifi.title}
                  text={notifi.text}
                  links={notifi.links}
                  time={notifi.created * 1000}
                />
              );
            default:
              return '';
          }
        })}

        {this.renderLoading()}
        {this.renderError()}

      </div>
    );
  }
}

export default Notifications;
