import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import c from 'rc-classnames';
import map from 'lodash/map';
import { v4 } from 'node-uuid';

import SearchBox from './SearchBox';

class TabHead extends Component {
  static propTypes = {
    tabKey: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    active: false
  }

  render() {
    let { tabKey, title, active, onClick, ...props } = this.props;

    return (
      <button
        key={tabKey}
        className={c('tab-bar__tab-head', {
          'tab-bar__tab-head--active': active
        })}
        onClick={onClick}
        {...props}>
        {title}
      </button>
    );
  }
}

class TabBar extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object),
    // example tab obj: { key: '', title: '', linkTo: '' }
    activeTab: PropTypes.string,
    searchBox: PropTypes.bool,
    optionsBar: PropTypes.bool,
    onSearchChange: PropTypes.func,
    searchValue: PropTypes.string,
  }

  static defaultProps = {
    tabs: '',
    activeTab: '',
    searchBox: false,
    searchValue: '',
    onSearchChange: () => {},
  }

  renderTabs() {
    let { tabs, activeTab } = this.props;

    return (
      <div className="tab-bar__tabs">
        {map(tabs, t => {
          return (
            <TabHead
              key={t.key}
              tabKey={t.key}
              title={t.title}
              active={t.key == activeTab}
              onClick={t.onClick} />
          );
        })}
      </div>
    );
  }

  renderSearchBox() {
    let { searchValue, onSearchChange } = this.props;

    return (
      <SearchBox
        className="tab-bar__search"
        value={searchValue}
        onChange={onSearchChange}
      />
    );
  }

  render() {
    let { tabs, activeTab, searchBox, searchValue, onSearchChange, className, ...props } = this.props;

    return (
      <div
        className={c('tab-bar', className)}
        {...props}
      >
        {this.renderTabs()}

        <div className="tab-bar__options">
          {/* TODO: options icons with bubble */}
        </div>

        {searchBox && this.renderSearchBox()}
      </div>
    );
  }
}

export default TabBar;
