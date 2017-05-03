import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import getImage from '../data/images';
import { connect } from 'react-redux';

import * as selectors from '../selectors/themePicker';
import * as actions from '../actions/themePicker';

@connect(
  state => ({
    pickedLayoutDetails: selectors.getPickedLayoutDetails(state),
    pickedThemeDetails: selectors.getPickedThemeDetails(state),
    pickedTheme: selectors.getPickedTheme(state),
  }),
  {
    unpickTheme: actions.unpickTheme
  }
)
class SelectedTheme extends Component {
  constructor(props) {
    super(props);
    this._deleteClicked = this._deleteClicked.bind(this);
  }

  _deleteClicked() {
    this.props.unpickTheme();
  }

  get price() {
    const p = parseInt(this.props.pickedThemeDetails.price);
    if (p > 0) {
      return `${toPersian(p / 1000)} هزارتومان`;
    } else {
      return 'رایگان';
    }
  }

  render() {
    const { pickedLayoutDetails, pickedThemeDetails, pickedTheme } = this.props;
 
    return pickedTheme ? (
      <div className="selected-theme">
        <div className="selected-theme__pic"><img src={pickedLayoutDetails.pic} /></div>
        <div className="selected-theme__txt">
          <div className="selected-theme__theme">قالب {pickedThemeDetails.title}</div>
          <div className="selected-theme__layout">چیدمان {pickedLayoutDetails.title}</div>
          <div className="selected-theme__price">
            {this.price}
          </div>
        </div>
        <div className="selected-theme__del" onClick={this._deleteClicked}>حذف</div>
        <div className="clearfix"></div>
      </div>
    ) : <div />;
  }
}

export default SelectedTheme;