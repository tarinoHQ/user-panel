import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Col extends Component {

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    gutter: PropTypes.string,
    gutterPosition: PropTypes.oneOf(['right', 'left', 'both']),
    smallFullWidth: PropTypes.bool,
    mediumFullWidth: PropTypes.bool,
  }

  static defaultProps = {
    dir: 'rtl',
    gutter: '20px',
    gutterPosition: 'left',
    smallFullWidth: false,
    mediumFullWidth: false
  }

  render() {
    const { width, dir, gutter, gutterPosition, smallFullWidth, mediumFullWidth, className, style, children, ...props } = this.props;

    let paddingRight = 0;
    let paddingLeft = 0;

    if (gutterPosition === 'left') {
      paddingLeft = gutter;
    } else if (gutterPosition === 'right') {
      paddingRight = gutter;
    } else {
      paddingRight = gutter;
      paddingLeft = gutter;
    }

    const defaultStyles = {
      width: typeof width === 'string' ? width : (width * 100 / 12) + '%',
      height: 'auto',
      padding: `0 ${paddingRight} 0 ${paddingLeft}`,
      float: dir === 'rtl' ? 'right' : 'left'
    };

    return (
      <div
        className={c({
          'col--small-full-width': smallFullWidth,
          'col--medium-full-width': mediumFullWidth
        }, className)}
        style={{ ...defaultStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default Col;
