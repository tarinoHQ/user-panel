import React, { Component, PropTypes } from 'react';
import { isRtl } from '../utils/validators';
import { v4 } from 'node-uuid';
import omit from 'lodash/omit';
import c from 'rc-classnames';
import map from 'lodash/map';
import has from 'lodash/has';

import Textarea from 'react-textarea-autosize';

class Input extends Component {
  constructor(props) {
    super(props);
    this.isValueRtl = has(props, 'value') && props.value !== '' ?
      isRtl(props.value) :
      isRtl(props.placeholder);
  }

  componentWillReceiveProps(nextProps) {
    this.isValueRtl = isRtl(nextProps.value);
  }

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    endLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    value: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    startIcons: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
    endIcons: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
    // sample icon: { className: '', onClick: () => {}, props: {} }
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.string]),
    textboxProps: PropTypes.object,
    labelProps: PropTypes.object,
    inputProps: PropTypes.object,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    smallFullWidth: PropTypes.bool,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    ltr: PropTypes.bool,
    textboxLtr: PropTypes.bool,
    onChange: PropTypes.func,
    renderBefore: PropTypes.func,
    renderAfter: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    type: 'text',
    placeholder: '',
    error: false,
    textboxProps: {},
    labelProps: {},
    inputProps: {},
    disabled: false,
    fullWidth: false,
    smallFullWidth: false,
    multiLine: false,
    rows: 1,
    ltr: false,
    textboxLtr: false,
    onChange: (e) => {},
    onFocus: (e) => {},
    onBlur: (e) => {},
    renderBefore: () => null,
    renderAfter: () => null,
  };

  renderPrefix() {
    const { prefix } = this.props;

    if (typeof prefix === 'undefined') { return null; }

    return (
      <div className="input__prefix">{prefix}</div>
    );
  }

  renderSuffix() {
    const { suffix } = this.props;

    if (typeof suffix === 'undefined') { return null; }

    return (
      <div className="input__suffix">{suffix}</div>
    );
  }

  renderStartIcons() {
    const { startIcons } = this.props;

    if (typeof startIcons === 'undefined') { return null; }

    return (
      <div className="input__start-icons">
        {map(startIcons, icon => (
        typeof icon !== 'function' ?
            <div
              key={v4()}
              className={c('input__icon', {
                'input__icon--clickable': has(icon, 'onClick')
              }, icon.className)}
              onClick={icon.onClick}
              {...icon.props}
            /> :
            icon('input__icon')
        ))}
      </div>
    );
  }

  renderEndIcons() {
    const { endIcons } = this.props;

    if (typeof endIcons === 'undefined') { return null; }

    return (
      <div className="input__end-icons">
        {map(endIcons, icon => (
          <div
            key={v4()}
            className={c('input__icon', {
              'input__icon--clickable': has(icon, 'onClick')
            }, icon.className)}
            onClick={icon.onClick}
            {...icon.props}
          />
        ))}
      </div>
    );
  }

  renderLabel() {
    const { label, endLabel, labelProps } = this.props;
    const { className, otherLabelProps } = labelProps;
    const typeOfLabel = typeof label;
    const typeOfEndLabel = typeof endLabel;

    if (typeOfLabel === 'undefined') { return null; }

    return (
      <div
        className={c('input__label', className)}
        {...otherLabelProps}>
        <label className="input__label__start">
          {typeOfLabel === 'function' ? label() : label}
        </label>
        {typeOfEndLabel !== 'undefined' &&
          <span className="input__label__end" tabIndex={-1}>
            {typeOfEndLabel === 'function' ? endLabel() : endLabel}
          </span>
        }
      </div>
    );
  }

  renderError() {
    const { error } = this.props;

    if (typeof error === 'undefined' || !error) { return null; }

    return (
      <div
        className="input__error">
        {error}
      </div>
    );
  }

  render() {
    const { label, endLabel, value, type, placeholder, prefix, suffix, startIcons, endIcons, error, textboxProps, labelProps, inputProps, disabled, fullWidth, smallFullWidth, ltr, textboxLtr, multiLine, rows, onChange, onFocus, onBlur, renderBefore, renderAfter, className, ...props } = this.props;
    const textboxClassName = textboxProps.className;
    const otherTextboxProps = omit(textboxProps, 'className');
    const baseInputProps = {
      placeholder: placeholder,
      value: value,
      disabled: disabled,
      onChange: onChange,
      onFocus: onFocus,
      onBlur: onBlur,
    };

    return (
      <div
        className={c('input', {
          'input--full-width': fullWidth,
          'input--small-full-width': smallFullWidth,
          'input--multiline': multiLine,
          'input--ltr': ltr,
          'input--textbox-ltr': textboxLtr,
          'input--error': error,
          'input--disabled': disabled,
        }, className)}
        {...props}
      >

        {renderBefore()}
        {this.renderLabel()}
        {this.renderError()}

        <div
          className={c('input__textbox', {}, textboxClassName)}
          {...otherTextboxProps}>

          {this.renderStartIcons()}
          {this.renderPrefix()}

          <div className="input__input-wrapper">
            {multiLine ?
              <Textarea
                className={c('input__textarea', {
                  'input__textarea--ltr': !this.isValueRtl,
                  'input__textarea--rtl': this.isValueRtl
                })}
                minRows={rows}
                {...inputProps}
                {...baseInputProps}
              /> :
              <input
                className={c('input__input', {
                  'input__input--ltr': !this.isValueRtl,
                  'input__input--rtl': this.isValueRtl,
                })}
                type={type}
                {...inputProps}
                {...baseInputProps}
              />
            }
          </div>

          {this.renderSuffix()}
          {this.renderEndIcons()}
        </div>

        {renderAfter()}

      </div>
    );
  }
}

export default Input;
