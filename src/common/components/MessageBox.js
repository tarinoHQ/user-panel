import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

const iconsByType = {
  'success' : 'icon-ok',
  'warning' : 'icon-attention',
  'info'    : 'icon-lifebuoy',
  'danger'  : 'icon-cancel-1',
};

class MessageBox extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['success', 'warning', 'info', 'danger']).isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    iconClass: PropTypes.string,
    singleLine: PropTypes.bool,
    blink: PropTypes.bool,
  }

  static defaultProps = {
    singleLine: false,
    blink: true,
  }

  render() {
    const { type, title, iconClass, singleLine, blink, children, className, ...props } = this.props;

    return (
      <div
        className={c('message-box',
          {
            'message-box--single-line': singleLine,
            'message-box--blink': blink
          },
          [`message-box--${type}`],
          className
        )}
        {...props}>

        <strong className="message-box__title">
          <span className={c('message-box__title__icon', iconClass || iconsByType[type])} />
          {title}
        </strong>
        <p className="message-box__msg">{children}</p>

      </div>
    );
  }
}

export default MessageBox;
