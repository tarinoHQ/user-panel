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
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Link from '../components/Link';
import Line from '../components/Line';

@connect(
  state => ({
    MdDeleteReason: selectors.getMdDeleteReason(state),
    isMdDeleteSending: selectors.isMdDeleteSending(state),
    MdDeleteStatus: selectors.getMdDeleteStatus(state),
    MdDeleteError: selectors.getMdDeleteError(state),
  }),
  {
    setMdDeleteReason: actions.setMdDeleteReason,
    requestMdDelete: actions.requestMdDelete,
  }
)
@withRouter
class DomainRemove extends Component {
  constructor(props) {
    super(props);

    this.domainId       = this.props.domainId;
    this._reasonChanged = this._reasonChanged.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  _reasonChanged(v) {
    this.props.setMdDeleteReason(v.value);
  }

  _submitClicked() {
    this.props.requestMdDelete(this.domainId);
  }

  render() {
    const { router, MdDeleteReason, isMdDeleteSending, MdDeleteStatus, MdDeleteError, setMdDeleteReason, requestMdDelete, ...props } = this.props;

    return (
      <div>
        <SectionTitle
          style={{ marginTop: 0, paddingTop: 0 }}
          title="حذف دامنه"
          subtitle="برای از دست دادن مالکیت دامنه و آزاد شدن آن برای ثبت توسط دیگران"
        />

        <p> برای بهبود خدمات تارینو و راهنمایی بهتر کاربران، هدف خود را از حذف دامنه با زبان ساده بنویسید! (ماهم از رسمی نوشتن لذت نمی‌بریم !) ✌️</p>

        <Input
          inputProps={{ style: { minHeight: 80 } }}
          multiLine={true}
          fullWidth={true}
          label="چرا می‌خواهم دامنه را حذف کنم؟"
          placeholder="به خاطر اینکه ..."
          value={MdDeleteReason}
          onChange={this._reasonChanged}
        />

        <Line style={{ margin: '20px 0' }} />

        <Button
          style={{ display: 'inline', marginBottom: '8px' }}
          loading={isMdDeleteSending}
          theme="danger"
          iconClass="icon-cancel-1"
          onClick={this._submitClicked}>
          حذف دامنه
        </Button>
        {!!MdDeleteError &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="warning"
            iconClass="icon-attention">
            مشکلی در ارتباط به وجودآمده است. دوباره تلاش کنید.
          </IconText>
        }
        {MdDeleteStatus === 1 &&
          <IconText
            style={{ display: 'inline', marginRight: '8px' }}
            color="success"
            iconClass="icon-ok">
            پس از بررسی درخواست شما توسط تیم تارینو، در اسرع وقت انجام خواهد شد.
          </IconText>
        }

      </div>
    );
  }
}

export default DomainRemove;
