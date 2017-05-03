import React, { Component, PropTypes } from 'react';
import { toPersian } from '../utils/numberUtils';
import { domainNames as domainNamesList } from '../data/domains';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import without from 'lodash/without';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as nicActions from '../actions/nic';
import * as actions from '../actions/domains';
import * as nicSelectors from '../selectors/nic';
import * as selectors from '../selectors/domains';

import { Motion, spring, presets } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import InlineSelect from '../components/InlineSelect';
import MessageBox from '../components/MessageBox';
import Checkbox from '../components/Checkbox';
import IconText from '../components/IconText';
import DnsForm from '../components/DnsForm';
import Spinner from '../components/Spinner';
import Skewer from '../components/Skewer';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Kebab from '../components/Kebab';
import Card from '../components/Card';
import Line from '../components/Line';
import Link from '../components/Link';
import Collapse from 'react-collapse';
import Row from '../components/Row';
import Col from '../components/Col';

const AddDNSRecordBtn = ({ className, disabled, ...props }) => {
  return (
    <div
      className={c('new-domain__dns__add-input', {
        'new-domain__dns__add-input--disabled': disabled
      })}
      {...props}>
      +
    </div>
  );
};

@withRouter
@connect(
  state => ({
    address: selectors.getDomainAddress(state),
    domainNames: selectors.getDomainNames(state),
    searchedDomains: selectors.getSearchedDomains(state),
    searchedDomainsIds: selectors.getSearchedDomainsIds(state),
    searchedDomainsError: selectors.getSearchedDomainsError(state),
    isSearchedDomainsFetching: selectors.isSearchedDomainsFetching(state),
    selectedDomainsIds: selectors.getSelectedDomainsIds(state),
    selectedDomainsPrice: selectors.getSelectedDomainsPrice(state),
    nic: selectors.getDomainNic(state),
    isCustomNicActive: selectors.isDomainCustomNicActive(state),
    getUseTarinoDNS: selectors.getUseTarinoDNS(state),
    DNS: selectors.getDomainDNS(state),
    recentNicUsernames: nicSelectors.getRecentNicUsernames(state),
    isRegisterSending: selectors.isDomainRegisterSending(state),
    getRegisterError: selectors.getDomainRegisterError(state),
  }),
  {
    setAddress: actions.setDomainAddress,
    setDomainNames: actions.setDomainNames,
    requestSearchedDomains: actions.requestSearchedDomains,
    addSelectedDomain: actions.addSelectedDomain,
    removeSelectedDomain: actions.removeSelectedDomain,
    setDomainNic: actions.setDomainNic,
    toggleCustomNic: actions.toggleDomainCustomNic,
    toggleDomainSelected: actions.toggleDomainSelected,
    toggleUseTarinoDNS: actions.toggleUseTarinoDNS,
    setDomainDNS: actions.setDomainDNS,
    requestSearchedDomains: actions.requestSearchedDomains,
    setDomainYearPlan: actions.setDomainYearPlan,
    requestRecentNicUsernames: nicActions.requestRecentNicUsernames,
    registerDomain: actions.registerDomain,
  }
)
class NewDomain extends Component {
  constructor(props) {
    super(props);

    this._addressChanged              = this._addressChanged.bind(this);
    this._domainNamesChanged          = this._domainNamesChanged.bind(this);
    this._submitClicked               = this._submitClicked.bind(this);
    this._nicChanged                  = this._nicChanged.bind(this);
    this._addDNSRecordClicked         = this._addDNSRecordClicked.bind(this);
    this._useTarinoDNSCheckboxChanged = this._useTarinoDNSCheckboxChanged.bind(this);
    this._retrySearchDomainsClicked   = this._retrySearchDomainsClicked.bind(this);
    this._searchDomainsClicked        = this._searchDomainsClicked.bind(this);
    this._domainYearPlanChanged       = this._domainYearPlanChanged.bind(this);
    this._customNicToggled            = this._customNicToggled.bind(this);
  }

  static defaultProps = {
    parentPath: '/new/domain',
  };

  isDomainSelected(domainName) {
    return this.props.selectedDomainsIds.indexOf(domainName) > -1;
  }

