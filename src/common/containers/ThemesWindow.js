import React, { Component, PropTypes } from 'react';
import modalIds from '../constants/ModalIds';
import { connect } from 'react-redux';
import map from 'lodash/map';

import * as uiActions from '../actions/ui';
import * as uiSelectors from '../selectors/ui';
import * as actions from '../actions/themePicker';
import * as selectors from '../selectors/themePicker';

import ThemeCats from '../containers/ThemeCats';
import IconText from '../components/IconText';
import Overlay from '../components/Overlay';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Window from '../components/Window';
import Theme from '../components/Theme';

@connect(
  state => ({
    themes: selectors.getThemes(state),
    catsById: selectors.getCatsById(state),
    activeCat: selectors.getActiveCat(state),
    // ui
    isOpen: uiSelectors.getActiveModal(state) === modalIds.THEMEPICKER_LIST,
    // ajax
    isFetching: selectors.isFetching(state),
    status: selectors.getStatus(state),
    error: selectors.getError(state),
  }),
  {
    ...actions,
    removeActiveModal: uiActions.removeActiveModal,
    setActiveModal: uiActions.setActiveModal
  }
)
class ThemesWindow extends Component {
  constructor(props) {
    super(props);
    this._closeClicked = this._closeClicked.bind(this);
    this._retryClicked = this._retryClicked.bind(this);
  }

  static defaultProps = {
    themes: {}
  };

  _retryClicked() {
    this.props.requestThemePicker();
  }

  _closeClicked() {
    this.props.removeActiveModal();
  }

  _themeClicked(id) {
    console.log('Theme ID:', id);
    this.props.setTheme(id);
    this.props.setActiveModal(modalIds.THEMEPICKER_LAYOUTS);
  }

  renderLoading() {
    return (
      <div className="page__loading">
        <Spinner
          className="page__loading__spinner"
          theme="info"
          spinnerName="cube-grid" />
      </div>
    );
  }

  renderError() {
    return (
      <div className="page__error">
        <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد...</IconText>
        <Button
          style={{ margin: '0 10px' }}
          theme="warning"
          onClick={this._retryClicked}>
          تلاش دوباره
        </Button>
      </div>
    );
  }

  renderWindow() {
    const { themes, catsById, activeCat } = this.props;

    return (
      <div className="themes-window">
      
        <div className="themes-window__side">
          <ThemeCats />
        </div>
        
        <div className="themes-window__content">

          {map(themes, ({ catIds, ...th }) => (
            (activeCat === '0' || catIds.indexOf(activeCat) > -1) &&
              <Theme
                key={th.id}
                cats={map(catIds, catId => catsById[catId] && catsById[catId].title)}
                {...th}
                onMoreClick={() => this._themeClicked(th.id)}
              />
          ))}

        </div>

      </div>
    );
  }

  render() {
    const { isOpen, isFetching, error, status } = this.props;

    let content;

    if (isFetching) {
      content = this.renderLoading();
    } else if (status !== 1) {
      content = this.renderError();
    } else {
      content = this.renderWindow();
    }

    return (
      <Window 
        title="یک قالب انتخاب کنید"
        onClose={this._closeClicked}
        isOpen={isOpen}>
        {content}
      </Window>
    );
  }
}

export default ThemesWindow;