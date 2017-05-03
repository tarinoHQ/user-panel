import React, { Component, PropTypes } from 'react';

class ButtonWrapper extends Component {

  static propTypes = {
    inputLevel: PropTypes.bool
  }

  static defalutProps = {
    inputLevel: true
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div className="button-wrapper" {...props}>
        {children}
      </div>
    );
  }
}

export default ButtonWrapper;
