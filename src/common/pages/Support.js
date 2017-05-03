import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isBrowser } from '../utils/windowUtils';
import getImage from '../data/images';
import moment from 'moment';

import * as uiActions from '../actions/ui';
import * as uiSelectors from '../selectors/ui';

import TabBar from '../components/TabBar';
import Table, { TableWithSorting } from '../components/Table';

@withRouter
@connect(
  state => ({
    searchValue: uiSelectors.getSupportSearchValue(state)
  }),
  {
    setSearchValue: uiActions.setSupportSearchValue
  }
)
class Support extends Component {
  constructor(props) {
    super(props);

    this._searchChanged = this._searchChanged.bind(this);
  }

  _searchChanged(searchValue) {
    this.props.setSearchValue(searchValue);
  }

  render() {
    const { searchValue, setSearchValue, router, children } = this.props;

    return (
      <div className="page">
        <div className="page__header">
          <TabBar
            tabs={[
              { key: 'threads', title: 'درخواست های شما', onClick: () => router.push('/support/threads')},
              { key: 'new', title: 'درخواست جدید', onClick: () => router.push('/support/new')},
            ]}
            activeTab={router.isActive({ pathname: '/support/new' }) ? 'new' : 'threads'}
            searchBox={!router.isActive({ pathname: '/support/new' })}
            searchValue={searchValue}
            onSearchChange={this._searchChanged}
          />
        </div>

        <div className="page__content">
          {children}
        </div>
      </div>
    );
  }
}

export default Support;
