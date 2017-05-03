import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import Button from '../components/Button';
import Row from '../components/Row';
import Col from '../components/Col';

const Header = ({ className, children, ...props }) => (
  <div className={c('auth-box__header', className)} {...props}>
    {children}
  </div>
);

const Title = ({ className, children, ...props }) => (
  <div className={c('auth-box__title', className)} {...props}>
    {children}
  </div>
);

const Subtitle = ({ className, children, ...props }) => (
  <div className={c('auth-box__subtitle', className)} {...props}>
    {children}
  </div>
);

const Main = ({ className, children, ...props }) => (
  <div className={c('auth-box__main', className)} {...props}>
    {children}
  </div>
);

class AuthBox extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <div className="auth-box">
        {children(Header, Title, Subtitle, Main)}
      </div>
    );
  }
}

export default AuthBox;
