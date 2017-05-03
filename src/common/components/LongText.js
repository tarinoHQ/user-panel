import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import CopyBtn from './CopyBtn';

class LongText extends Component {
  constructor(props) {
    super(props);
    this._toggled = this._toggled.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.string.isRequired,
    copyBtn: PropTypes.bool,
    textToCopy: PropTypes.string,
    direction: PropTypes.string,
    tooltip: PropTypes.string,
  };

  state = { 
    isOpen: false
  };

  _toggled() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children, maxWidth, copyBtn, textToCopy, direction, tooltip, ...props } = this.props;
    const { isOpen } = this.state;

    return (
      <div 
        {...props} 
        className={c('long-text', { 'long-text--ltr': direction === 'ltr' })}>

        <span
          className="hint--top"
          aria-label={tooltip}>
          <div
            className="long-text__short hint--top"
            style={{ maxWidth: maxWidth }}
            onClick={this._toggled}>
            {children}
            <div className="long-text__short__shadow" />
          </div>
        </span>

        {isOpen && 
          <div className="long-text__pop">
            {children}
            {copyBtn && <CopyBtn text={textToCopy || children} />}
          </div>
        }

      </div>
    );
  }
}

export default LongText;