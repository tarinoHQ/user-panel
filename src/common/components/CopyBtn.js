import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

import CopyToClipboard from 'react-copy-to-clipboard';

class CopyBtn extends Component {
  constructor(p) {
    super(p);

    this._copied = this._copied.bind(this);
    this._copying = this._copying.bind(this);
  }

  state = {
    isCopying: false,
    copied: false
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.string
  }

  _copying() {
    this.setState({ isCopying: true });
  }

  _copied() {
    this.setState({ copied: false, isCopying: false });
  }

  render() {
    const { title, text, children, className, ...props } = this.props;

    return (
      <div className={c('copy-btn', {
        'copy-btn--copying': this.state.isCopying
      }, className)}>
        <CopyToClipboard
          text={text || ''}
          onCopy={() => {
            this.setState({ copied: true });
            setTimeout(this._copied.bind(this), 500);
            setTimeout(this._copying.bind(this), 10);
          }}>
          <button
            className="copy-btn__button">
            {title || children || 'کپی کردن'}
          </button>
        </CopyToClipboard>

        <span
          className={c('copy-btn__copied', {
            'copy-btn__copied--hidden': !this.state.copied
          })}>
          کپی شد!
        </span>
      </div>
    );
  }
}

export default CopyBtn;
