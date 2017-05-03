import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { spring, presets } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import modalIds from '../constants/ModalIds';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import RetinaImage from '../components/RetinaImage';
import LayoutsModal from './LayoutsModal';
import Button from '../components/Button';
import Row from '../components/Row';
import Col from '../components/Col';
import Modal from './Modal';

class ThemeNode extends Component {
  constructor (props) {
    super(props);
  }

  static ProppTypes = {
  };

  static defaultProps = {
  };

  render () {
    let { ...props } = this.props;

    return (
      <div
        {...props}
        className={c('theme-node')}
      >
        <div className="theme-node__img">
          <img src="http://placekitten.com/g/260/170" />
          <div className="theme-node__selected-layout">چیدمان فروشگاه لوازم آرایشی</div>
        </div>
        <div className="theme-node__info">
          <h3 className="theme-node__info__title">قالب آوادا نیوز</h3>
          <Row>
            <span className="theme-node__info__price">{toPersian(69000, true)} تومان</span>
            <div className="theme-node__info__button">مشاهده چیدمان‌ها</div>
          </Row>
        </div>
      </div>
    );
  }
}


class Themes extends Component {
  constructor (props) {
    super(props);
  }

  static ProppTypes = {
  };

  static defaultProps = {
  };

  renderSidebar () {
    return (
      <div className="themes__sidebar">
        <header className="themes__sidebar__header">گروه‌بندی</header>
        <div>
          <div className="themes__sidebar__item themes__sidebar__item">خبری</div>
          <div className="themes__sidebar__item themes__sidebar__item">مجله آنلاین</div>
          <div className="themes__sidebar__item themes__sidebar__item--selected">ساده و مینیمال</div>
        </div>
      </div>
    );
  }

  renderFilterBar () {
    return (
      <div className="themes__main__filter">
        <div className="filter_tab filter_tab--selected">همه</div>
        <div className="filter_tab">قالب‌های فروشی</div>
        <div className="filter_tab">قالب‌های رایگان</div>
      </div>
    );
  }

  renderThemesList () {
    return (
      <div className="themes__main__list">
        <Row>
          <ThemeNode />
        </Row>

        <Row style={{ textAlign: 'center', marginTop: 10 }}>
          <Button
            iconClass="icon-down-open-big"
            iconPosition="left"
            theme="warning"
            children="بارگذاری موارد بیشتر"
          />
        </Row>
      </div>
    );
  }

  render () {
    return (
      <div className="themes">
        <Row>
          {this.renderSidebar()}
          <div className="themes__main">
            {this.renderFilterBar()}
            {this.renderThemesList()}
          </div>
        </Row>

        <Modal
          style={{ maxWidth: 800 }}
          hideCloseButton={true}
          modalId={modalIds.LAYOUTS}
          content={() => <LayoutsModal />} />
      </div>
    );
  }
}

export default Themes;
