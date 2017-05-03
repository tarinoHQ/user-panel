import React, { Component, PropTypes } from 'react';
import { stripScripts } from '../utils/securityUtils';
import modalIds from '../constants/ModalIds';
import getImage from '../data/images';
import { connect } from 'react-redux';
import map from 'lodash/map';

import * as uiActions from '../actions/ui';
import * as uiSelectors from '../selectors/ui';
import * as actions from '../actions/themePicker';
import * as selectors from '../selectors/themePicker';

import ThemePrice from '../components/ThemePrice';
import ThemeInfo from '../components/ThemeInfo';
import RichRadio from '../components/RichRadio';
import IconText from '../components/IconText';
import Overlay from '../components/Overlay';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Window from '../components/Window';
import Link from '../components/Link';

@connect(
  state => ({
    layouts: selectors.getLayouts(state),
    layoutsById: selectors.getLayoutsById(state),
    themesById: selectors.getThemesById(state),
    selectedLayout: selectors.getSelectedLayout(state),
    selectedTheme: selectors.getSelectedTheme(state),
    // ui
    isOpen: uiSelectors.getActiveModal(state) === modalIds.THEMEPICKER_LAYOUTS,
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
class ThemeLayoutsWindow extends Component {
  constructor(props) {
    super(props);
    this._closeClicked  = this._closeClicked.bind(this);
    this._backClicked   = this._backClicked.bind(this);
    this._retryClicked  = this._retryClicked.bind(this);
    this._layoutChanged = this._layoutChanged.bind(this);
    this._picked        = this._picked.bind(this);
  }

  static defaultProps = {
    themesById: {}
  };

  _closeClicked() {
    this.props.removeActiveModal();
  }

  _retryClicked() {
    this.props.requestThemePicker();
  }

  _backClicked() {
    this.props.setActiveModal(modalIds.THEMEPICKER_LIST);
  }

  _layoutChanged(id) {
    this.props.setThemeLayout(id);
  }

  _picked() {
    this.props.removeActiveModal();
    this.props.pickTheme();
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
    const { themesById, selectedTheme, selectedLayout, layouts, layoutsById } = this.props;
    const theme = themesById[selectedTheme];

    return (
      <div className="th-layouts-window">

        <div className="th-layouts-window__side">
          <ThemePrice
            price={parseInt(theme.price) / 1000}
            demoLink={theme.demoLink}
            onOrderClick={this._picked} />
          <ThemeInfo 
            browserSupport={theme.browserSupport}
            responsive={theme.responsive}
            columns={theme.columns}
            useCase={theme.usage}
            layoutsCount={theme.layoutCount} />
        </div>
        
        <div className="th-layouts-window__content">

          <div className="th-layouts-window__layouts-title">
            <h3>یک چیدمان از قالب «{theme.title}» انتخاب کنید</h3>
          </div>

          {map(layouts, (ly, i) => (
            <RichRadio
              key={ly.id}
              inline={true}
              title={ly.title}
              name="layouts"
              value={ly.id}
              checked={ly.id === selectedLayout}
              onChange={this._layoutChanged}
            />
          ))}

          {!selectedLayout ||
            <div className="th-layouts-window__preview">
              برای مشاهده پیش‌نمایش زنده چیدمان، <Link noUnderline target="_blank" href={layoutsById[selectedLayout].demoLink}>{layoutsById[selectedLayout].title}</Link> را ببینید.
            </div>
          }

          <div className="th-layouts-window__banner">
            <img src={theme.banner} />
          </div>

          <div 
            className="th-layouts-window__details" 
            dangerouslySetInnerHTML={{ __html: stripScripts(theme.details) }}>
          </div>

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
        title="یکی از چیدمان های قالب را برگزینید"
        backLink="بازگشت به بخش انتخاب قالب"
        onClose={this._closeClicked}
        onBackClick={this._backClicked}
        isOpen={isOpen}>
        {content}
      </Window>
    );
  }
}

export default ThemeLayoutsWindow;