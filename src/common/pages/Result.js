import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import ResultOk from '../components/ResultOk';

@withRouter
class Result extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="page">
        <div className="page__content">
          {children}
        </div>
      </div>
    );
  }
}

export default Result;
