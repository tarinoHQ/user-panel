import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

const themes = ['info', 'success', 'danger', 'warning'];

export class CubeGrid extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(themes)
  }

  render() {
    const { className, theme, ...props } = this.props;

    return (
      <div
        {...props}
        className={c(
          'sk-cube-grid',
          'spinner',
          {
            [`spinner--${theme}`]: theme
          },
          className
        )}
        >
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
  }
}

class Spinner extends Component {

  static propTypes = {
    spinnerName: PropTypes.oneOf(['cube-grid']).isRequired
  }

  render() {
    const { spinnerName, ...props } = this.props;

    switch (spinnerName) {
      case 'cube-grid':
        return <CubeGrid {...props} />;
      default:
        return <span>صبر کنید ...</span>;
    };
  }
}

export default Spinner;
