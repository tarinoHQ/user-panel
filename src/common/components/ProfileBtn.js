import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import { isBrowser } from '../utils/windowUtils';
import { toPersian } from '../utils/numberUtils';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { Link } from 'react-router';

import { logout } from '../actions/auth';
import * as notifiSelectors from '../selectors/notifications';
import * as walletSelectors from '../selectors/wallet';
import * as authSelectors from '../selectors/auth';

import { Motion, spring, presets } from 'react-motion';
import RetinaImage from './RetinaImage';
import Gravatar from './Gravatar';
import Badge from './Badge';

@connect(
  state => ({
    email              : authSelectors.getLoginEmail(state),
    notificationsCount : notifiSelectors.getNotificationsCount(state),
  }),
  {
    logout
  }
)
@onClickOutside
class ProfileBtn extends Component {
  constructor(p) {
    super(p);

    this._toggleBubble = this._toggleBubble.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
  }

  state = {
    isBubbleOpen: false
  }

  handleClickOutside() {
    this.setState({ isBubbleOpen: false });
  }

  _toggleBubble() {
    this.setState({ isBubbleOpen: !this.state.isBubbleOpen });
  }

  logoutClicked() {
    this.props.logout();
  }

  getBubbleStyle() {
    if (this.state.isBubbleOpen) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: spring(0, presets.stiff),
        scale: spring(0, presets.stiff),
      };
    }
  }

  render() {
    const { email } = this.props;

    return (
      <div className="profile-btn">

        <Notifications onClick={this._toggleBubble} />

        <button className="profile-btn__avatar" onClick={this._toggleBubble}>
          {/* 
            <RetinaImage
              className="profile-btn__avatar__img"
              src={getImage('avatar')}
              width="40" />
          */}
          <Gravatar
            className="profile-btn__avatar__img"
            imageClassName="profile-btn__avatar__img--border"
            email={email}
            width="45"
          />
        </button>

        <Motion
          style={this.getBubbleStyle()}>
          {v =>
            <div
              style={{
                opacity: v.opacity,
                transform: `scale(${v.scale})`,
                display: v.opacity == 0 ? 'none' : 'block'
              }}
              className="profile-btn__bubble">
              <ul>
                <li>
                  <Link
                    to="/account/wallet"
                    className="profile-btn__bubble__item"
                    activeClassName="profile-btn__bubble__item--active">
                    کیف پول
                    <Wallet
                      bg={false}
                      theme="info"
                      className="profile-btn__bubble__item__badge" 
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/notifications"
                    className="profile-btn__bubble__item"
                    activeClassName="profile-btn__bubble__item--active">
                    اعلان ها
                    <Notifications badge={true} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/settings"
                    className="profile-btn__bubble__item"
                    activeClassName="profile-btn__bubble__item--active">
                    تنظیمات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/profile"
                    className="profile-btn__bubble__item"
                    activeClassName="profile-btn__bubble__item--active">
                    حساب کاربری
                  </Link>
                </li>
                <li>
                  <a
                    style={{ color: '#c74731' }}
                    className="profile-btn__bubble__item"
                    onClick={this.logoutClicked}>
                    بیرون رفتن
                  </a>
                </li>
              </ul>
            </div>
          }
        </Motion>

      </div>
    );
  }
}

export default ProfileBtn;

@connect(
  state => ({
    count: notifiSelectors.getNotificationsCount(state)
  }),
  null
)
class Notifications extends Component {
  render() {
    const { count, badge, dispatch, ...props } = this.props;
    const faCount = toPersian(count);

    if (count > 0) {

      if (badge) {
        return (
          <Badge
            theme="danger"
            className="profile-btn__bubble__item__badge">
            {faCount}
          </Badge>
        );
      } else {
        return (
          <span className="profile-btn__notifications" {...props}>
            {faCount}
          </span>
        );
      }
      
    } else {
      return <div />;
    }
    
  }
}


@connect(
  state => ({
    credit: walletSelectors.getCreditAmount(state)
  }),
  null
)
class Wallet extends Component {
  render() {
    const { credit, dispatch, ...props } = this.props;
    const faCredit = toPersian(credit, true);

    return (
      <Badge {...props}>
        {faCredit} تومان
      </Badge>
    );
    
  }
}