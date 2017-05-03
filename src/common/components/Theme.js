import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import getImage from '../data/images';
import map from 'lodash/map';
import { 
  translateLang, 
  translateColumns 
} from '../utils/themeUtils';
import { v4 } from 'node-uuid';

import Button from './Button';

const langs = {
  'fa': 'فارسی',
  'en': 'انگلیسی',
  'ar': 'عربی',
};

class Theme extends Component {

  static propTypes = {
    title          : PropTypes.string,
    cats           : PropTypes.array,
    banner         : PropTypes.string,
    usage          : PropTypes.string,
    browserSupport : PropTypes.array,
    columns        : PropTypes.array,
    layouts        : PropTypes.string,
    lang           : PropTypes.string,
    demoLink       : PropTypes.string,
    responsive     : PropTypes.bool,
    onMoreClick    : PropTypes.func,
  };

  static defaultProps = {
    title         : '',
    cats          : [],
    banner        : '',
    usage         : '',
    browserSupport: [],
    layouts       : '0',
    columns       : [],
    lang          : 'fa',
    responsive    : true,
    onMoreClick   : () => {},
  };

  render() {
    const { title, cats, banner, usage, browserSupport, layouts, columns, lang, responsive, demoLink, onMoreClick } = this.props;
    const persianColumns = translateColumns(columns);
    const support = <span><span dir="ltr">{browserSupport.join(', ')}</span> - <span>{persianColumns.join('، ')}</span> - {responsive && 'واکنش‌گرا'}</span>;

    return (
      <div className="theme">
        <div className="theme__banner">
          <img src={banner} alt={title} />
        </div>
        <div className="theme__info">
          <div className="theme__info__top">
            <div className="theme__title">{title}</div>
            <div className="theme__category">
              ثبت‌شده در
              {map(cats, cat => (
                <a key={v4()} className="theme__category__link">{cat}</a>
              ))}
            </div>
            <div className="theme__lang">
              {translateLang(lang)}
            </div>
          </div>
          <div className="theme__info__middle">

            <div className="theme__row">
              <span className="theme__row__label">کاربرد</span>
              {usage}
            </div>

            <div className="theme__row">
              <span className="theme__row__label">پشتیبانی</span>
              {support}
            </div>

            <div className="theme__row">
              <span className="theme__row__label">چیدمان‌ها</span>
              دارای {toPersian(layouts)} چیدمان مختلف با قابلیت تغییر متناسب با کاربرد
            </div>

          </div>
          <div className="theme__info__bottom">
            <a href={demoLink} target="_blank">
              <Button
                noBg={true}
                className="theme__btn">
                پیش‌نمایش زنده
              </Button>
            </a>
            <Button
              className="theme__btn"
              theme="info"
              onClick={onMoreClick}>
              مشاهده جزییات
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Theme;
