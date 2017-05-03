import { serverLocations } from '../constants/Plans';
import React, { Component, PropTypes } from 'react';
import { plansById, planIds } from '../data/plans';
import { toPersian } from '../utils/numberUtils';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import getImage from '../data/images';
import reverse from 'lodash/reverse';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as uiActions from '../actions/ui';
import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import { Motion, presets, spring } from 'react-motion';
import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import SwitchTab from '../components/SwitchTab';
import RichRadio from '../components/RichRadio';
import IconText from '../components/IconText';
import HostPlan from '../components/HostPlan';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import HelpBtn from '../components/HelpBtn';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';
import Row from '../components/Row';
import Col from '../components/Col';


@connect(
  state => ({
    location: selectors.getMsUpgradeLocation(state),
    plan: selectors.getMsUpgradePlan(state),
    cms: selectors.getMsUpgradeCms(state),
    servicePlan: selectors.getMsPlan(state),
    // Ajax
    isPlanSending: selectors.isMsUpgradePlanSending(state),
    planError: selectors.getMsUpgradePlanStatus(state),
    planStatus: selectors.getMsUpgradePlanError(state),
    // --
    isCmsSending: selectors.isMsUpgradeCmsSending(state),
    cmsError: selectors.getMsUpgradeCmsError(state),
    cmsStatus: selectors.getMsUpgradeCmsStatus(state),
    // --
    isSummaryFetching: selectors.isMsSummaryFetching(state),
    summaryError: selectors.getMsSummaryError(state),
    summaryStatus: selectors.getMsSummaryStatus(state),
  }),
  actions,
)
@withRouter
class ServiceUpgrade extends Component {
  constructor(props) {
    super(props);
    this.orderId            = props.orderId;
    this._planChanged       = this._planChanged.bind(this);
    this._locationChanged   = this._locationChanged.bind(this);
    this._cmsChanged        = this._cmsChanged.bind(this);
    this._planSubmitClicked = this._planSubmitClicked.bind(this);
    this._cmsSubmitClicked  = this._cmsSubmitClicked.bind(this);
    this._retryClicked      = this._retryClicked.bind(this);
  }

  state = {
    isSureToChangeCms: false
  }

// setMsUpgradeLocation
// setMsUpgradePlan
// requestMsUpgradePlan
// MsUpgradePlanFailed
// MsUpgradePlanSucceed
// setMsUpgradeCms
// requestMsUpgradeCms
// MsUpgradeCmsFailed
// MsUpgradeCmsSucceed

  _planChanged(planId, selected) {
    if(selected) this.props.setMsUpgradePlan(planId);
  }

  _locationChanged(loc) {
    this.props.setMsUpgradeLocation(loc);
  }

  _cmsChanged(cmsId) {
    this.props.setMsUpgradeCms(cmsId);
  }

  isPlanSelected(pId) {
    return pId === this.props.plan;  
  }

  isCmsSelected(cId) {
    return cId === this.props.cms;  
  }

  getPlanDifferPrice() {
    const { servicePlan, plan } = this.props;
    const differ = ((plan && plansById[plan].price) || plansById[servicePlan].price) - plansById[servicePlan].price;

    return differ;
  }

  _planSubmitClicked(createInvoice) {
    this.props.requestMsUpgradePlan(this.orderId, createInvoice);
  }

  _cmsSubmitClicked() {
    this.props.requestMsUpgradeCms(this.orderId);
  }

  componentDidMount() {
    // @TODO: req service summery
  }

  _retryClicked() {
    this.props.requestMsSummary(this.orderId);
    // @TODO: req service summery
  }

