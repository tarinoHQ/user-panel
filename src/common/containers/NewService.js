import { serverLocations } from '../constants/Plans';
import React, { Component, PropTypes } from 'react';
import { plansById, planIds } from '../data/plans';
import { domainTypes } from '../constants/Orders';
import { toPersian } from '../utils/numberUtils';
import { addons } from '../constants/Orders';
import modalIds from '../constants/ModalIds';
import { addonsById } from '../data/addons';
import { cmsIds } from '../constants/Cms';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as uiActions from '../actions/ui';
import * as actions from '../actions/services';
import * as selectors from '../selectors/services';
import * as domainSelectors from '../selectors/domains';

import { StickyContainer, Sticky } from 'react-sticky';
import SectionTitle from '../components/SectionTitle';
import ThemePicker from '../containers/ThemePicker';
import MessageBox from '../components/MessageBox';
import HugeButton from '../components/HugeButton';
import RichRadio from '../components/RichRadio';
import SwitchTab from '../components/SwitchTab';
import HostPlan from '../components/HostPlan';
import Checkbox from '../components/Checkbox';
import DomainChooser from './DomainChooser';
import SelectedTheme from './SelectedTheme';
import HelpBtn from '../components/HelpBtn';
import Button from '../components/Button';
import Link from '../components/Link';
import Card from '../components/Card';
import Line from '../components/Line';
import Row from '../components/Row';
import Col from '../components/Col';
import NewDomain from './NewDomain';
import Themes from './Themes';

const errors = {
  NO_ERROR: 'no_error',
  CHOOSE_DOMAIN: 'دامنه‌ای انتخاب کنید.',
  CHOOSE_PLAN: 'یکی از بسته‌های هاست را انتخاب کنید.',
};

@connect(
  state => ({
    domainType: selectors.getNewServiceDomainType(state),
    domainAddress: selectors.getNewServiceDomainAddress(state),
    selectedDomainsIds: domainSelectors.getSelectedDomainsIds(state),
    location: selectors.getNewServiceLocation(state),
    plan: selectors.getNewServicePlan(state),
    cms: selectors.getNewServiceCms(state),
    theme: selectors.getNewServicePlan(state),
    themeLayout: selectors.getNewServicePlan(state),
    dedIp: selectors.getNewServiceDedIp(state),
    dedDns: selectors.getNewServiceDedDns(state),
    // total price
    total: selectors.getNewServiceTotal(state),
    // Ajax
    isFetching: selectors.isNewServiceFetching(state),
    error: selectors.getNewServiceError(state),
    status: selectors.getNewServiceStatus(state),
  }),
  {
    ...actions,
    setActiveModal: uiActions.setActiveModal
  }
)
class NewService extends Component {

  state = {
    submitFocused: false
  };

  constructor(props) {
    super(props);
    this._planChanged          = this._planChanged.bind(this);
    this._domainTypeChanged    = this._domainTypeChanged.bind(this);
    this._domainAddressChanged = this._domainAddressChanged.bind(this);
    this._locationChanged      = this._locationChanged.bind(this);
    this._cmsChanged           = this._cmsChanged.bind(this);
    this._dedIpToggled         = this._dedIpToggled.bind(this);
    this._dedDnsToggled        = this._dedDnsToggled.bind(this);
    this._openThemePicker      = this._openThemePicker.bind(this);
    this._submitClicked        = this._submitClicked.bind(this);
  }

  _planChanged(planId, selected) {
    if(selected) this.props.setServicePlan(planId);
  }

  _domainTypeChanged(type) {
    this.props.setServiceDomainType(type);
  }
  
  _domainAddressChanged(addr) {
    this.props.setServiceDomainAddress(addr);
  }
  
  _locationChanged(loc) {
    this.props.setServiceLocation(loc);
  }

  _cmsChanged(cmsId) {
    this.props.setServiceCms(cmsId);
  }

  _dedIpToggled() {
    this.props.toggleServiceDedIp();
  }

  _dedDnsToggled() {
    this.props.toggleServiceDedDns();
  }

