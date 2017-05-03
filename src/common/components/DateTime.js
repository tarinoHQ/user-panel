import React, { Component, PropTypes } from 'react';
import moment from 'moment-jalaali';
import c from 'rc-classnames';

class DateTime extends Component {

  static propTypes = {
    time: PropTypes.number.isRequired
  }

  static defaultProps = {
    hintPosition: 'top'
  }

  render() {
    const { time, hintPosition, className, ...props } = this.props;
    const momentTime = moment(time).locale('fa');

    return (
      <span
        className={c('datetime', `hint--${hintPosition}`, className)}
        aria-label={momentTime.format('h:m:s jYYYY/jM/jD')}
        {...props}
      >
        <time dateTime={momentTime.toISOString()}></time>
        {momentTime.fromNow()}
      </span>
    );
  }
}

export default DateTime;
