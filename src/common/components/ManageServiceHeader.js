import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getImage from '../data/images';

import ServiceItem from './ServiceItem';
import IconText from './IconText';
import CopyBtn from './CopyBtn';
import Button from './Button';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';


@connect(
  state => ({
    // -- summary
    url: selectors.getMsDomain(state),
    description: selectors.getMsDescription(state),
    isFetching: selectors.isMsSummaryFetching(state),
    // -- create login
    isCreateLoginFetching: selectors.isMsCreateLoginFetching(state),
    createLoginError: selectors.getMsCreateLoginError(state),
    createLoginStatus: selectors.getMsCreateLoginStatus(state),
    // -- do backup
    isDoBackupFetching: selectors.isMsDoBackupFetching(state),
    doBackupError: selectors.getMsDoBackupError(state),
    doBackupStatus: selectors.getMsDoBackupStatus(state),
  }),
  actions
)
class ManageServiceHeader extends Component {
  constructor(props) {
    super(props);
    this.orderId        = props.orderId;
    this._loginClicked  = this._loginClicked.bind(this);
    this._backupClicked = this._backupClicked.bind(this);
  }

  _loginClicked() {
    this.props.requestMsCreateLogin(this.orderId);
  }

  _backupClicked() {
    this.props.requestMsDoBackup(this.orderId);
  }

  renderMsg() {
    const { isCreateLoginFetching, createLoginError, createLoginStatus, isDoBackupFetching, doBackupError, doBackupStatus, ...props } = this.props;

    if (isCreateLoginFetching || isDoBackupFetching) { 
      return (
        <div className="manage-service-header__msg manage-service-header__msg--info">
          درحال ارسال درخواست ...
        </div>
      );
    } else 
    if (createLoginStatus === 1 || doBackupStatus === 1) { 
      return (
        <div className="manage-service-header__msg manage-service-header__msg--success">
          {
            createLoginStatus === 1 ?
              'پنل در تب جدید باز شد.'
              : 'درخواست ارسال شد.'
          }
        </div>
      );
    } else 
    if (createLoginError !== null || createLoginError !== null) { 
      return (
        <div className="manage-service-header__msg manage-service-header__msg--danger">
          خطا
        </div>
      );
    }
  }

  render() {
    const { 
      url, 
      description, 
      // --
      isCreateLoginFetching, 
      createLoginError,
      createLoginStatus, 
      // --
      isDoBackupFetching, 
      doBackupError,
      doBackupStatus, 
      ...props 
    } = this.props;

    return (
      <div className="manage-service-header" {...props}>
        <ServiceItem
          className="manage-service-header__service"
          imageSize="big"
          name={url || `سرویس کد ${toPersian(this.orderId)}`}
          description={description}
          pic={getImage('host')}
          url={url} />


        <div className="manage-service-header__button">
          <Button
            noBg
            style={{ display: 'inline' }}
            disabled={doBackupStatus === 1}
            loading={isDoBackupFetching}
            theme="info"
            iconClass="icon-download-cloud"
            onClick={this._backupClicked}>
            پشتیبان‌گیری از سایت
          </Button>
          {/*{!!doBackupError &&
            <IconText
              style={{ display: 'inline', marginRight: '8px' }}
              color="warning"
              iconClass="icon-attention">
              خطا رخ داد.
            </IconText>
          }
          {doBackupStatus === 1 &&
            <IconText
              style={{ display: 'inline', marginRight: '8px' }}
              color="success"
              iconClass="icon-ok">
              درخواست ارسال شد.
            </IconText>
          }*/}


          <Button
            style={{ display: 'inline', marginRight: 10 }}
            loading={isCreateLoginFetching}
            theme="info"
            iconClass="icon-desktop"
            onClick={this._loginClicked}>
            ورود به پنل هاست
          </Button>
          {/*{!!createLoginError && 
            <IconText
              style={{ display: 'inline', marginRight: '8px' }}
              color="warning"
              iconClass="icon-attention">
              خطا در ورود
            </IconText>
          }*/}
          
        </div>

        {this.renderMsg()}
        
      </div>
    );
  }
}

export default ManageServiceHeader;
