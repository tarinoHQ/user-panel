import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Skewer extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <div className={c('skewer', className)}>
        {children}
      </div>
    );
  }
}

export default Skewer;
