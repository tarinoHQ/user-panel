import React, { Component, PropTypes } from 'react';
import { Link as RouterLink } from 'react-router';
import c from 'rc-classnames';

class HelpBtn extends Component {
  constructor(p) {
    super(p);

    this.renderLink = this.renderLink.bind(this);
    this.renderA = this.renderA.bind(this);
  }

  renderA(children, props) {
    const { href } = this.props;

    return (
      <a href={href} {...props}>{children}</a>
    );
  }

  renderLink(children, props) {
    const { to } = this.props;

    return (
      <RouterLink to={to} {...props}>{children}</RouterLink>
    );
  }

  renderNormal(children, props) {
    return (
      <span {...props}>{children}</span>
    );
  }

  render() {
    const { to, href, className, ...props } = this.props;

    const wrapperProps = {
      className: c('help-btn', className),
      ...props
    };

    let renderWrapper;
    if (to) {
      renderWrapper = this.renderLink;
    } else if (href) {
      renderWrapper = this.renderA;
    } else {
      renderWrapper = this.renderNormal;
    }

    return (
      renderWrapper(
        <span className="help-btn__button">?</span>,
        wrapperProps
      )
    );
  }
}

export default HelpBtn;
