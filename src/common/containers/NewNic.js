import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import has from 'lodash/has';

import * as actions from '../actions/nic';
import * as selectors from '../selectors/nic';

import { Motion, spring, presets } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Row from '../components/Row';
import Col from '../components/Col';

@withRouter
@connect(
  state => ({
    // Create Nic
    getNicFirstName: selectors.getNicFirstName(state),
    getNicLastName: selectors.getNicLastName(state),
    getNicEmail: selectors.getNicEmail(state),
    getNicPhone: selectors.getNicPhone(state),
    getNicIdCardNo: selectors.getNicIdCardNo(state),
    getNicPostalCode: selectors.getNicPostalCode(state),
    getNicCity: selectors.getNicCity(state),
    getNicProvince: selectors.getNicProvince(state),
    getNicAddress: selectors.getNicAddress(state),
    isNicUsernameFetching: selectors.isNicUsernameFetching(state),
    getNicUsernameError: selectors.getNicUsernameError(state),
    getNicUsernameStatus: selectors.getNicUsernameStatus(state),
    getNicUsername: selectors.getNicUsername(state),
    // Recent Nics
    isRecentNicUsernamesFetching: selectors.isRecentNicUsernamesFetching(state),
    getRecentNicUsernamesError: selectors.getRecentNicUsernamesError(state),
    getRecentNicUsernames: selectors.getRecentNicUsernames(state),
  }),
  actions
)
class NewNic extends Component {
  constructor(props) {
    super(props);

    this.shouldReturn       = has(props.location.query, 'from');
    this._firstNameChanged  = this._fieldChanged.bind(undefined, props.setNicFirstName);
    this._lastNameChanged   = this._fieldChanged.bind(undefined, props.setNicLastName);
    this._emailChanged      = this._fieldChanged.bind(undefined, props.setNicEmail);
    this._phoneChanged      = this._fieldChanged.bind(undefined, props.setNicPhone);
    this._idCardNoChanged   = this._fieldChanged.bind(undefined, props.setNicIdCardNo);
    this._postalCodeChanged = this._fieldChanged.bind(undefined, props.setNicPostalCode);
    this._cityChanged       = this._fieldChanged.bind(undefined, props.setNicCity);
    this._provinceChanged   = this._fieldChanged.bind(undefined, props.setNicProvince);
    this._addressChanged    = this._fieldChanged.bind(undefined, props.setNicAddress);
    this._retryClicked      = this._retryClicked.bind(this);
    this._submitClicked     = this._submitClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestRecentNicUsernames();
  }

  _fieldChanged(actionCreator, e) {
    actionCreator(e.target.value);
  }

  _retryClicked() {
    this.props.requestRecentNicUsernames();
  }

  _submitClicked() {
    this.props.requestNicUsername();
  }

  getNicUsernameFaError(status) {
    switch (status) {
      case 5:
        return 'اطلاعات شما معتبر نیستند یا تکراری هستند.';

      default:
        return 'مشکلی در ارتباط به وجود آمده‌است. دوباره تلاش کنید.';
    }
  }

