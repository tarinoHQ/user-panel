import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { connect } from 'react-redux';

import * as selectors from '../selectors/services';

import TopBar from '../components/TopBar';

const s = {
  topBar: {
    minHeight: 45,
    lineHeight: '45px',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    marginLeft: 10,
  },
  price: {
    color: '#7c3294',
  },
};

@connect(
  state => ({
    total: selectors.getNewServiceTotal(state),
  }),
  undefined
)
class TotalPriceBar extends Component {
  render() {
    const { total } = this.props;

    return (
      <TopBar style={s.topBar}>
        <span style={s.label}>جمع کل سرویس</span>
        <span style={s.price}>{toPersian(total, true)} تومان</span>
      </TopBar>
    );
  }
}

export default TotalPriceBar;