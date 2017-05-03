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
}

class DropboxWindow extends Component {
  constructor(props) {
    super(props);
  }

  openAuthWindow() {
    const dbx   = new Dropbox({ clientId: config.dropbox.appKey });
    let authUrl = dbx.getAuthenticationUrl('http://localhost:4003/dropbox/oauth2callback');
    authUrl     += '&state=' + encodeURIComponent(JSON.stringify({ token: 'debug' }));
    console.log(authUrl);
    const newWindow = window.open(authUrl, 'Dropbox', 'height=600,width=500');
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
        title="حساب دراپ‌باکس خود را متصل کنید"
        onClose={this.openAuthWindow}>

        <div className="dropbox-window__info">
          <img src={getImage('dropboxGuide')} />
          <p>باید به تارینو دسترسی ارسال فایل به دراپ‌باکس‌تان را بدهید</p>
        </div>

        <div className="dropbox-window__btns">
          <Button
            iconClass="icon-dropbox"
            theme="info"
            onClick={this.openAuthWindow}>
            بازکردن صفحه دریافت دسترسی
          </Button>
        </div>

      </Window>
    );
  }
}

export default DropboxWindow;
