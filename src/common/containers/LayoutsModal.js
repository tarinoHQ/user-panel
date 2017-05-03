import React, { Component, PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import c from 'rc-classnames';

import Button from '../components/Button';
import Row from '../components/Row';
import Col from '../components/Col';

class LayoutItem extends Component {

  static propTypes = {
    selected: PropTypes.bool
  }

  static defaultProps = {
    selected: false
  }

  render () {
    let { selected, ...props } = this.props;

    return (
      <div
        {...props}
        className={c('layouts__item', {
          'layouts__item--selected': selected
        })}
      >
        <div className="layouts__item__img">
          {/*<img src="http://lorempixel.com/135/80/" />*/}
        </div>
        <div className="layouts__item__name">
          <span className="layouts__item__name__txt">چیدمان فروشگاه لوازم آرایشی من</span>
        </div>
      </div>
    );
  }
}

const DetailsRow = ({ iconClass, keyText, valueText, ...props }) => {
  return (
    <div
      {...props}
      className="layouts__details__row"
    >
      <div className="layouts__details__row__key">
        <span className="layouts__details__row__key__icon">
          <i className={iconClass}></i>
        </span>
        <span className="layouts__details__row__key__txt">
          {typeof keyText == 'function' ? keyText() : keyText}
        </span>
      </div>
      <div className="layouts__details__row__value">
        {typeof valueText == 'function' ? valueText() : valueText}
      </div>
    </div>
  );
};

@connect(
  state => ({

  }),
  {

  }
)
class LayoutsModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      thumbsWrapperRight: 0,
      thumbsWrapperWidth: 0,
      thumbsWidth: 0,
      thumbsWrapperCanGoPrev: false,
      thumbsWrapperCanGoNext: true,

      bigImageSrc: '',

      itemsWrapperRight: 0,
      itemsWrapperWidth: 7 /* nth of items */ * 151 /* each item width + border */,
      itemsWidth: 0,
      itemsWrapperCanGoPrev: false,
      itemsWrapperCanGoNext: true,
    };
    this.tabN = 3;
    this._handlePrevItemsClick = this._handlePrevItemsClick.bind(this);
    this._handleNextItemsClick = this._handleNextItemsClick.bind(this);
    this._handlePrevThumbsClick = this._handlePrevThumbsClick.bind(this);
    this._handleNextThumbsClick = this._handleNextThumbsClick.bind(this);
    this._handleThumbsLoad = this._handleThumbsLoad.bind(this);
    this._handleThumbsClick = this._handleThumbsClick.bind(this);
  }

  closeModal () {
    this.props.closeModal();
  }

  _handlePrevThumbsClick () {
    const { thumbsWrapperRight } = this.state;
    let nextRight = thumbsWrapperRight + 50;
    if (nextRight < 0) {
      this.setState({
        thumbsWrapperRight: nextRight,
        thumbsWrapperCanGoNext: true
      });
    } else {
      this.setState({
        thumbsWrapperRight: 0,
        thumbsWrapperCanGoPrev: false,
        thumbsWrapperCanGoNext: true
      });
    }
  }

  _handleNextThumbsClick () {
    const { thumbsWidth, thumbsWrapperWidth, thumbsWrapperRight } = this.state;
    let diff = thumbsWidth - thumbsWrapperWidth;
    let nextRight = thumbsWrapperRight - 150;
    if (diff < nextRight) {
      this.setState({
        thumbsWrapperRight: nextRight,
        thumbsWrapperCanGoPrev: true
      });
    } else {
      this.setState({
        thumbsWrapperRight: diff,
        thumbsWrapperCanGoNext: false,
        thumbsWrapperCanGoPrev: true
      });
    }
  }

  _handleThumbsLoad (e) {
    this.setState({
      thumbsWrapperWidth: this.state.thumbsWrapperWidth + e.target.offsetWidth + 7
    });
  }

  _handleThumbsClick (e) {
    console.log(e.target.src);
    this.setState({ bigImageSrc: e.target.src });
  }

  _handlePrevItemsClick () {
    const { itemsWrapperRight } = this.state;
    let nextRight = itemsWrapperRight + 150;
    if (nextRight < 0) {
      this.setState({
        itemsWrapperRight: nextRight,
        itemsWrapperCanGoNext: true
      });
    } else {
      this.setState({
        itemsWrapperRight: 0,
        itemsWrapperCanGoPrev: false,
        itemsWrapperCanGoNext: true
      });
    }
  }

  _handleNextItemsClick () {
    const { itemsWidth, itemsWrapperWidth, itemsWrapperRight } = this.state;
    let diff = itemsWidth - itemsWrapperWidth;
    let nextRight = itemsWrapperRight - 150;
    if (diff < nextRight) {
      this.setState({
        itemsWrapperRight: nextRight,
        itemsWrapperCanGoPrev: true
      });
    } else {
      this.setState({
        itemsWrapperRight: diff,
        itemsWrapperCanGoNext: false,
        itemsWrapperCanGoPrev: true
      });
    }
  }

  render () {
    return (
      <div className="layouts">
        <Measure
          onMeasure={({ width }) => {
            this.setState({ itemsWidth: width });
          }}
        >
          <div className="layouts__items">
            <div
              className={c(
                'layouts__items__prev', {
                'layouts__items__prev--hidden': !this.state.itemsWrapperCanGoPrev
              })}
              onClick={this._handlePrevItemsClick}
            />

            <div
              className="layouts__items__wrapper"
              style={{
                width: this.state.itemsWrapperWidth,
                right: this.state.itemsWrapperRight
              }}>
              <LayoutItem selected={true} />
              <LayoutItem />
              <LayoutItem />
              <LayoutItem />
              <LayoutItem />
              <LayoutItem />
              <LayoutItem />
            </div>

            <div
              className={c(
                'layouts__items__next', {
                'layouts__items__next--hidden': !this.state.itemsWrapperCanGoNext
              })}
              onClick={this._handleNextItemsClick}
            />
          </div>
        </Measure>

        <header className="layouts__head">
          <hgroup className="layouts__head__group">
            <h3 className="layouts__head__suptitle">قالب آوادا پرتال </h3>
            <h2 className="layouts__head__title">چیدمان فروشگاه اینرتنتی آرایش</h2>
          </hgroup>

          <Button
            className="layouts__head__button"
            iconClass="icon-star"
            theme="info"
            children="انتخاب چیدمان و قالب فعلی"
          />
          <Button
            className="layouts__head__button"
            iconClass="icon-link"
            theme="success"
            children="پیش‌نمایش زنده"
          />

        </header>

        <Row className="layouts__main">
          <Col width={6} className="layouts__details" gutter="20px" smallFullWidth>

            <DetailsRow
              iconClass="ic-target"
              keyText="موارد استفاده چیدمان"
              valueText={`فروشگاه های فروش کالا و خدمات خانگی، قایل دانلودی`}
            />

            <DetailsRow
              iconClass="ic-text-document"
              keyText="توضیحات"
              valueText={`قالب آوادا از برترین قالب های کشور
                قالب آوادا از برترین قالب های کشور
                قالب آوادا از برترین قالب های کشور
                برای استفده باید از آموزش های ما استفاده کنید`}
            />

            <Button
              className="layouts__details__close-btn"
              iconClass="icon-cancel"
              theme="danger"
              onClick={this.props.closeModal}
              children="بستن"
            />

          </Col>
          <Col width={6} className="layouts__images" gutter="0" smallFullWidth>
            <div className="layouts__images__big">
              <img src={this.state.bigImageSrc == '' ? `http://lorempixel.com/135/80/` : this.state.bigImageSrc} width="100%" />
            </div>
            <Measure
              onMeasure={({ width }) => {
                this.setState({ thumbsWidth: width });
              }}
            >
              <div className="layouts__images__thumbs">

                <div
                  className={c('layouts__images__thumbs__prev', {
                    'layouts__images__thumbs__prev--hidden': !this.state.thumbsWrapperCanGoPrev
                  })}
                  onClick={this._handlePrevThumbsClick}
                />
                <div
                  className="layouts__images__thumbs__wrapper"
                  style={{
                    width: this.state.thumbsWrapperWidth,
                    right: this.state.thumbsWrapperRight
                  }}
                >
                  <img
                    src="http://lorempixel.com/135/80/"
                    height="80"
                    onLoad={this._handleThumbsLoad}
                    onClick={this._handleThumbsClick}
                  />
                  <img
                    src="http://lorempixel.com/135/80/"
                    height="80"
                    onLoad={this._handleThumbsLoad}
                    onClick={this._handleThumbsClick}
                  />
                  <img
                    src="http://lorempixel.com/135/80/"
                    height="80"
                    onLoad={this._handleThumbsLoad}
                    onClick={this._handleThumbsClick}
                  />
                </div>
                <div
                  className={c('layouts__images__thumbs__next', {
                    'layouts__images__thumbs__next--hidden': !this.state.thumbsWrapperCanGoNext
                  })}
                  onClick={this._handleNextThumbsClick}
                />

              </div>
            </Measure>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LayoutsModal;
