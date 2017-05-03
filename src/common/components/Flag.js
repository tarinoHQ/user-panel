import React, { Component, PropTypes } from 'react';
import getImage from '../data/images';

class Flag extends Component {
  render() {
    const { country, bg, ...props } = this.props;

    return (
      <div className={`flag ${bg && 'flag--has-bg'}`}>
        <img src={getImage(country || '')} className="flag__img" />
        {this.props.children}
      </div>
    );
  }
}

export default Flag;
