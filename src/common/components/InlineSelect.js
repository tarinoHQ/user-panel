import React, { Component, PropTypes } from 'react';
import filter from 'lodash/filter';
import c from 'rc-classnames';
import map from 'lodash/map';

class InlineSelect extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    // [{ value: '', label: '' }]
    disabled: PropTypes.bool,
    selectProps: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    placeholder: 'انتخاب‌ کنید',
    onChange: () => {},
  }

  render() {
    const { name, value, placeholder, options, disabled, selectProps, onChange, className, ...props } = this.props;

    return (
      <div
        {...props}
        className={c('inline-select', {
          'inline-select--disabled': disabled,
          'inline-select--empty': !value,
        }, className)}>

        <div className="inline-select__text">
          <div className="inline-select__placeholder">
            {placeholder}
          </div>
          <div className="inline-select__value">
            {!!value && filter(options, o => o.value === value)[0].label}
          </div>
          <div className="inline-select__arrow"></div>
        </div>

        <select
          {...selectProps}
          className="inline-select__select"
          disabled={disabled}
          name={name}
          value={value || ' '}
          onChange={e => onChange(e.target.value, e)}>

          {!value &&
            <option disabled value=" ">{placeholder}</option>}

          {map(options, o =>
            <option
              key={o.value}
              value={o.value}>
              {o.label}
            </option>
          )}

        </select>

      </div>
    );
  }
}

export default InlineSelect;
