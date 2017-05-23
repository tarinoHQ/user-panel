import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compact from 'lodash/compact';
import without from 'lodash/without';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/domains';
import * as selectors from '../selectors/domains';

import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import DateTime from '../components/DateTime';
import IconText from '../components/IconText';
import DnsForm from '../components/DnsForm';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@connect(
  state => ({
    MdDnsUseTarino: selectors.getMdDnsUseTarino(state),
    MdDnsList: selectors.getMdDnsList(state),
    isMdDnsSaveSending: selectors.isMdDnsSaveSending(state),
    MdDnsSaveStatus: selectors.getMdDnsSaveStatus(state),
    MdDnsSaveError: selectors.getMdDnsSaveError(state),
  }),
  {
    toggleMdDnsUseTarino: actions.toggleMdDnsUseTarino,
    setMdDns: actions.setMdDns,
    requestMdDnsSave: actions.requestMdDnsSave,
  }
)
@withRouter
class DomainDns extends Component {
  constructor(props) {
    super(props);

    this._addDnsRecordClicked = this._addDnsRecordClicked.bind(this);
    this._DnsRecordChanged    = this._DnsRecordChanged.bind(this);
    this._useTarinoToggled    = this._useTarinoToggled.bind(this);
    this._saveClicked         = this._saveClicked.bind(this);
  }

  _addDnsRecordClicked() {
    const { setMdDns, MdDnsList } = this.props;
    const recordsCount = without(MdDnsList, null).length;
    if (recordsCount < 4) {
      const MdDnsListCopy = MdDnsList.slice();
      MdDnsListCopy[recordsCount] = '';
      setMdDns(MdDnsListCopy);
    }
  }

  _DnsRecordChanged(i, e) {
    const { setMdDns, MdDnsList } = this.props;
    const MdDnsListCopy = MdDnsList.slice();
    MdDnsListCopy[i] = e.target.value;
    setMdDns(MdDnsListCopy);
  }

  _useTarinoToggled() {
    this.props.toggleMdDnsUseTarino();
  }

  _saveClicked() {
    this.props.requestMdDnsSave(this.props.params.id);
  }

  render() {
    const { router, MdDnsUseTarino, MdDnsList, isMdDnsSaveSending, MdDnsSaveStatus, MdDnsSaveError, ...props } = this.props;

    return (
      <div>
        <MessageBox
          blink={false}
          style={{ marginBottom: 20 }}
          type="warning"
          title="تغییر نام‌سرورها یا انتقال دامنه؟"
        >
          برای استفاده از دامنه برروی هاست‌های دیگر شرکت‌ها، نیاز به <Link to='transfer'><strong>انتقال دامنه</strong></Link>  ندارید، کافیست <Link to='dns'><strong>نام‌سرور ها</strong></Link>ی شرکت موردنظر را در بخش نام‌سرور ها بنویسید.
        </MessageBox>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="مدیریت نام‌سرور ها"
          subtitle="برای اتصال به سرویس‌های تارینو یا هاست های دیگر شرکت‌ها"
        />

        <DnsForm
          dnsList={MdDnsList}
          useTarinoDns={MdDnsUseTarino}
          onUseTarinoDnsChange={this._useTarinoToggled}
          onAddDnsClicked={this._addDnsRecordClicked}
          onDnsRecordChanged={this._DnsRecordChanged}
        />

        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isMdDnsSaveSending}
          theme="success"
          iconClass="icon-paper-plane"
          onClick={this._saveClicked}>
          ثبت اطلاعات
        </Button>
        {MdDnsSaveError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {MdDnsSaveStatus === 1 &&
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

export default DomainDns;