  _openThemePicker() {
    this.props.setActiveModal(modalIds.THEMEPICKER_LIST);
  }

  _submitClicked() {
    if(this.getSubmitError() === errors.NO_ERROR) {
      this.props.requestCreateService();
    } else {
      this.setState({ submitFocused: true });
    }
  }

  getSubmitError() {
    const { domainType, domainAddress, selectedDomainsIds, plan } = this.props;
    
    // check domains
    if((domainType === domainTypes.NEW && selectedDomainsIds.length === 0) || (domainType === domainTypes.OWN && domainAddress === '')) {
      return errors.CHOOSE_DOMAIN;
    }

    // check host plan
    if(plan === null) {
      return errors.CHOOSE_PLAN;
    }

    return errors.NO_ERROR;
  }

  isPlanSelected(pId) {
    return pId === this.props.plan;  
  }

  isCmsSelected(cId) {
    return cId === this.props.cms;  
  }

  render() {
    const { domainType, domainAddress, location, plan, cms, dedIp, dedDns, total, isFetching } = this.props;
    const { submitFocused } = this.state;

    return (
      <div className="new-service">

        {/* --- Domain --- */}
        <NewServiceStep step="domain" title="یکـ">
          <SectionTitle
            title="انتخاب آدرس برای سایت"
          />
          <div className="new-service__domain">
            <DomainChooser
              address={domainAddress}
              type={domainType}
              onAddressChange={this._domainAddressChanged}
              onTypeChange={this._domainTypeChanged}
            />
          </div>
        </NewServiceStep>
        


        {/* --- Host --- */}
        <NewServiceStep step="host" title="دو">
          <SectionTitle
            title="بسته‌ هاست"
          />

          <div className="new-service__loc">
            <span className="new-service__loc__label">
              کشور میزبان سرور
              <HelpBtn 
                className="hint--top hint--info hint--large" 
                aria-label="کشوری که فایل‌ها و سایتتان در سرورهای آن میزبانی شود (بعد از خرید به‌راحتی قابل تغییر است)" />
            </span>
            <span className="new-service__loc__switch">
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

          <div className="new-service__plans">
            {map(planIds, pid => {
              return plansById[pid] && (
                <div key={v4()} className="new-service__plans__cell">
                  <HostPlan
                    {...plansById[pid]}
                    selected={this.isPlanSelected(pid)}
                    onChoose={this._planChanged.bind(this, pid)}
                  />
                </div>
              );
            })}
            <div className="clearfix" />
          </div>

          <div style={{ padding: 15, textAlign: 'center' }}>
            <Link
              className="hint--top"
              iconClass="icon-left-small"
              iconPosition="left"
              href="http://tarino.ir/pricing"
              target="_blank"
              aria-label="هدایت به صفحه تعرفه‌های تارینو">
              مشاهده همه امکانات پلن‌های میزبانی و مقایسه دقیق
            </Link>
          </div>

        </NewServiceStep>
        

        {/* --- CMS & Theme --- */}
        <NewServiceStep step="cms" title="سه">
          <SectionTitle
            title="سیستم مدیریت سایت"
            subtitle="هر سایت فروشگاهی، خبری و ... نیاز به یک سیستم مدیریت دارد"
          />

          <MessageBox
            style={{ marginBottom: 10 }}
            singleLine={true}
            type="info"
            title="راهنمای انتخاب">
            اگر نمی‌دانید که کدام را انتخاب کنید، برای فروشگاه‌ساز <strong>ووکامرس</strong> و برای سایر سایت‌ها <strong>وردپرس</strong> را اکیداً پیشنهاد می‌کنیم.
          </MessageBox>

          <RichRadio
            checked={this.isCmsSelected(cmsIds.NONE)}
            inline={true}
            className="hint--rounded hint--top"
            aria-label="فضای سایت خالی خواهد بود"
            name="cms"
            value={cmsIds.NONE}
            title="بدون سیستم‌مدیریت"
            onChange={v => this._cmsChanged(v)}
          />

          <RichRadio
            checked={this.isCmsSelected(cmsIds.WORDPRESS)}
            inline={true}
            className="hint--rounded hint--medium hint--top"
            aria-label="مناسب بیشتر وب‌سایت ها - عالی برای تازه‌کار"
            name="cms"
            value={cmsIds.WORDPRESS}
            title="وردپرس"
            icon={getImage('wordpress')}
            onChange={v => this._cmsChanged(v)}
          />

          <RichRadio
            checked={this.isCmsSelected(cmsIds.JOOMLA)}
            inline={true}
            className="hint--rounded hint--top"
            aria-label="مناسب بیشتر وبسایت‌ ها"
            name="cms"
            value={cmsIds.JOOMLA}
            title="جوملا"
            icon={getImage('joomla')}
            onChange={v => this._cmsChanged(v)}
          />

          <RichRadio
            checked={this.isCmsSelected(cmsIds.DRUPAL)}
            inline={true}
            className="hint--rounded hint--top"
            aria-label="مناسب سایت‌های بزرگ"
            name="cms"
            value={cmsIds.DRUPAL}
            title="دروپال"
            icon={getImage('drupal')}
            onChange={v => this._cmsChanged(v)}
            disabled
          />
          
          <RichRadio
            checked={this.isCmsSelected(cmsIds.WOOCOMMERCE)}
            inline={true}
            className="hint--rounded hint--top"
            aria-label="بهترین و پراستفاده ترین فروشگاه‌ساز "
            name="cms"
            value={cmsIds.WOOCOMMERCE}
            title="فروشگاه‌ساز ووکامرس"
            icon={getImage('woocommerce')}
            onChange={v => this._cmsChanged(v)}
            disabled
          />

          {/*<SectionTitle
            title="قالب و ظاهر سایت"
            subtitle="قالب‌هایی که برای سیستم‌مدیریت انتخابی بهینه‌شده‌اند"
          />

          <SelectedTheme />

          <ThemePicker />        

          <HugeButton 
            width="300px" 
            height="50px" 
            iconClass="icon-brush"
            style={{ maxWidth: '100%' }}
            onClick={this._openThemePicker}>
            بازکردن انتخاب‌گر قالب
          </HugeButton>*/}

        </NewServiceStep>



        {/* --- Addons --- */}
        <NewServiceStep step="addons" title="چهـارم">
          <SectionTitle
            title="سایر امکانات و مشخصات"
          />

          <Checkbox
            className="hint--top hint--rounded"
            aria-label={addonsById[addons.DED_IP].description}
            checked={dedIp}
            onChange={this._dedIpToggled}>
            {addonsById[addons.DED_IP].title}
            <span>&nbsp;({toPersian(addonsById[addons.DED_IP].price, true)} تومان)</span>
          </Checkbox>

          <br />

          <Checkbox 
            checked={dedDns}
            onChange={this._dedDnsToggled}>
            {addonsById[addons.DED_DNS].title}
            <span>&nbsp;({toPersian(addonsById[addons.DED_DNS].price, true)} تومان)</span>
          </Checkbox>

        </NewServiceStep>

        <Row style={{ padding: '25px 40px', textAlign: 'center' }}>

          {this.getSubmitError() !== errors.NO_ERROR && 
            <p style={{ margin: '15px 0 15px 0' }}>{this.getSubmitError()}</p>
          }

          <Button
            theme="success"
            disabled={submitFocused && this.getSubmitError() !== errors.NO_ERROR}
            loading={isFetching}
            onClick={this._submitClicked}>
            {total === 0
              ? <span> ثبت و دریافت صورت‌حساب </span>
              : <span> ثبت و ایجاد فاکتور  <span style={{ opacity: .8 }}>به مبلغ {toPersian(total, true)} تومان</span></span>
            }
          </Button>
        </Row>
      </div>
    );
  }
}

export default NewService;


class NewServiceStep extends Component {
  render() {
    const { children, step, title, ...props } = this.props;

    return (
      <section className={c('new-service__section', `new-service__section--${step}`)}>
        <div className="new-service__section__bar">
          <div className="new-service__section__bar__title">{title}</div>
        </div>
        {children}
      </section>
    );
  }
}