  loadingStyles() {
    if (this.props.isSummaryFetching) {
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
    return !!this.props.summaryError && (
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

  renderPlans() {
    const { servicePlan } = this.props;
    const MAX_INDEX = 15;
    let servicePlanIndex = MAX_INDEX; // Last index possible
    let planIdsCopy = [ ...planIds ];

    const body = reverse(map(reverse(planIdsCopy), (pid, ind) => {
      let isServicePlan = pid === servicePlan;

      if (pid === servicePlan) {
        servicePlanIndex = ind;
      }

      return plansById[pid] &&
        ind <= servicePlanIndex &&
        (
          <div key={v4()} className="service-m__plans__cell">
            <HostPlan
              {...plansById[pid]}
              disabled={isServicePlan}
              btnText={isServicePlan ? 'پلن فعلی' : undefined}
              selected={this.isPlanSelected(pid)}
              onChoose={this._planChanged.bind(this, pid)}
            />
          </div>
        );
    }));

    servicePlanIndex = MAX_INDEX;
    return body;
  }

  renderPlanSubmit() {
    const { isPlanSending, planError, planStatus, plan, servicePlan } = this.props;
    const differPrice = this.getPlanDifferPrice();
    const faDifferPrice = toPersian(Math.sqrt(Math.pow(differPrice, 2)), true);

    let text = '';
    let onClick = null;
    if (differPrice < 0) {
      // Negetive
      text = `دریافت مابه‌تفاوت ${faDifferPrice} تومان در کیف‌پول و ارتقا`;
      onClick = () => this._planSubmitClicked(false);
    } else {
      // zero || affirmative
      text = `ایجاد فاکتور ${faDifferPrice} تومان و ارتقا`;
      onClick = () => this._planSubmitClicked(true);
    }

    return (
      <Button
        style={{ display: 'inline', marginBottom: '8px' }}
        loading={isPlanSending}
        disabled={!plan}
        theme="success"
        iconClass="icon-paper-plane"
        onClick={onClick}>
        {text}
      </Button>
    );
  }

  renderSections() {
    const { router, location, plan, cms, isPlanSending, planError, planStatus, isCmsSending, cmsError, cmsStatus, ...props } = this.props;

    return (
      <div>

        {/* --- Change Plan or Locaiton --- */}
        
        <MessageBox
          singleLine={true}
          type="info"
          title="توجه!">
          فقط می‌توانید به پلن‌های بالاتر ارتقا دهید. امکان <strong>تنزل بسته</strong> وجود ندارد.
        </MessageBox>

        <div className="service-m__loc">
          <span className="service-m__loc__label">
            کشور میزبان سرور
            <HelpBtn 
              className="hint--top hint--info hint--large" 
              aria-label="کشوری که فایل‌ها و سایتتان در سرورهای آن میزبانی شود (بعد از خرید به‌راحتی قابل تغییر است)" />
          </span>
          <span className="service-m__loc__switch">
            <SwitchTab
              options={[
                {
                  key: serverLocations.IR,
                  label: 'ایران',
                  image: getImage('iran'),
                },
                {
                  key: serverLocations.DE,
                  label: 'آلمان',
                  image: getImage('germany'),
                }
              ]}
              theme="gray"
              activeOption={location}
              onChange={this._locationChanged}
            />
          </span>
        </div>

        <div className="service-m__plans">
          {this.renderPlans()}
          <div className="clearfix" />
        </div>

        <Line style={{ margin: '20px 0' }} />

        {this.renderPlanSubmit()}
        {!!planError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {planStatus === 1 &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="success"
            iconClass="icon-ok">
            ذخیره شد!
          </IconText>
        }


        {/* --- Change CMS --- */}

        <div style={{ padding: '20px 0' }}>&nbsp;</div>
        <h3>تغییر سیستم مدیریت سایت</h3>

        <MessageBox
          style={{ marginBottom: 20 }}
          type="danger"
          title="هشدار برای نصب سیستم‌مدیریت جدید">
          برای تغییر سیستم مدیریت، <strong>تمام اطلاعات فعلی شما، پاک خواهند شد.</strong> درصورت لزوم، در بخش پشتیبانی درخواست بدهید یا با پشتیبانی تارینو (<span dir="ltr">۰۲۱ ۲۸۴ ۲۲۵ ۳۴</span>) تماس حاصل کنید.
        </MessageBox>

        <RichRadio
          checked={cms == 'none'}
          inline={true}
          className="hint--rounded hint--top"
          aria-label="سیستم‌مدیریت شما پاک خواهد‌شد."
          name="cms"
          value="none"
          title="پاک کردن سیستم"
          onChange={this._cmsChanged}
        />

        <RichRadio
          checked={cms == 'wordpress'}
          inline={true}
          className="hint--rounded hint--medium hint--top"
          aria-label="مناسب بیشتر وب‌سایت ها - عالی برای تازه‌کار"
          name="cms"
          value="wordpress"
          title="وردپرس"
          icon={getImage('wordpress')}
          onChange={this._cmsChanged}
        />

        <RichRadio
          checked={cms == 'joomla'}
          inline={true}
          className="hint--rounded hint--top"
          aria-label="مناسب بیشتر وبسایت‌ ها"
          name="cms"
          value="joomla"
          title="جوملا"
          icon={getImage('joomla')}
          onChange={this._cmsChanged}
        />

        <RichRadio
          checked={cms == 'woocommerce'}
          inline={true}
          className="hint--rounded hint--top"
          aria-label="بهترین و پراستفاده ترین فروشگاه‌ساز "
          name="cms"
          value="woocommerce"
          title="فروشگاه‌ساز ووکامرس"
          icon={getImage('woocommerce')}
          onChange={this._cmsChanged}
        />

        <RichRadio
          checked={cms == 'drupal'}
          inline={true}
          className="hint--rounded hint--top"
          aria-label="مناسب سایت‌های بزرگ"
          name="cms"
          value="drupal"
          title="دروپال"
          disabled={true}
          icon={getImage('drupal')}
          onChange={this._cmsChanged}
        />
        
        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isCmsSending}
          disabled={!cms}
          theme="success"
          iconClass="icon-paper-plane"
          onClick={this._cmsSubmitClicked}>
          درخواست نصب سیستم‌مدیریت تازه
        </Button>
        {!!cmsError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {cmsStatus === 1 &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="success"
            iconClass="icon-ok">
            ذخیره شد!
          </IconText>
        }

      </div>
    );
  }

  render() {
    const { summaryStatus } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="ارتقا سرویس"
          subtitle="جزء جزء سرویس خود را به سادگی یک کلیک ارتقا دهید"
        />

        {summaryStatus === 1 ? this.renderSections() : <div />}
        {this.renderError()}
        {this.renderLoading()}

      </div>
    );
  }
}

export default ServiceUpgrade;
