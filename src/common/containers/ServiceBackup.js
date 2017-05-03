import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import last from 'lodash/last';
import c from 'rc-classnames';
import map from 'lodash/map';

import DropboxWindow from '../components/DropboxWindow';
import SectionTitle from '../components/SectionTitle';
import DriveWindow from '../components/DriveWindow';
import Overlay from '../components/Overlay';
import TabBar from '../components/TabBar';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';

@withRouter
class ServiceBackup extends Component {
  constructor(props) {
    super(props);
    this.orderId = props.orderId;
  }

  activeTab() {
    const { routes } = this.props;
    return last(routes).path;
  }

  render() {
    const { router, params, children, ...props } = this.props;

    return (
      <div>
        <TabBar
          tabs={[
            { key: 'list', title: 'پشتیبان‌ها',
              onClick: () => router.push(`/services/${params.id}/backup/list`)},
            { key: 'upload', title: 'بازگردانی از فایل',
              onClick: () => router.push(`/services/${params.id}/backup/upload`)},
            { key: 'starred', title: 'ستاره‌دار ها',
              onClick: () => router.push(`/services/${params.id}/backup/starred`)},
          ]}
          activeTab={this.activeTab()}
        />

        {React.cloneElement(children, { orderId: this.orderId })}

        {/* 
          <Overlay />
          <DriveWindow /> 
          <DropboxWindow /> 
        */}
      </div>
    );
  }
}

export default ServiceBackup;
