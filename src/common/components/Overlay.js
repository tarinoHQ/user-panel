import React, { Component, PropTypes } from 'react';

class Overlay extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props} className="overlay">{children}</div>
    );
  }
}

export default Overlay;