  _addressChanged(e) {
    const value = e.target.value.replace(/([^a-z0-9\-]+)/gi, '').substr(0, 63);
    this.props.setAddress(value);
  }

  _domainNamesChanged(values) {
    this.props.setDomainNames(values.split(','));
  }

  _domainCheckboxChanged(domain, checked) {
    this.props.toggleDomainSelected(domain.domainName);
  }

  _domainYearPlanChanged(domainName, yearPlan) {
    this.props.setDomainYearPlan(domainName, yearPlan);
  }

  _useTarinoDNSCheckboxChanged(e) {
    this.props.toggleUseTarinoDNS();
  }

  _retrySearchDomainsClicked() {
    this.props.requestSearchedDomains();
  }

  _searchDomainsClicked() {
    this.props.requestSearchedDomains();
  }

  _nicChanged(v) {
    this.props.setDomainNic(v);
  }

  _customNicToggled() {
    this.props.toggleCustomNic();
    this.props.setDomainNic('');
  }

  _addDNSRecordClicked() {
    const { setDomainDNS, DNS } = this.props;
    const recordsCount = without(DNS, null).length;
    if (recordsCount < 4) {
      const DNSCopy = DNS.slice();
      DNSCopy[recordsCount] = '';
      setDomainDNS(DNSCopy);
    }
  }

  _DNSRecordChanged(i, e) {
    const { setDomainDNS, DNS } = this.props;
    const DNSCopy = DNS.slice();
    DNSCopy[i] = e.target.value;
    setDomainDNS(DNSCopy);
  }

  _submitClicked() {
    this.props.registerDomain();
  }

  isSubmitDisabled() {
    const { selectedDomainsPrice, nic,  } = this.props;
    const noNic = this.shouldRenderNicForm() && (nic || '').trim() === "";
    const noPrice = selectedDomainsPrice <= 0;
    return noPrice || noNic;
  }

  domainOptionsStyles() {
    if (this.hasSearchedDomains()) {
      return {
        opacity: spring(1, presets.stiff),
        scale: spring(1, presets.stiff),
      };
    } else {
      return {
        opacity: spring(0, presets.stiff),
        scale: spring(0, presets.stiff),
      };
    }
  }

