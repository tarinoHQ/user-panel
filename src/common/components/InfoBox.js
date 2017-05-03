import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import RetinaImage from '../components/RetinaImage';
import Collapse from 'react-collapse';
import Card from '../components/Card';
import Link from '../components/Link';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this._toggleOpen = this._toggleOpen.bind(this);
  }

  static propTypes = {
    image: PropTypes.any,
    step: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    moreBtnLabel: PropTypes.string,
    content: PropTypes.func,
  };

  static defaultProps = {
    moreBtnLabel: 'مشاهده بیشتر',
  };

  state = {
    isOpen: false
  };

  _toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { image, step, title, excerpt, moreBtnLabel, content, ...props } = this.props;
    const { isOpen } = this.state;

    return (
      <Card className="info-box">
        <div className="info-box__image">
          <RetinaImage
            src={image} />
        </div>
        <div className="info-box__info">
          <div className="info-box__info__wrapper">
            <h2 className="info-box__title">
              <span
                className="info-box__step"
                style={{ color: '#fa9600' }}>
                {step}
              </span>
              {title}
            </h2>
            <div className="info-box__excerpt">
              {excerpt}
            </div>
          </div>
        </div>
        <Link
          noUnderline
          className={c('info-box__more-btn', {
            'info-box__more-btn--open': isOpen
          })}
          onClick={this._toggleOpen}>
          {isOpen ? 'بستن' : moreBtnLabel}
        </Link>

        <div className="info-box__content">
          <Collapse isOpened={isOpen}>
            {content && content()}
          </Collapse>
        </div>
      </Card>
    );
  }
}

export default InfoBox;
