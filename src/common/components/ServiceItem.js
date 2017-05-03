import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';
import getImage from '../data/images';

import { Link } from 'react-router';
import CopyBtn from './CopyBtn';
import RetinaImage from './RetinaImage';

class ServiceItem extends Component {

  static propTypes = {
    orderId: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageSize: PropTypes.oneOf(['normal', 'big']),
  };

  static defaultProps = {
    url: '',
    imageSize: 'normal'
  };

  render() {
    const { orderId, name, description, pic, url, cms, imageSize, className, ...props } = this.props;

    return (
      <div
        className={c('service-item', `service-item--img-${imageSize}`,  className)}
        {...props}
      >
        <div className="service-item__right">
          {typeof pic !== 'undefined' &&
            <div className="service-item__pic">
              {/* <img src={pic} /> */}
              <RetinaImage src={pic} />
            </div>
          }
        </div>
        <div className="service-item__left">
          <div
            className={c('service-item__title')}>
            <Link to={`/services/${orderId}`}><h2 className="service-item__title__text">{name}</h2></Link>
            <CopyBtn
              className="service-item__title__copy-btn"
              text={url !== '' ? url : name || ''}>
              کپی کردن آدرس
            </CopyBtn>
          </div>
          <div className="service-item__description">
            <p className="service-item__description__text">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceItem;
