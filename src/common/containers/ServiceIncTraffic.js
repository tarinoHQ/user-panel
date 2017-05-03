import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import getImage from '../data/images';
import c from 'rc-classnames';
import map from 'lodash/map';

import SectionTitle from '../components/SectionTitle';
import InfoBox from '../components/InfoBox';
import Link from '../components/Link';

@withRouter
class ServiceIncTraffic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { router, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="افزایش مخاطبین سایت"
          subtitle="راه‌کارهای فوق‌العاده مفید و ضروری برای افزایش کاربران و بازدیدکنندگان سایت"
        />

        <InfoBox
          image={getImage('megaphone')}
          step="مرحله اول:"
          title="تبلیغات در سایت های معتبر"
          excerpt="امروزه انواع مختلفی از تبلیغات از جمله تبلیغات کلیکی، تبلیغات متنی یا ریپورتاژ آگهی در معرفی سایت مفید هستند."
          content={() => (
            <div style={{ paddingTop: 20 }}>
              <div style={{ margin: '10px 0' }}>
                شما باید برای معروف شدن خودتون رو بکشید.
              </div>
              <div style={{ paddingBottom: 8 }}>
                <Link
                  noUnderline
                  href="http://anetwork.com"
                  iconClass="icon-left">
                  تبلیغات کلیکی با ای‌نِتورک (Anetwork)
                </Link>
              </div>
              <div style={{ paddingBottom: 8 }}>
                <Link
                  noUnderline
                  href="http://anetwork.com"
                  iconClass="icon-left">
                  ریپورتاژ آگهی چیست؟ کجا و چگونه ریپورتاژ آگهی کنم؟
                </Link>
              </div>
            </div>
          )}
        />

        <InfoBox
          image={getImage('megaphone')}
          step="مرحله اول:"
          title="تبلیغات در سایت های معتبر"
          excerpt="امروزه انواع مختلفی از تبلیغات از جمله تبلیغات کلیکی، تبلیغات متنی یا ریپورتاژ آگهی در معرفی سایت مفید هستند."
          content={() => (
            <div style={{ paddingTop: 20 }}>
              <div style={{ margin: '10px 0' }}>
                شما باید برای معروف شدن خودتون رو بکشید.
              </div>
              <div style={{ paddingBottom: 8 }}>
                <Link
                  noUnderline
                  href="http://anetwork.com"
                  iconClass="icon-left">
                  تبلیغات کلیکی با ای‌نِتورک (Anetwork)
                </Link>
              </div>
              <div style={{ paddingBottom: 8 }}>
                <Link
                  noUnderline
                  href="http://anetwork.com"
                  iconClass="icon-left">
                  ریپورتاژ آگهی چیست؟ کجا و چگونه ریپورتاژ آگهی کنم؟
                </Link>
              </div>
            </div>
          )}
        />

      </div>
    );
  }
}

export default ServiceIncTraffic;
