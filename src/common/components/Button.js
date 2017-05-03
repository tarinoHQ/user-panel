import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Button extends Component {
  constructor(p) {
    super(p);
    
    this.clicked = this.clicked.bind(this);
  }

  static propTypes = {
    theme: PropTypes.oneOf([
      'success',
      'danger',
      'warning',
      'info',
    ]).isRequired,
    size: PropTypes.oneOf([
      'big',
      'normal',
      'small',
    ]).isRequired,
    disabled: PropTypes.bool,
    shadow: PropTypes.bool,
    noBg: PropTypes.bool,
    loading: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['right', 'left']),
    iconClass: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    theme: 'info',
    size: 'normal',
    disabled: false,
    shadow: true,
    noBg: false,
    loading: false,
    iconPosition: 'right'
  }

  clicked(e) {
    if(!this.props.disabled && !this.props.loading) {
      this.props.onClick.call(null, e);
    }
  }

  renderIcon() {
    let { iconClass } = this.props;
    if (typeof iconClass !== 'undefined') {
      return (
        <i className={iconClass + ' button__icon'}></i>
      );
    }
    else {
      return null;
    }
  }

  renderLoading() {
    return (
      <div className="button__loading">
        <div className="sk-wave">
          <div className="sk-rect sk-rect1"></div>
          <div className="sk-rect sk-rect2"></div>
          <div className="sk-rect sk-rect3"></div>
          <div className="sk-rect sk-rect4"></div>
          <div className="sk-rect sk-rect5"></div>
        </div>
      </div>
    );
  }

  renderContents() {
    const { children } = this.props;

    return (
      <div>
        {this.renderIcon()}
        <span className="button__txt">{children}</span>
      </div>
    );
  }

  render() {
    let { size, theme, disabled, shadow, noBg, loading, iconClass, iconPosition, children, className, onClick, ...props } = this.props;

    return (
      <button
        className={c(
          'button',
          {
            'button--disabled': disabled || loading,
            'button--no-shadow': !shadow,
            'button--no-bg': noBg,
            [`button--icon-${iconPosition}`]: typeof iconClass !== 'undefined'
          },
          `button--${theme}`,
          `button--${size}`,
          className
        )}
        onClick={this.clicked}
        {...props}
      >
        {
          loading ?
            this.renderLoading()
            : this.renderContents()
        }
      </button>
    );
  }
}

export default Button;
