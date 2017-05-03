import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { isBrowser } from '../utils/windowUtils';
import getImage from '../data/images';
import last from 'lodash/last';
import c from 'rc-classnames';
import moment from 'moment';

import TabBar from '../components/TabBar';
import TotalPriceBar from '../containers/TotalPriceBar';
import { StickyContainer, Sticky } from 'react-sticky';
import Table, { TableWithSorting } from '../components/Table';

@withRouter
class New extends Component {
  constructor(props) {
    super(props);
  }

  activeTab() {
    const { routes } = this.props;
    return last(routes).path;
  }

  render() {
    const { router, children } = this.props;

    return (
      <StickyContainer>
        <div className="page">

          <Sticky stickyStyle={{ zIndex: 4, boxShadow: '0 2px 7px rgba(0, 0, 0, .1)' }}>
            <div className="page__header" style={{ position: 'relative' }}>
              <TabBar
                tabs={[
                  { key: 'service', title: 'سرویس جدید', onClick: () => router.push('/new/service')},
                  { key: 'domain', title: 'ثبت دامنه', onClick: () => router.push('/new/domain')},
                  { key: 'nic', title: 'شناسه ایرنیک', onClick: () => router.push('/new/nic')},
                ]}
                activeTab={this.activeTab()}
              />

              {this.activeTab() === 'service' && 
                <TotalPriceBar />
              }
            </div>
          </Sticky>

          <div 
            className={c('page__content', { 
              'page__content--no-padding': this.activeTab() === 'service'
            })}
          >
            {children}
          </div>

        </div>
      </StickyContainer>
    );
  }
}

export default New;
