import { generateDriveUrl } from '../utils/driveUtils';
import React, { Component, PropTypes } from 'react';
import getImage from '../data/images';
import config from '../config';
import Dropbox from 'dropbox';
import c from 'rc-classnames';
import map from 'lodash/map';

import IconText from '../components/IconText';
import Overlay from '../components/Overlay';
import Window from '../components/Window';
import Button from '../components/Button';

function handlePopupResult(result) {
  alert('result of popup is: ' + result);
};

class DriveWindow extends Component {
  constructor(props) {
    super(props);
  }

  openAuthWindow() {
    const authUrl = generateDriveUrl({
      scope: ['https://www.googleapis.com/auth/drive'],
      state: JSON.stringify({ token: 'debug' }),
      redirectUrl: 'http://oclouds.ir:4003/drive/oauth2callback',
      clientId: '600768760793-sqqee9fs5tdlovomudc00g2ipr0r98k3.apps.googleusercontent.com'
    });
    console.log(authUrl);
    const newWindow = window.open(authUrl, 'Google', 'height=600,width=500');
    if (window.focus) {
      newWindow.focus();
    }
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Window 
        isOpen={true}
        className="dropbox-window"
        title="حساب گوگل‌درایو خود را متصل کنید"
        onClose={this.openAuthWindow}>

        <div className="dropbox-window__info">
          <img src={getImage('dropboxGuide')} />
          <p>باید به تارینو دسترسی ارسال فایل به حساب درایو خود را بدهید</p>
        </div>

        <div className="dropbox-window__btns">
          <Button
            iconClass="icon-google"
            theme="info"
            onClick={this.openAuthWindow}>
            بازکردن صفحه دریافت دسترسی
          </Button>
        </div>

      </Window>
    );
  }
}

export default DriveWindow;
