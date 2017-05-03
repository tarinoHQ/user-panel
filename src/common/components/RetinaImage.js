import React, { Component, PropTypes } from 'react';
import { isRetina } from '../utils/windowUtils';

class RetinaImage extends Component {
  static propTypes = {
    src: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
  }

  render() {
    let { src, ...props } = this.props;
    let images = {};

    if(src !== null && typeof src.normal !== 'undefined') {
      images = src;
    } else {
      images = {
        normal: src[0],
        retina: src[1]
      };
    }

    const imageURL = isRetina() ? images.retina : images.normal;

    return (
      <img src={imageURL} {...props} />
    );
  }
}

export default RetinaImage;
