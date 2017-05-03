import React, { Component, PropTypes } from 'react';

class Auth extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <div className="auth">
        <div className="auth__content">
          <div className="auth__logo-wrapper">
            <a href="http://tarino.ir" className="auth__logo">تارینو</a>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default Auth;
