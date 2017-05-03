import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import last from 'lodash/last';

import * as uiActions from '../actions/ui';
import * as uiSelectors from '../selectors/ui';

import TabBar from '../components/TabBar';

@withRouter
@connect(
  state => ({
    searchValue: uiSelectors.getDashboardSearchValue(state)
  }),
  {
    setSearchValue: uiActions.setDashboardSearchValue
  }
)
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._searchChanged = this._searchChanged.bind(this);
  }

  activeTab() {
    const { routes } = this.props;
    return last(routes).path;
  }

  goAndClearSearch(to) {
    this.props.setSearchValue('');
    this.props.router.push(to);
  }

  _searchChanged(searchValue) {
    this.props.setSearchValue(searchValue);
  }

  render() {
    const { children, searchValue } = this.props;

    return (
      <div className="page">
        <div className="page__header">
          <TabBar
            tabs={[
              { key: 'services', title: 'سرویس ها',
                onClick: () => this.goAndClearSearch('/dashboard/services')},
              { key: 'domains', title: 'دامنه ها', onClick: () => this.goAndClearSearch('/dashboard/domains')},
            ]}
            activeTab={this.activeTab()}
            searchBox={true}
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

export default Dashboard;
