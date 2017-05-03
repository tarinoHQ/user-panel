import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import ReactSelect  from 'react-select';

class Select extends Component {

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    endLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    value: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.string]),
    labelProps: PropTypes.object,
    wrapperProps: PropTypes.object,
    fullWidth: PropTypes.bool,
    smallFullWidth: PropTypes.bool,
    ltr: PropTypes.bool,
    renderBefore: PropTypes.func,
    renderAfter: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    error: false,
    labelProps: {},
    wrapperProps: {},
    fullWidth: false,
    smallFullWidth: false,
    ltr: false,
    renderBefore: () => null,
    renderAfter: () => null,
  };

  renderLabel() {
    const { label, endLabel, labelProps } = this.props;
    const { className, otherLabelProps } = labelProps;
    const typeOfLabel = typeof label;
    const typeOfEndLabel = typeof endLabel;

    if (typeOfLabel === 'undefined') { return null; }

    return (
      <div
        className={c('select-wrapper__label', className)}
        {...otherLabelProps}>
        <label className="select-wrapper__label__start">
          {typeOfLabel === 'function' ? label() : label}
        </label>
        {typeOfEndLabel !== 'undefined' &&
          <span className="select-wrapper__label__end">
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
        className="select-wrapper__error">
        {error}
      </div>
    );
  }

  render() {
    const { value, error, labelProps, wrapperProps, fullWidth, smallFullWidth, ltr, renderBefore, renderAfter, ...props } = this.props;
    const { wrapperClassName, ...otherWrapperProps } = wrapperProps;

    return (
      <div
        className={c('select-wrapper', {
          'select-wrapper--ltr': ltr
        }, wrapperClassName)}
        {...otherWrapperProps}
      >

        {renderBefore()}
        {this.renderLabel()}
        {this.renderError()}

        <ReactSelect value={value} noResultsText="نتیجه ای یافت نشد!" {...props}/>

        {renderAfter()}
      </div>
    );
  }
}

export default Select;
