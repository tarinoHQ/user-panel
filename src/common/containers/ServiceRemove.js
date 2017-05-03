import React, { Component, PropTypes } from 'react';
import { isBrowser } from '../utils/windowUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as selectors from '../selectors/services';
import * as actions from '../actions/services';

import SectionTitle from '../components/SectionTitle';
import MessageBox from '../components/MessageBox';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@connect(
  state => ({
    reason: selectors.getMsDeleteReason(state),
    isSending: selectors.isMsDeleteSending(state),
    status: selectors.getMsDeleteStatus(state),
    error: selectors.getMsDeleteError(state),
  }),
  {
    setMsDeleteReason: actions.setMsDeleteReason,
    requestMsDelete: actions.requestMsDelete,
  }
)
@withRouter
class ServiceRemove extends Component {
  constructor(props) {
    super(props);
    this.orderId        = props.orderId;
    this._submitClicked = this._submitClicked.bind(this);
    this._reasonChanged = this._reasonChanged.bind(this);
  }

  _submitClicked() {
    this.props.requestMsDelete(this.orderId);
  }

  _reasonChanged(e) {
    this.props.setMsDeleteReason(e.target.value);
  }

  render() {
    const { router, reason, isSending, status, error, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="حذف سرویس"
        />

        <MessageBox
          type="success"
          style={{ marginBottom: 10 }}
          title="تضمین بازگشت هزینه تارینو">
          اگر کمتر از ۳۰ روز از سرویس گذشته، <strong>۱۰۰٪ هزینه</strong> به کیف‌پول شما برگشت داده می‌شود!
        </MessageBox>

        <Input
          inputProps={{ style: { minHeight: 50 } }}
          multiLine={true}
          fullWidth={true}
          label="چرا می‌خواهم سرویس را حذف کنم؟"
          placeholder="به خاطر اینکه ..."
          value={reason}
          onChange={this._reasonChanged}
        />

        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          disabled={status === 1}
          loading={isSending}
          theme="danger"
          iconClass="icon-cancel-1"
          onClick={this._submitClicked}>
          حذف سرویس
        </Button>
        {!!error &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {status === 1 &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="success"
            iconClass="icon-ok">
            درخواست شما ارسال شده است. به زودی با شما تماس حاصل می‌کنیم.
          </IconText>
        }

      </div>
    );
  }
}

export default ServiceRemove;
