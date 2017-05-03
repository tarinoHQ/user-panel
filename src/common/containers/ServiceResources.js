import { serverLocations } from '../constants/Plans';
import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import GridPad, { GridBar, GridCell, GridBody } from '../components/GridPad';
import { Motion, presets, spring } from 'react-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';
import ComingSoon from '../components/ComingSoon';
import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from '../components/Link';
import Card from '../components/Card';
import Flag from '../components/Flag';

@connect(
  state => ({
    // Ajax
    isFetching: selectors.isMsSummaryFetching(state),
    status: selectors.getMsSummaryStatus(state),
    error: selectors.getMsSummaryError(state),
  }),
  actions
)
@withRouter
class ServiceResources extends Component {
  constructor(props) {
    super(props);
    this.orderId       = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  _retryClicked() {
    this.props.requestMsSummary(this.orderId);
  }

  loadingStyles() {
    if (this.props.isFetching) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: 0,
        scale: 0,
      };
    }
  }

  renderLoading() {
    return (
      <Motion style={this.loadingStyles()}>
        {v =>
          <div
            key={v4()}
            className="page__loading"
            style={{
              display: v.opacity == 0 ? 'none' : 'block',
              transform: `scale(${v.scale})`,
              opacity: v.opacity,
            }}>
            <Spinner
              className="page__loading__spinner"
              theme="info"
              spinnerName="cube-grid" />
            <span className="page__loading__text">درحال بارگذاری اطلاعات ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.error && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد.</IconText>
          <Button
            style={{ margin: '0 10px' }}
            theme="warning"
            onClick={this._retryClicked}>
            تلاش دوباره
          </Button>
      </div>
    );
  }

  render() {
    const { isFetching, error, status, router, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="مصرف منابع"
          subtitle="تمام اطلاعات حیاتی سرویس شما یکجا روی میز!"
        />

        {this.renderError()}
        {isFetching ? this.renderLoading() : status === 1 && <DataTable />}

      </div>
    );
  }
}

export default ServiceResources;


// -- Data Table
@connect(
  state => ({
    location: selectors.getMsLocation(state),
    suspendedStatus: selectors.getMsSuspendedStatus(state),
    diskUsedMb: selectors.getMsDiskUsedMb(state),
    diskLimitMb: selectors.getMsDiskLimitMb(state),
    cpuPercent: selectors.getMsCpuPercent(state),
    memoryPercent: selectors.getMsMemoryUsagePercent(state),
  }),
  actions
)
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.orderId = props.orderId;
  }

  renderFlag(location) {
    switch (location) {
      case serverLocations.IR:
        return <Flag bg country="iran">ایران</Flag>;
      case serverLocations.DE:
        return <Flag bg country="germany">آلمان</Flag>;
      default:
        return <div />;
    }
  }

  renderStatus(suspendedStatus) {
    if(suspendedStatus === 1) {
      return <span className="service-res__status service-res__status--disable">غیرفعال</span>;
    } else {
      return <span className="service-res__status service-res__status--enable">فعال</span>;
    }
  }

  renderCpuStatusMsg(cpuPercent) {
    if (cpuPercent < 65) { 
      return (
        <p className="service-res__status-msg service-res__status-msg--good">
            این مقدار پردازش کاملا مناسب است. 😎
        </p>
      );
    }
    else if (cpuPercent < 80) {
      return (
        <p className="service-res__status-msg service-res__status-msg--warning">
            ممکن است به‌زودی با مشکل مواجه شوید. 😐 مواظب باشید. 
        </p>
      );
    }
    else if (cpuPercent <= 95) {
      return (
        <p className="service-res__status-msg service-res__status-msg--danger">
            سرویس شما زیر فشار است. 😟 آن را ارتقا دهید یا موقتا غیر فعال کنید. 
        </p>
      );
    }
    else if (cpuPercent <= 100) {
      return (
        <p className="service-res__status-msg service-res__status-msg--danger">
          ممکن است سرویس شما با مشکلاتی مواجه شود. 😖 با پشتیبانی تماس حاصل کنید: 
          <span dir="ltr">۰۲۱ ۲۸۴۲ ۲۵۳۴</span>
        </p>
      );
    }
  }

  renderStatusBtn(suspendedStatus) {
    if(suspendedStatus === 1) {
      return (
        <Button
          theme="success"
          iconClass="icon-off">
          فعال کردن
        </Button>
      );
    } else {
      return (
        <Button
          theme="danger"
          iconClass="icon-off">
          غیرفعال کردن (بستن دسترسی به سایت)
        </Button>
      );
    }
  }

  render() {
    const { location, suspendedStatus, diskUsedMb, diskLimitMb, cpuPercent, memoryPercent, ...props } = this.props;

    return (
      <div>
        <GridPad>
          <GridBody>

            <GridBar>
              <GridCell middle>وضعیت سرور:</GridCell>
              <GridCell>
                {this.renderFlag(location)}
                &nbsp;&nbsp;&nbsp;
                {this.renderStatus(suspendedStatus)}
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell bottom>فضای هاست:</GridCell>
              <GridCell>
                <ProgressBar
                  size="normal"
                  theme="success"
                  progress={parseInt((diskUsedMb * 100 / diskLimitMb).toFixed(0))}
                  label={p => <span>{diskUsedMb}<sup>MB</sup> / {diskLimitMb}<sup>MB</sup></span>}
                />
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell bottom>مصرف رم:</GridCell>
              <GridCell>
                <ProgressBar
                  size="normal"
                  theme="warning"
                  progress={parseInt(memoryPercent)}
                />
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell bottom>مصرف CPU:</GridCell>
              <GridCell>
                <ProgressBar
                  size="normal"
                  theme="info"
                  progress={parseInt(cpuPercent)}
                />
                {this.renderCpuStatusMsg(cpuPercent)}
              </GridCell>
            </GridBar>

            
            <GridBar>
              <GridCell width="20%">تعداد افراد آنلاین:</GridCell>
              <GridCell>
                {/*۱۰ نفر بازدید کننده*/}
                افراد آنلاین شمارش نشده‌اند.
                <p className="service-res__status-msg service-res__status-msg--danger">
                  {/*سرویس شما این تعداد فرد آنلاین را به‌خوبی پشتیبانی می‌کند*/}
                  به‌زودی تعداد نمایش داده می‌شود.
                </p>
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell>وضعیت دسترسی</GridCell>
              <GridCell>
                {this.renderStatusBtn(suspendedStatus)}
                <p className="service-res__disable-hint">
                  با غیرفعال کردن، سایت از دسترس کاربران خارج می‌شود اما فایل ها و سایت شما دست‌نخورده باقی می‌ماند. اگر سایت شما به دلیل بازدید بیش‌ازحد یا حملات مخرب زیر فشار است، سرویس را موقتا غیرفعال کنید.
                </p>
              </GridCell>
            </GridBar>
            
          </GridBody>
        </GridPad>
      </div>
    );
  }
}