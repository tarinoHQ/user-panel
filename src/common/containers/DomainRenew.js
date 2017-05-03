import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { toPersian } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/domains';
import * as selectors from '../selectors/domains';

import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import DateTime from '../components/DateTime';
import IconText from '../components/IconText';
import Select from '../components/Select';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@connect(
  state => ({
    listById: selectors.getListById(state),
    MdInfoYearPlans: selectors.getMdInfoYearPlans(state),
    MdRenewPlan: selectors.getMdRenewPlan(state),
    isMdInfoFetching: selectors.isMdInfoFetching(state),
    isMdRenewSending: selectors.isMdRenewSending(state),
    MdRenewStatus: selectors.getMdRenewStatus(state),
    MdRenewError: selectors.getMdRenewError(state),
  }),
  {
    setMdRenewPlan: actions.setMdRenewPlan,
    requestMdRenew: actions.requestMdRenew,
  }
)
@withRouter
class DomainRenew extends Component {
  constructor(props) {
    super(props);

    this.domainId       = this.props.domainId;
    this._planChanged   = this._planChanged.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  componentDidMount() {
    if(this.props.listById[this.domainId]) {
      this.props.setMdRenewPlan(this.props.listById[this.domainId].year_plan);
    }
  }

  _planChanged(v) {
    this.props.setMdRenewPlan(v.value);
  }

  _submitClicked() {
    this.props.requestMdRenew(this.domainId);
  }

  render() {
    const { router, MdInfoYearPlans, isMdInfoFetching, MdRenewPlan, isMdRenewSending, MdRenewStatus, MdRenewError, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="تمدید مالکیت دامنه"
        />

        <Select
          loading={isMdInfoFetching}
          name="yearPlan"
          placeholder="به چه مدت؟"
          value={MdRenewPlan}
          options={[
            { value: '1', label: `۱ ساله (${toPersian(MdInfoYearPlans['1'], true)} تومان)` },
            { value: '5', label: `۵ ساله (${toPersian(MdInfoYearPlans['5'], true)} تومان)` },
          ]}
          onChange={this._planChanged}
        />

        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isMdRenewSending}
          theme="success"
          iconClass="icon-paper-plane"
          onClick={this._submitClicked}>
          ایجاد فاکتور و پرداخت
        </Button>
        {!!MdRenewError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {MdRenewStatus === 1 &&
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
}

export default DomainRenew;
