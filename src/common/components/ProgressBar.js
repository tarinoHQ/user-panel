import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import c from 'rc-classnames';

const calcPrecent = (progress, max) => {
  const precent = progress * 100 / max;
  if (precent.toString().indexOf(".") === -1) {
    return precent;
  } else {
    return parseFloat(precent).toFixed(1);
  }
};

class ProgressBar extends Component {

  static propTypes = {
    size: PropTypes.oneOf(['normal', 'slim', 'thick']),
    theme: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    textAlign: PropTypes.oneOf(['right', 'left']),
    progress: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    size: 'normal',
    theme: 'info',
    textAlign: 'left',
    progress: 20,
    max: 100,
    label: (progress, max) => toPersian(calcPrecent(progress, max)) + '%',
    fullWidth: false,
  }

  render() {
    const { size, theme, progress, textAlign, max, label, fullWidth, className, style, ...props } = this.props;
    const precent = calcPrecent(progress, max);
    const ownStyles = {
      textAlign: textAlign,
    };

    return (
      <div
        className={c(
          'progress-bar',
          `progress-bar--${theme}`,
          `progress-bar--${size}`, {
            'progress-bar--full-width': fullWidth
          },
          className
        )}
        style={{ ...ownStyles, ...style }}
        {...props}>

        {label &&
          <div
            className="progress-bar__label">
            {label(progress, max)}
          </div>
        }

        <div className="progress-bar__bar">
          <div
            className="progress-bar__bar__progress"
            style={{ width: precent + '%' }} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
