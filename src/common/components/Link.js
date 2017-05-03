import React, { Component, PropTypes } from 'react';
import { Link as RouterLink } from 'react-router';
import c from 'rc-classnames';

class Link extends Component {
  constructor(p) {
    super(p);
    this.renderLink = this.renderLink.bind(this);
    this.renderA = this.renderA.bind(this);
  }

  static propTypes = {
    iconPosition: PropTypes.oneOf(['right', 'left']),
    noUnderline: PropTypes.bool
  }

  static defaultProps = {
    iconPosition: 'right',
    noUnderline: false
  }

  renderIcon() {
    const { iconClass, iconPosition } = this.props;

    return (
      <span className={c('link__icon', `link__icon--${iconPosition}`, iconClass)}></span>
    );
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

  render() {
    const { to, href, className, iconClass, iconPosition, noUnderline, children, ...props } = this.props;

    const wrapperProps = {
      className: c('link', {
          'link--no-underline': noUnderline
        }, className),
      ...props
    };

    let renderWrapper;
    if (to) {
      renderWrapper = this.renderLink;
    } else {
      renderWrapper = this.renderA;
    }

    return (
      renderWrapper(
        <span>
          {iconPosition === 'right' && this.renderIcon()}
          {children}
          {iconPosition === 'left' && this.renderIcon()}
        </span>,
        wrapperProps
      )
    );
  }
}

export default Link;
