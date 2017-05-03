import React, { Component, PropTypes } from 'react';

class Line extends Component {
  render() {
    const { children, style, ...props } = this.props;

    return (
      <div
        style={{ width: '100%', height: '1px', background: '#e5e5e5', ...style }}
        className="line"
      >
        {children}
      </div>
    );
  }
}

export default Line;
