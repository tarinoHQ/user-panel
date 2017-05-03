import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import c from 'rc-classnames';

import ProfileBtn from './ProfileBtn';
import Button from './Button';
import NavItem from './NavItem';

@withRouter
class Header extends Component {
  constructor(p) {
    super(p);
    this.goToNewService = this.goToNewService.bind(this);
  }

  goToNewService() {
    this.props.router.push('/new/service');
  }

  render() {
    return (
      <header className={c('header')}>
        <div className="header__right">
          <a href="http://tarino.ir" className="logo">تارینو</a>
          <span className="header__big-arrow"></span>
          <div className="header__title"><h1 className="header__title__heading">میزکار</h1></div>
        </div>
        <div className="header__left">

          <div className="header__left__item header__small-menu">
            <NavItem
              bubbleItems={[
                { title: 'میزکار', linkTo: '/dashboard', className: '', separator: false },
                { separator: true },
                { title: 'ارسال درخواست', linkTo: '/support/new', className: '', separator: false },
                { title: 'درخواست‌های قبلی',  linkTo: '/support/threads', className: '', separator: false },
                { separator: true },
                { title: 'ثبت دامنه', linkTo: '/new/domain/', className: '', separator: false },
              ]}>
              منو
            </NavItem>
          </div>

          <div className="header__left__item header__large-menu">
            <NavItem linkTo="/dashboard">
              میزکار
            </NavItem>
          </div>

          <div className="header__left__item header__large-menu">
            <NavItem
              bubbleItems={[
                { title: 'ارسال درخواست', linkTo: '/support/new', className: '', separator: false },
                { title: 'درخواست‌های قبلی',  linkTo: '/support/threads', className: '', separator: false },
              ]}>
              پشتیبانی
            </NavItem>
          </div>

          <div className="header__left__item header__large-menu">
            <NavItem linkTo="/new/domain">
              ثبت دامنه
            </NavItem>
          </div>

          <div className="header__left__item">
            <Button
              className="header__button"
              iconClass="icon-plus"
              iconPosition="right"
              theme="info"
              onClick={this.goToNewService}>
              سرویس جدید
            </Button>
          </div>

          <div className="header__left__item">
            <ProfileBtn />
          </div>

        </div>
      </header>
    );
  }
}

export default Header;
