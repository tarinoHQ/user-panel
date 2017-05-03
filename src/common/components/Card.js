import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class Card extends Component {
  render() {
    const { children, className, ...props } = this.props;

    return (
      <div
        className={c('card', className)} {...props}>
        {children}
        <div className="card__clearfix"></div>
      </div>
    );
  }
}

export default Card;