  listLoadingStyles() {
    if (this.props.isRecentNicUsernamesFetching) {
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

  renderListLoading() {
    return (
      <Motion style={this.listLoadingStyles()}>
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

  renderListError() {
    return !!this.props.getRecentNicUsernamesError && (
      <div
        key={v4()}
        className="page__error">
          <IconText color="warning" iconClass="icon-frown" style={{ display: 'inline-block' }}>مشکلی در ارتباط به‌وجود آمد...</IconText>
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
    const {
      router,
      location,
      // Action Creators
      setNicFirstName,
      setNicLastName,
      setNicEmail,
      setNicPhone,
      setNicIdCardNo,
      setNicPostalCode,
      setNicCity,
      setNicProvince,
      setNicAddress,
      requestNicUsername,
      requestRecentNicUsernames,
      // Selectors
      getNicFirstName,
      getNicLastName,
      getNicEmail,
      getNicPhone,
      getNicIdCardNo,
      getNicPostalCode,
      getNicCity,
      getNicProvince,
      getNicAddress,
      isNicUsernameFetching,
      getNicUsernameError,
      getNicUsernameStatus,
      getNicUsername,
      isRecentNicUsernamesFetching,
      getRecentNicUsernamesError,
      getRecentNicUsernames,
      ...props
    } = this.props;

    return (
      <div>

        { this.shouldReturn &&
          <Row style={{ marginBottom: 20 }}>
            <Button
              noBg={true}
              theme="warning"
              iconClass="icon-right-open-big"
              onClick={() => router.push(location.query.from)}>
              بازگشت
            </Button>
          </Row>
        }

        <MessageBox
          singleLine={true}
          type="danger"
          title="توجه کنید!">
          بدلیل ثبت این اطلاعات به‌صورت بین‌المللی در مشخصات دامنه، باید با حروف <strong>انگلیسی</strong> بنویسید (فینگیلیش)
        </MessageBox>

        <Row style={{ marginTop: 15 }}>
          <Col smallFullWidth width={6}>

            <Row>
              <Col smallFullWidth width={6}>

                <Input
                  label="نام"
                  placeholder="مثال: Arman"
                  value={getNicFirstName}
                  onChange={this._firstNameChanged}
                />

              </Col>
              <Col smallFullWidth width={6} gutterPosition="right">

                <Input
                  label="نام خانوادگی"
                  placeholder="مثال: Ariana Far"
                  value={getNicLastName}
                  onChange={this._lastNameChanged}
                />

              </Col>
            </Row>

            <Row>
              <Col smallFullWidth width={6}>

                <Input
                  label="رایانامه "
                  placeholder="مثال: ex@example.com"
                  value={getNicEmail}
                  onChange={this._emailChanged}
                />

              </Col>
              <Col smallFullWidth width={6} gutterPosition="right">

                <Input
                  label={() => <span>تلفن‌ <small>با پیش‌شماره</small></span>}
                  placeholder="مثال: 02112345678"
                  value={getNicPhone}
                  onChange={this._phoneChanged}
                />

              </Col>
            </Row>

            <Row>
              <Col smallFullWidth width={6}>

                <Input
                  label="کدملی"
                  value={getNicIdCardNo}
                  onChange={this._idCardNoChanged}
                />

              </Col>
              <Col smallFullWidth width={6} gutterPosition="right">

                <Input
                  label="کدپستی"
                  value={getNicPostalCode}
                  onChange={this._postalCodeChanged}
                />

              </Col>
            </Row>


          </Col>
          <Col smallFullWidth width={6} gutterPosition="right">


            <Row>
              <Col smallFullWidth width={6}>

                <Input
                  label="شهر"
                  placeholder="مثال:‌ Tabriz"
                  value={getNicCity}
                  onChange={this._cityChanged}
                />

              </Col>
              <Col smallFullWidth width={6} gutterPosition="right">

                <Input
                  label="استان"
                  placeholder="مثال:‌ Azerbaijan"
                  value={getNicProvince}
                  onChange={this._provinceChanged}
                />

              </Col>
            </Row>

            <Input
              style={{ maxWidth: '100%' }}
              label="آدرس محل کار / زندگی"
              placeholder="مثال:‌ Shariati St - Shahid Hemati - Pelak 243"
              value={getNicAddress}
              onChange={this._addressChanged}
            />

            <Row style={{ marginTop: 15, textAlign: 'left' }}>

              {this.shouldReturn &&
                <Button
                  noBg={true}
                  style={{ marginLeft: 10 }}
                  theme="warning"
                  iconClass="icon-right-open-big"
                  onClick={() => router.push(location.query.from)}>
                  بازگشت
                </Button>
              }

              {!!getNicUsernameError &&
                <IconText
                  style={{ marginBottom: 10 }}
                  color="warning"
                  iconClass="icon-attention">
                  {this.getNicUsernameFaError(getNicUsernameStatus)}

                </IconText>
              }

              {!!getNicUsername &&
                <span>
                  <MessageBox
                    style={{ marginBottom: 10, textAlign: 'right' }}
                    singleLine={true}
                    blink={false}
                    type="success"
                    iconClass="icon-user"
                    title="ساخته‌ شد!">
                    شناسه کاربری شما: {getNicUsername}
                  </MessageBox>
                  <MessageBox
                    style={{ marginBottom: 10, textAlign: 'right' }}
                    singleLine={true}
                    type="warning"
                    title="ایمیل‌تان را چک کنید">
                    کلمه‌عبور به {getNicEmail} ارسال شده‌است. اگر تا ۷ روز حداقل یک‌بار در <a href="http://www.nic.ir/Login" target="_blank">nic.ir</a> به حساب خود وارد نشوید، شناسه حذف خواهد شد.
                  </MessageBox>
                </span>
              }

              <Button
                loading={isNicUsernameFetching}
                iconClass="icon-key"
                onClick={this._submitClicked}
                >
                ارسال و ساخت شناسه
              </Button>

            </Row>

          </Col>
        </Row>


        <SectionTitle
          title="شناسه های شما"
        />

        <TableWithSorting
          columns={[
            {
              key: 'username',
              title: 'شناسه ایرنیک',
              template: row => (
                <span>{row.username}</span>
              ),
              sortBy: row => row.username
            },
            {
              key: 'email',
              title: 'رایانامه',
              template: row => (
                <span>{row.email}</span>
              ),
              sortBy: row => row.email
            },
            {
              key: 'date',
              title: 'ساخته شده از',
              template: row => (
                <DateTime time={row.created * 1000}/>
              ),
              sortBy: row => row.createdAt * -1
            }
          ]}
          data={getRecentNicUsernames}
          defaultSortBy="date"
        />

        {this.renderListError()}
        {this.renderListLoading()}

      </div>
    );
  }
}

export default NewNic;
