import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import c from 'rc-classnames';
import map from 'lodash/map';

import DateTime from '../components/DateTime';
import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import ComingSoon from '../components/ComingSoon';
import HelpBtn from '../components/HelpBtn';
import SshBox from '../components/SshBox';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@withRouter
class ServiceAdvanced extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { router, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="امکانات حرفه‌ای"
          subtitle="امکاناتی که باعث امنیت و سرعت بیشتر سایت شما می‌شوند"
        />

        {/*<SshBox></SshBox>*/}

        <ComingSoon>

          <h3>تنظیمات کِلودفِلِر (Cloudflare) <HelpBtn className="hint--top" aria-label="کلودفلر چیست؟" href="#"/></h3>

          <Button
            iconClass="icon-cloud"
            theme="info">
            اتصال به کلوفلر تارینو
          </Button>

          <span style={{ display: 'inline-block', padding: '0 20px' }}>یا</span>

          <Button
            iconClass="icon-user"
            theme="success">
            اتصال به کلوفلر شخصی‌تان
          </Button>

          <Line style={{ marginTop: 25, marginBottom: 25 }} />
          <h3>IP اختصاصی</h3>
          <p>برای خرید آی‌پی اختصاصی می‌توانید از این بخش اقدام کنید.</p>

          <Line style={{ marginTop: 25, marginBottom: 25 }} />
          <h3>DNS اختصاصی</h3>
          <p>نام‌سرور اختصاصی مزایای بسیاری دارد. پس همین حالا یک DNS اختصاصی سفارش دهید.</p>

        </ComingSoon>


      </div>
    );
  }
}

export default ServiceAdvanced;
