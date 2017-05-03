import React, { Component, PropTypes } from 'react';
import { toPersian, convertToWords } from '../utils/numberUtils';
import getImage from '../data/images';
import { 
  translateLang, 
  translateColumns 
} from '../utils/themeUtils';

import GridPad, { GridHead, GridBody, GridCell, GridBar } from './GridPad';
import RetinaImage from './RetinaImage';
import HugeButton from './HugeButton';

const langs = {
  'fa': 'فارسی',
  'en': 'انگلیسی',
  'ar': 'عربی',
};

class ThemeInfo extends Component {

  static propTypes = {
    browserSupport: PropTypes.array, 
    columns: PropTypes.array, 
    responsive: PropTypes.bool, 
    useCase: PropTypes.string, 
    layoutsCount: PropTypes.string,
    lang: PropTypes.string, 
  }

  static defaultProps = {
    useCase        : '',
    browserSupport : [],
    layoutsCount   : '0',
    columns        : [],
    lang           : 'fa',
    responsive     : true,
  };

  render() {
    const { browserSupport, columns, responsive, useCase, layoutsCount, lang, ...props } = this.props;

    return (
      <div className="theme-info">
        <GridPad className="theme-info__grid">
          <GridBody>
            <GridBar>
              <GridCell width="40%">پشتیبانی از مرورگرها</GridCell>
              <GridCell>{browserSupport.join(', ')}</GridCell>
            </GridBar>
            <GridBar>
              <GridCell width="40%">ستون‌ها</GridCell>
              <GridCell>{translateColumns(columns).join('، ')}</GridCell>
            </GridBar>
            <GridBar>
              <GridCell>واکنش‌گرا</GridCell>
              <GridCell className="theme-info__bool--false">{responsive ? 'بله' : 'خیر'}</GridCell>
            </GridBar>
            <GridBar>
              <GridCell>زبان</GridCell>
              <GridCell>{translateLang(lang)}</GridCell>
            </GridBar>
            <GridBar>
              <GridCell>کاربرد</GridCell>
              <GridCell>{useCase}</GridCell>
            </GridBar>
            <GridBar>
              <GridCell>تعداد چیدمان‌ها</GridCell>
              <GridCell>{convertToWords(layoutsCount)}</GridCell>
            </GridBar>
          </GridBody>
        </GridPad>
      </div>
    );
  }
}

export default ThemeInfo;
