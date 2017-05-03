import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { v4 } from 'node-uuid';
import config from '../config';
import Dropbox from 'dropbox';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import IconText from '../components/IconText';
import Overlay from '../components/Overlay';
import Window from '../components/Window';
import Button from '../components/Button';

@connect(
  state => ({
    backupId: selectors.getMsBackupRestoreBackupId(state),
    isOpen: selectors.isMsBackupRestoreModalOpen(state),
    // ajax
    isRestoreFetching: selectors.isMsBackupRestoreFetching(state),
    restoreStatus: selectors.getMsBackupRestoreStatus(state),
    restoreError: selectors.getMsBackupRestoreError(state),
  }),
  {
    requestMsBackupRestore: actions.requestMsBackupRestore,
    closeMsBackupRestoreModal: actions.closeMsBackupRestoreModal,
  }
)
class BackupRestoreWindow extends Component {
  constructor(props) {
    super(props);
    this.orderId         = props.orderId;
    this.backupId        = props.backupId;
    this._closed         = this._closed.bind(this);
    this._submitClicked  = this._submitClicked.bind(this);
  }

  _submitClicked() {
    console.log('BackupRestoreWindow/_submitClicked: backupId =', this.props.backupId);
    this.props.requestMsBackupRestore(this.orderId, this.props.backupId);
    this.props.closeMsBackupRestoreModal();
  }

  _closed() {
    this.props.closeMsBackupRestoreModal();
  }

  render() {
    const { children, isOpen, isRestoreFetching, ...props } = this.props;

    return isOpen ? (
      <Window 
        isOpen={isOpen}
        className="backup-restore-window"
        title="بازگردانی پشتیبان روی سایت"
        onClose={this._closed}>

        <div className="backup-restore-window__info">
          <img className="backup-restore-window__img" src={getImage('backup-restore')} />
          <p>آیا برای بازگردانی این پشتیبان و پاک شدن اطلاعات‌ فعلی روی هاست موافقید؟</p>
        </div>

        <div className="backup-restore-window__btns">
          <Button
            iconClass="icon-cloud"
            theme="success"
            onClick={this._submitClicked}>
            بله، موافقم
          </Button>
        </div>

      </Window>
    ) : <div />;
  }
}

export default BackupRestoreWindow;
