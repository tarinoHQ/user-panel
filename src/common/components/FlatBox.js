import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class FlatBox extends Component {
  static defaultProps = {
    theme: 'default',
    dashed: false,
  }

  render() {
    const { theme, dashed, children, className, ...props } = this.props;
    
    return (
      <div 
        {...props} 
        className={c('flat-box', `flat-box--${theme}`, {
          'flat-box--dashed': dashed,
        }, className)}>
        {children}
      </div>
    );
  }
}

export default FlatBox;