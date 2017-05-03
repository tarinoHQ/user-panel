import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

export class GridHead extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <thead className={c('grid-pad__head', className)} {...props}>
        {children}
      </thead>
    );
  }
}

export class GridBody extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <tbody className={c('grid-pad__body', className)} {...props}>
        {children}
      </tbody>
    );
  }
}

export class GridCell extends Component {
  render() {
    const { bottom, middle, children, className, ...props } = this.props;

    return (
      <td
        className={c('grid-pad__cell', {
          'grid-pad__cell--bottom': bottom,
          'grid-pad__cell--middle': middle,
        }, className)}
        {...props}>
        {children}
      </td>
    );
  }
}

export class GridBar extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <tr className={c('grid-pad__bar', className)} {...props}>
        {children}
      </tr>
    );
  }
}

class GridPad extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <table className={c('grid-pad', className)} {...props}>
        {children}
      </table>
    );
  }
}

export default GridPad;
