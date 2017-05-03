import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import RetinaImage from '../components/RetinaImage';

class HugeButton extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    theme: PropTypes.oneOf(['red', 'blue']),
    retinaImage: PropTypes.oneOfType([PropTypes.any, PropTypes.bool]),
    iconClass: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    theme: 'red',
    retinaImage: false,
    iconClass: false,
    disabled: false,
  }

  renderIcon() {
    const { iconClass, retinaImage } = this.props;
    if (iconClass) {
      return (
        <span className={c('huge-button__icon', 'huge-button__icon--class', iconClass)} />
      );
    } else if (retinaImage) {
      return (
        <RetinaImage className="huge-button__icon huge-button__icon--image" src={retinaImage} />
      );
    }
  }

  render() {
    const { retinaImage, theme, iconClass, height, width, children, disabled, className, style, ...props } = this.props;

    return (
      <button {...props}
        className={c('huge-button', `huge-button--${theme}`, {
          [`huge-button--disabled`]: disabled
        }, className)}
        style={{
          lineHeight: height,
          height,
          width,
          ...style
        }}
        disabled={disabled}
      >
        {this.renderIcon()}
        <span className="huge-button__text">
          {typeof children === 'function' ? children() : children}
        </span>
      </button>
    );
  }
}

export default HugeButton;
