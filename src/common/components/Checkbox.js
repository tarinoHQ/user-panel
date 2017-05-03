import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';
import omit from 'lodash/omit';

class Checkbox extends Component {

  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    fullWidth: PropTypes.bool,
    checkboxProps: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    type: 'checkbox',
    disabled: false,
    checked: false,
    fullWidth: false,
    checkboxProps: {},
    onChange: () => {}
  };

  render() {
    const { name, type, checked, disabled, fullWidth, checkboxProps, onChange, className, children, ...props } = this.props;

    return (
      <label
        className={c('checkbox', {
          'checkbox--disabled': disabled,
          'checkbox--full-width': fullWidth
        }, className)}
        {...props}>

        <input
          className={c('checkbox__input', checkboxProps.className)}
          type={type}
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...omit(checkboxProps, 'className')}
        />

        <span className="checkbox__label">
          {children}
        </span>

      </label>
    );
  }
}

export default Checkbox;
