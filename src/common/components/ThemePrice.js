import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import getImage from '../data/images';

import RetinaImage from './RetinaImage';
import HugeButton from './HugeButton';

class ThemePrice extends Component {

  static propTypes = {
    price: PropTypes.number.isRequired,
    demoLink: PropTypes.string,
    onOrderClick: PropTypes.func.isRequired,
  }

  renderPrice() {
    const { price } = this.props;

    if(price > 0) {
      return (
        <div>
          <div className="theme-price__price__num">{toPersian(price)}</div>
          <div className="theme-price__price__crncy">هزارتومان</div>
        </div>
      );
    } else {
      return <div className="theme-price__price__free">رایگان</div>;
    }
  }

  render() {
    const { price, onOrderClick, demoLink, ...props } = this.props;

    return (
      <div className="theme-price">
        <div className="theme-price__top">
          <div className="theme-price__price">
            {this.renderPrice()}
          </div>
          <div className="theme-price__label">
            <div>قیمت کل قالب </div>
            <p className="theme-price__label__desc">
              خرید قالب، همه‌ چیدمان‌ها را شامل می‌شود و می‌توانید در آینده آن‌ها را فعال کنید.
            </p>
          </div>
        </div>

        <div className="theme-price__bottom">
          <div className="theme-price__guarantee">
            <div className="theme-price__check">تضمین کیفیت توسط تارینو</div>
            <div className="theme-price__check">بروزرسانی ها در آینده</div>
            <div className="theme-price__check">پشتیبانی مشکلات برای همیشه</div>
            <RetinaImage className="theme-price__support" src={getImage('unlimitedSupport')} />
          </div>
          <a href={demoLink} target="_blank">
            <HugeButton 
              width="100%"
              height="40px"
              theme="blue"
              iconClass="icon-eye">
              مشاهده پیش‌نمایش قالب
            </HugeButton>
          </a>
          <HugeButton 
            style={{ marginTop: 10 }}
            width="100%"
            height="48px"
            retinaImage={getImage('shoppingCart')}
            onClick={onOrderClick}>
            افزودن به سفارش
          </HugeButton>
        </div>
      </div>
    );
  }
}

export default ThemePrice;
