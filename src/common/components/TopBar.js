import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class TopBar extends Component {
  render() {
    const { children, className, ...props } = this.props;
    
    return (
      <div 
        {...props} 
        className={c('top-bar', className)}>
        {children}
      </div>
    );
  }
}

export default TopBar;