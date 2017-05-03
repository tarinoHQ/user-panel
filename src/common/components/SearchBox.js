import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class SearchBox extends Component {
  constructor(p) {
    super(p);
    this.state = {
      isFocused: false
    };

    this._inputChanged = this._inputChanged.bind(this);
    this._inputFocused = this._inputFocused.bind(this);
    this._inputBlured = this._inputBlured.bind(this);
  }

  static propTypes = {
    mode: PropTypes.oneOf(['normal', 'wide']),
    iconPosition: PropTypes.oneOf(['right', 'left']),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    mode: 'normal',
    iconPosition: 'left',
    placeholder: 'جست‌وجو کنید...',
    value: '',
    onChange: () => {},
  }

  _inputChanged(e) {
    this.props.onChange(e.target.value);
  }

  _inputFocused() {
    this.setState({ isFocused: true });
  }

  _inputBlured() {
    this.setState({ isFocused: false });
  }

  render() {
    let { value, onChange, mode, iconPosition, placeholder, className, ...props } = this.props;

    return (
      <div
        className={c(
          'search-box',
          className,
          [`search-box--btn-${iconPosition}`], {
            'search-box--empty': value === '',
            'search-box--focused': this.state.isFocused,
          })}
        {...props}>

        <div className="search-box__input-wrapper">
          <label className="search-box__input-label">{placeholder}</label>
          <input
            className="search-box__input"
            type="text"
            value={value}
            onChange={this._inputChanged}
            onBlur={this._inputBlured}
            onFocus={this._inputFocused} />
        </div>

        <button className="search-box__button">
          <i className="icon-search" />
        </button>

      </div>
    );
  }
}

export default SearchBox;
