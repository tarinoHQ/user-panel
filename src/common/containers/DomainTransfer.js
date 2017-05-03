import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
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
import CopyBtn from '../components/CopyBtn';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@connect(
  state => ({
    listById: selectors.getListById(state),
    MdInfoStatus: selectors.getMdInfoStatus(state),
    MdTransferReason: selectors.getMdTransferReason(state),
    MdTransferCode: selectors.getMdTransferCode(state),
    isMdTransferSending: selectors.isMdTransferSending(state),
    MdTransferStatus: selectors.getMdTransferStatus(state),
    MdTransferError: selectors.getMdTransferError(state),
  }),
  {
    setMdTransferReason: actions.setMdTransferReason,
    requestMdTransfer: actions.requestMdTransfer,
  }
)
@withRouter
class DomainTransfer extends Component {
  constructor(props) {
    super(props);

    this.domainId       = this.props.domainId;
    this._reasonChanged = this._reasonChanged.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  isIr() {
    return (
      this.props.listById[this.domainId] &&
      this.props.listById[this.domainId].domain_name === 'ir'
    );
  }

  _reasonChanged(v) {
    this.props.setMdTransferReason(v.value);
  }

  _submitClicked() {
    this.props.requestMdTransfer(this.domainId);
  }

  renderIrBox() {
    return (
      <MessageBox
        blink={false}
        style={{ marginBottom: 20 }}
        type="success"
        title="انتقال دامنه های ir"
      >
        بدلیل انحصاری بودن روند انتقال دامنه بدست nic.ir شما باید طبق آموزش تصویری وبلاگ تارینو در سایت ایرنیک انتقال را انجام دهید.
        &nbsp;
        <Link
          noUnderline
          href="http://blogino.ir/nic-transfer"
          iconClass="icon-help-circled">
          آموزش تصویری انتقال دامنه ir به شناسه دیگر
        </Link>
      </MessageBox>
    );
  }

  render() {
    const { router, MdTransferReason, MdInfoStatus, isMdTransferSending, MdTransferStatus, MdTransferError, setMdTransferReason, MdTransferCode, requestMdTransfer, ...props } = this.props;

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
          title="انتقال دامنه"
          subtitle="برای انتقال حق مدیریت دامنه به سرویس های ثبت دامنه دیگر"
        />

        {MdInfoStatus === 1 && (this.isIr() ?
          this.renderIrBox() :
          <div>
            <p>امیدواریم که به دلیل به مشکل خوردن با تارینو قصد انتقال نداشته باشید، در غیر این صورت بسیار خوشحال می‌شویم دلیل انتقال را برای بهتر شدنمان به ما بگویید</p>
            <Input
              inputProps={{ style: { minHeight: 80 } }}
              multiLine={true}
              fullWidth={true}
              label="دلیل انتقال دامنه (اختیاری)"
              value={MdTransferReason}
              onChange={this._reasonChanged}
            />

            <Line style={{ margin: '20px 0' }} />

            <Button
              style={{ display: 'inline', marginBottom: '8px' }}
              disabled={MdTransferStatus === 1}
              loading={isMdTransferSending}
              theme="success"
              iconClass="icon-off"
              onClick={this._submitClicked}>
              فعال سازی انتقال و دریافت کد
            </Button>
            {!!MdTransferError &&
              <IconText
                style={{ display: 'inline', marginRight: '8px' }}
                color="warning"
                iconClass="icon-attention">
                مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
              </IconText>
            }
            {MdTransferStatus === 1 &&
              <IconText
                style={{ display: 'inline', marginRight: '8px' }}
                color="success"
                iconClass="icon-ok">
                کد انتقال:
                <Input
                  style={{ display: 'inline', marginRight: '8px' }}
                  textboxLtr={true}
                  readOnly={true}
                  startIcons={[
                    () => <CopyBtn text={MdTransferCode} />
                  ]}
                  value={MdTransferCode}
                />
              </IconText>
            }
          </div>
        )}

      </div>
    );
  }
}

export default DomainTransfer;
