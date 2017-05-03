import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class LayoutWrapper extends Component {
  render() {
    let { className, ...props } = this.props;

    return (
      <div className={c('layout-wrapper', className)} {...props}/>
    );
  }
}

export default LayoutWrapper;
