import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Badge extends Component {
  static propTypes = {
    theme: PropTypes.oneOf([
      'success',
      'danger',
      'warning',
      'info',
    ]),
    bg: PropTypes.bool
  };

  static defaultProps = {
    theme: 'info',
    bg: true
  };

  render() {
    let { theme, bg, className, ...props } = this.props;

    return (
      <span
        className={c('badge', {
          ['badge--' + theme]: theme,
          'badge--no-bg': !bg
        }, className)}
        {...props}
      />
    );
  }
}

export default Badge;
