import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class IconText extends Component {
  static propTypes = {
    iconClass: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['default', 'success', 'info', 'danger', 'warning'])
  }

  static defaultProps = {
    iconProps: {},
    color: 'default'
  }

  render() {
    const { iconClass, iconProps, color, children, className, ...props } = this.props;

    return (
      <div className={c('icon-text', `icon-text--${color}`, className)} {...props}>
        <span className={c('icon-text__icon', iconClass)} {...iconProps}></span>
        {children}
      </div>
    );
  }
}

export default IconText;
