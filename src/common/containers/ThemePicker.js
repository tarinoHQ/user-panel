import React, { Component, PropTypes } from 'react';
import modalIds from '../constants/ModalIds';
import { connect } from 'react-redux';

import * as uiSelectors from '../selectors/ui';
import * as actions from '../actions/themePicker';

import Overlay from '../components/Overlay';
import ThemesWindow from '../containers/ThemesWindow';
import ThemeLayoutsWindow from '../containers/ThemeLayoutsWindow';

@connect(
  state => ({
    activeModal: uiSelectors.getActiveModal(state),
  }),
  {
    request: actions.requestThemePicker
  }
)
class ThemePicker extends Component {

  componentDidMount() {
    this.props.request();
  }

  render() {
    const { activeModal } = this.props;

    if (activeModal === modalIds.THEMEPICKER_LIST) {
      return (
        <div>
          <Overlay />
          <ThemesWindow />
        </div>
      );
    } else if (activeModal === modalIds.THEMEPICKER_LAYOUTS) {
      return (
        <div>
          <Overlay />
          <ThemeLayoutsWindow />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ThemePicker;