  loadingStyles() {
    if (this.props.isSearchedDomainsFetching) {
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
            <span className="page__loading__text">درحال بارگذاری موارد ...</span>
          </div>
        }
      </Motion>
    );
  }

  renderError() {
    return !!this.props.searchedDomainsError && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد...</IconText>
          <Button
            style={{ margin: '0 10px' }}
            theme="warning"
            onClick={this._retrySearchDomainsClicked}>
            تلاش دوباره
          </Button>
      </div>
    );
  }

  renderChooseDomainForm() {
    let { address, domainNames, isSearchedDomainsFetching } = this.props;

    return (
      <div>
        <Input
          smallFullWidth={true}
          textboxLtr={true}
          style={{ maxWidth: 500 }}
          label="آدرس دامنه خود را وارد کنید"
          endLabel={() => (
            <Link
              iconClass="icon-left-open-big"
              iconPosition="left"
              href="#">راهنمای انتخاب آدرس</Link>
          )}
          placeholder="فقط حروف یا اعداد انگلیسی و خط تیره"
          prefix="www."
          value={address}
          onChange={this._addressChanged}
        />

        <Select
          multi={true}
          simpleValue={true}
          wrapperProps={{ style: { maxWidth: 400 } }}
          label="پسوندهای مورد نظرتان را برای انتهای دامنه انتخاب کنید"
          placeholder="چند پسوند انتخاب کنید..."
          value={domainNames.join(',')}
          options={map(domainNamesList, dn => ({ value: dn, label: dn }))}
          onChange={this._domainNamesChanged}
        />

        <Row style={{ marginTop: 10 }}>
          <Button
            loading={isSearchedDomainsFetching}
            children="بررسی موجودبودن آدرس (ها)"
            onClick={this._searchDomainsClicked}
          />
        </Row>
      </div>
    );
  }

  renderSearchedDomains() {
    const { searchedDomains } = this.props;

    return (
      <TableWithSorting
        columns={[
          {
            key: 'check',
            title: '',
            props: (row) => {
              const props = {};
              if (row.available) {
                props.onClick = this._domainCheckboxChanged.bind(this, row, !this.isDomainSelected(row.domainName));
              }
              return props;
            },
            template: (row) => (
              <input
                className="new-domain__results__check"
                type="checkbox"
                disabled={!row.available}
                checked={row.selected}
                onChange={() => {}}
                />
            )
          },
          {
            key: 'domain',
            title: 'آدرس انتخاب‌شده',
            props: (row) => {
              const props = {};
              if (row.available) {
                props.onClick = this._domainCheckboxChanged.bind(this, row, !this.isDomainSelected(row.domainName));
              }
              return props;
            },
            template: row => (
              <span>{row.address}</span>
            )
          },
          {
            key: 'price',
            title: 'بها',
            template: row => (
              row.available
                ?
                <span>
                  <span className="new-domain__results__icon icon-ok">
                    موجود
                  </span>
                  <InlineSelect
                    disabled={!row.selected}
                    value={row.selectedYearPlan || '1'}
                    options={[
                      {
                        value: '1',
                        label: 'یکساله (' + toPersian(row.priceByYearPlan['1'], true) + ' تومان)'
                      },
                      {
                        value: '5',
                        label: 'پنج‌ساله (' + toPersian(row.priceByYearPlan['5'], true) + ' تومان)'
                      }
                    ]}
                    onChange={yp => this._domainYearPlanChanged(row.domainName, yp)}
                  />
                </span>
                :
                <span>
                  <span className="new-domain__results__icon icon-lock"></span>
                  متاسفیم! این دامنه قبلاً ثبت شده‌است.
                </span>
            ),
            sortBy: row => row.priceByYearPlan['1']
          }
        ]}
        rowsProps={(row) => {
          let props = { className: 'new-domain__results__row' };
          if (!row.available) {
            props.className += ' is-unavailable';
          }
          return props;
        }}
        data={searchedDomains}
        defaultSortBy="price"
      />
    );
  }

  hasSearchedDomains() {
    const { searchedDomainsIds } = this.props;
    return searchedDomainsIds.length > 0;
  }

  shouldRenderNicForm() {
    const { selectedDomainsIds } = this.props;
    return selectedDomainsIds.indexOf('ir') > -1;
  }

  renderNicForm() {
    const { router, nic, isCustomNicActive, setDomainNic, toggleCustomNic, parentPath } = this.props;

    let input = null,
        button = null;

    if (isCustomNicActive) {
      input = (
        <Input
          key={'nicInp'}
          style={{ maxWidth: 250 }}
          textboxLtr={true}
          smallFullWidth={true}
          placeholder="مثال: ‌mr123-irnic"
          value={nic}
          onChange={e => this._nicChanged(e.target.value)}
        />
      );
      button = (
        <Button
          key={'recentNicsBtn'}
          style={{ margin: '0 0 10px 10px' }}
          noBg={false}
          iconClass="icon-list-alt"
          onClick={this._customNicToggled}>
            انتخاب از لیست
        </Button>
      );

    } else {
      input = (
        <RecentNicsSelect
          value={nic}
          onChange={v => this._nicChanged(v)}
        />
      );
      button = (
        <Button
          key={'customNicBtn'}
          style={{ margin: '0 0 10px 10px' }}
          noBg={false}
          theme="warning"
          iconClass="icon-pencil"
          onClick={this._customNicToggled}>
            نوشتن شناسه دلخواه
        </Button>
      );
    }

    return (
      <Row>
        <div style={{ fontSize: 14 }}>
          ایمیل یا شناسه ایرنیک (NIC) خود را وارد کنید
          &nbsp;<Link noUnderline href="#">ایرنیک چیست؟</Link><br />
          <small>برای ثبت دامنه .ir باید در سامانه ایرنیک یک شناسه داشته باشید.</small>
        </div>

        <div>
          {input}
        </div>

        <div>
          {button}
          <Button
            key={'newNicBtn'}
            style={{ margin: '0 0 10px 10px' }}
            noBg={true}
            iconClass="icon-plus"
            onClick={() => router.push({ pathname: '/new/nic', query: { from: parentPath } })}>
              ساخت شناسه
          </Button>
        </div>
      </Row>
    );
  }

  renderDNSForm() {
    const { getUseTarinoDNS, DNS } = this.props;

    return (
      <DnsForm
        dnsList={DNS}
        useTarinoDns={getUseTarinoDNS}
        onUseTarinoDnsChange={this._useTarinoDNSCheckboxChanged}
        onAddDnsClicked={this._addDNSRecordClicked}
        onDnsRecordChanged={this._DNSRecordChanged.bind(this)}
      />
    );
  }

  renderRegisterError() {
    const { getRegisterError } = this.props;

    return (
      !!getRegisterError &&
        <MessageBox
          style={{ marginTop: 10 }}
          singleLine={true}
          blink={false}
          type="warning"
          title="متأسفیم!">
          مشکلی در ارتباط رخ داد، دوباره تلاش کنید.
        </MessageBox>
    );
  }

  renderTotal() {
    const { selectedDomainsPrice, isRegisterSending, noPayButton } = this.props;

    return (
      <div className="new-domain__total">
        <div className="new-domain__total__price">
          {toPersian(selectedDomainsPrice, true)} تومان
        </div>

        {noPayButton ||
          <Button
            loading={isRegisterSending}
            disabled={this.isSubmitDisabled()}
            className="new-domain__total__btn"
            theme="success"
            iconClass="icon-left-big"
            iconPosition="left"
            onClick={this._submitClicked}>
            مشاهده فاکتور و پرداخت
          </Button>
        }
      </div>
    );
  }

  render() {
    const {
      address,
      domainNames,
      searchedDomains,
      searchedDomainsError,
      isSearchedDomainsFetching,
      selectedDomainsIds,
      DNS,
      setAddress,
      setDomainNames,
      requestSearchedDomains,
      setDomainDNS,
      setDomainYearPlan,
      ...props
    } = this.props;

    return (
      <div>
        <Row
          style={{ marginTop: 10 }}>
          <Col width="45%" smallFullWidth gutter="50px">
            {this.renderChooseDomainForm()}
          </Col>
          <Col width="55%" smallFullWidth gutter="0px">
            {this.renderSearchedDomains()}
            {this.renderError()}
            {this.renderLoading()}
            <Motion style={this.domainOptionsStyles()}>
              {v => (
                <div
                  style={{
                    marginTop: 20,
                    display: v.opacity == 0 ? 'none' : 'block',
                    transform: `scale(${v.scale})`,
                    opacity: v.opacity,
                  }}>
                  <Card>
                    <Collapse isOpened={this.shouldRenderNicForm()} style={{ marginBottom: 15 }}>
                      {this.renderNicForm()}
                      <Line style={{ marginTop: 15 }} />
                    </Collapse>
                    {this.renderDNSForm()}
                  </Card>
                  {this.renderTotal()}
                </div>
              )}
            </Motion>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewDomain;

@connect(
  state => ({
    isRecentNicUsernamesFetching: nicSelectors.isRecentNicUsernamesFetching(state),
    recentNicUsernames: nicSelectors.getRecentNicUsernames(state),
  }),
  {
    requestRecentNicUsernames: nicActions.requestRecentNicUsernames,
  }
)
class RecentNicsSelect extends Component {
  componentDidMount() {
    this.props.requestRecentNicUsernames();
  }

  getOptions() {
    const { recentNicUsernames } = this.props;

    return map(recentNicUsernames, nic => ({
      value: nic.username,
      label: `${nic.email} (${nic.username})`
    }));
  }

  render() {
    const { isRecentNicUsernamesFetching, recentNicUsernames, onChange, value, ...props } = this.props;

    return (
      isRecentNicUsernamesFetching ?
        <Spinner
          theme="info"
          spinnerName="cube-grid" /> :
        <Select
          {...props}
          ltr={true}
          wrapperProps={{ style: { maxWidth: 350 } }}
          name="nicUsername"
          value={value}
          placeholder="یکی را انتخاب کنید"
          options={this.getOptions()}
          onChange={v => onChange(v.value)}
        />
    );
  }
}
