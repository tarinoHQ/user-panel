import { formatString, toPersian } from '../utils/numberUtils';
import { Motion, spring, presets } from 'react-motion';
import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import GridPad, { GridBody, GridBar, GridCell } from '../components/GridPad';
import SectionTitle from '../components/SectionTitle';
import ComingSoon from '../components/ComingSoon';
import MessageBox from '../components/MessageBox';
import SwitchTab from '../components/SwitchTab';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';

const data = [
  { name: '۲۱/۰۳', visitors: 2, visits: 14 },
  { name: '۲۲/۰۳', visitors: 1, visits: 3 },
  { name: '۲۳/۰۳', visitors: 10, visits: 24 },
];

const CustomYAxisTick = ({ payload, index, ...props }) => {
  return (<text {...props}>{toPersian(index, true)}</text>);
};

const CustomTooltip = ({ payload, label, ...props }) => {
  return (
    <div className="service-an__chart-tooltip">
      <p>{label}</p>
      {map(payload, p => (
        <p key={v4()}>{p.name}: {toPersian(p.value, true)}</p>
      ))}
    </div>
  );
};


@withRouter
@connect(
  state => ({
    alexa: selectors.getMsAnalyseAlexa(state),
    // ajax
    isFetching: selectors.isMsAnalyseFetching(state),
    status: selectors.getMsAnalyseStatus(state),
    error: selectors.getMsAnalyseError(state),
  }),
  actions
)
class ServiceAnalyse extends Component {
  constructor(props) {
    super(props);
    this.orderId = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  state = {
    switch: 'monthly'
  }

  componentDidMount() {
    this.props.requestMsAnalyse(this.orderId);
  }

  _retryClicked() {
    this.props.requestMsAnalyse(this.orderId);
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
    const { alexa, isFetching, status, error, router, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="آمار بازدید و آنالیز سایت"
        />

        {this.renderLoading()}
        {this.renderError()}

        <h3>نمودار بازدیدها و بازدیدکنندگان</h3>

        <ComingSoon>
        <div style={{ margin: 10 }}>
          <SwitchTab
            style={{ margin: '0 auto' }}
            options={[
              {
                key: 'daily',
                label: 'روزانه',
              },
              {
                key: 'weekly',
                label: 'هفتگی',
              },
              {
                key: 'monthly',
                label: 'ماهانه',
              },
            ]}
            activeOption={this.state.switch}
            onChange={key => this.setState({ switch: key })}
          />
        </div>

        <div style={{ width: '100%', height: 300, direction: 'ltr', position: 'relative', left: -20 }}>
          <ResponsiveContainer>
            <LineChart data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <XAxis dataKey="name" />
              <YAxis tick={<CustomYAxisTick />} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="linear" dataKey="visits" name="بازدید" stroke="#8884d8" />
              <Line type="linear" dataKey="visitors" name="بازدیدکنندگان" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </ComingSoon>

        <h3>ارقام بازدیدها و بازدیدکنندگان</h3>

        <ComingSoon>
        <GridPad width="100%">
          <GridBody>
            <GridBar>
              <GridCell width="50%">بازدید امروز</GridCell>
              <GridCell>۲۳۰ بازدید</GridCell>
            </GridBar>

            <GridBar>
              <GridCell width="50%">بازدیدکننده امروز</GridCell>
              <GridCell>۲۳ نفر</GridCell>
            </GridBar>

            <GridBar>
              <GridCell width="50%">بازدید کل تا این لحظه</GridCell>
              <GridCell>۲۶۷،۶۰۰ بازدید</GridCell>
            </GridBar>

            <GridBar>
              <GridCell width="50%">بازدیدکننده کل تا این لحظه</GridCell>
              <GridCell>۳۴،۴۶۱ نفر</GridCell>
            </GridBar>
          </GridBody>
        </GridPad>
        </ComingSoon>

        <h3 style={{ marginTop: 25 }}>آنالیز اخنصاصی شما</h3>

        <h4 className="service-an__part-title">بررسی ها</h4>

        <ComingSoon>
        <IconText
          className="service-an__fact"
          color="warning"
          iconClass="icon-attention">
          معمولا بازدیدکنندگان سایت ‌شما ۵ بار از سایت بازدید می‌کنند.&nbsp;
          <Link href="#">نرخ بازگشت را افزایش دهید!</Link>
        </IconText>

        <IconText
          className="service-an__fact"
          color="danger"
          iconClass="icon-attention">
          در هفته اخیر بازدید سایت شما کاهش شدید داشته است&nbsp;
          <Link href="#">دلایل ازدست دادن کاربران چیست؟</Link>
        </IconText>

        <IconText
          className="service-an__fact"
          color="success"
          iconClass="icon-google">
          سایت شما در گوگل ثبت شده است!&nbsp;
          <Link href="#">سایتتان را در گوگل ثبت کنیم؟</Link>
        </IconText>
        </ComingSoon>

        <h4 className="service-an__part-title">رتبه در الکسا</h4>

        {alexa.country.rank != '0' && 
          <div className="service-an__alexa">
            <span className="service-an__alexa__rank">{formatString(alexa.country.rank)}</span>
            در {alexa.country.name || ''}
          </div>
        }

        {alexa.global != '0' && 
          <div className="service-an__alexa">
            <span className="service-an__alexa__rank">{formatString(alexa.global)}</span>
            در جهان
          </div>
        }

        {alexa.country.rank === '0' && alexa.global === '0' && 
          <span>داده‌ ها برای نمایش رتبه کافی نیستند.</span>  
        }

        <MessageBox
          singleLine
          blink={false}
          style={{ marginTop: 5 }}
          type="info"
          title="رتبه الکسا چیست؟">
          الکسا سرویس رتبه بندی سایت های جهان از نظر بازدید، جست‌وجو در گوگل، نرخ بازگشت کاربران و سئو می‌باشد. <Link noUnderline iconClass="icon-left-open" iconPosition="left" href="http://alexa.com">مشاهده صفحه سایت شما در الکسا</Link>
        </MessageBox>


        <h4 className="service-an__part-title">سئو و بهینه سازی</h4>

        <ComingSoon>
        <div className="service-an__seo">
          <span className="service-an__seo__percent">84%</span>
          سایت شما بهینه‌ است (بیشتر بهتر)
        </div>
        </ComingSoon>

        <MessageBox
          singleLine
          blink={false}
          style={{ marginTop: 5 }}
          type="info"
          title="سئو یا SEO چیست؟">
          سئو به معنای «بهینه‌سازی برای موتورهای جست‌وجو» است که از ۰ تا ۱۰۰ به آن نمره داده‌می‌شود.&nbsp;
          <Link noUnderline iconClass="icon-left-open" iconPosition="left" href="http://alexa.com">چگونه سئو بهتری داشته باشیم؟</Link>
        </MessageBox>

      </div>
    );
  }
}

export default ServiceAnalyse;
