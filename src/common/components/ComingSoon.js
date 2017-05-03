import React, { Component, PropTypes } from 'react';
import getImage from '../data/images';

class ComingSoon extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <div className="coming-soon">
        <div className="coming-soon__content">{children}</div>
        <div className="coming-soon__overlay">

          <div className="coming-soon__msg">
            <div className="coming-soon__msg__ic">
              <img src={getImage('calendar')} />
            </div>
            <div className="coming-soon__msg__txt">بزودی این بخش فعال می‌گردد. منتظر باشید!</div>
          </div>

        </div>
      </div>
    );
  }
}

export default ComingSoon;