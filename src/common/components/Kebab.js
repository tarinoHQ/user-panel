import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Kebab extends Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    gutter: PropTypes.string,
    gutterPosition: PropTypes.oneOf(['right', 'left', 'both']),
    verticalAlign: PropTypes.string,
    smallFullWidth: PropTypes.bool,
    mediumFullWidth: PropTypes.bool,
  }

  static defaultProps = {
    dir: 'rtl',
    gutter: '20px',
    gutterPosition: 'left',
    smallFullWidth: false,
    mediumFullWidth: false,
    verticalAlign: 'middle',
  }

  render() {
    const { children, width, gutter, gutterPosition, verticalAlign, smallFullWidth, mediumFullWidth, className, style, ...props } = this.props;

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
      display: 'table-cell',
      padding: `0 ${paddingRight} 0 ${paddingLeft}`,
      verticalAlign
    };

    return (
      <div
        className={c('kebab',{
          'kebab--small-full-width': smallFullWidth,
          'kebab--medium-full-width': mediumFullWidth
        }, className)}
        style={{ ...defaultStyles, ...style }}
        {...props}>
        {children}
      </div>
    );
  }
}

export default Kebab;
