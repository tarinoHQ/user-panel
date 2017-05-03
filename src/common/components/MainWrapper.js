import React, { Component, PropTypes } from 'react';

import LayoutWrapper from './LayoutWrapper';

class MainWrapper extends Component {
  render() {
    return (
      <LayoutWrapper className="main-wrapper" {...this.props} />
    );
  }
}

export default MainWrapper;

export class MainWrapperBox extends Component {
  render() {
    return (
      <div className="main-wrapper__box" {...this.props} />
    );
  }
}
