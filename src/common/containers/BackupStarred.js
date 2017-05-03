import React, { Component, PropTypes } from 'react';
import { toPersian, toHumanFileSizeFromMb } from '../utils/numberUtils';
import { backupKinds, kindsToFa } from '../constants/Backups';
import { connect } from 'react-redux';
import getImage from '../data/images';
import { v4 } from 'node-uuid';

import * as actions from '../actions/services';
import * as selectors from '../selectors/services';

import { Motion, spring, presets } from 'react-motion';
import { TableWithSorting } from '../components/Table';
import MessageBox from '../components/MessageBox';
import MoreBubble from '../components/MoreBubble';
import LongText from '../components/LongText';
import DateTime from '../components/DateTime';
import IconText from '../components/IconText';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Link from '../components/Link';

const s = {
  star: {
    fontSize: '16px',
    color: '#f5de2e',
  },
};

@connect(
  state => ({
    list: selectors.getMsStarredBackups(state),
    // ajax
    isFetching: selectors.isMsStarredBackupsFetching(state),
    status: selectors.getMsStarredBackupsStatus(state),
    error: selectors.getMsStarredBackupsError(state),
  }),
  actions
)
class BackupList extends Component {
  constructor(props) {
    super(props);
    this.orderId = props.orderId;
    this._retryClicked = this._retryClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestMsStarredBackups(this.orderId);
  }

  _retryClicked() {
    this.props.requestMsStarredBackups(this.orderId);
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
    const { list } = this.props;

    return (
      <div>

        <MessageBox
          style={{ marginTop: 20 }}
          singleLine={true}
          blink={false}
          type="info"
          title="پشتیبان‌های ستاره‌دار">
          با ستاره‌دار کردن هر پشتیبان، آن در سرور‌های تارینو بدون محدودیت زمانی ذخیره‌ می‌شود. شما می‌توانید حداکثر ۳ پشتیبان را ستاره‌دار کنید!
        </MessageBox>

        {this.renderLoading()}
        {this.renderError()}

        <TableWithSorting
          style={{ marginTop: 15 }}
          columns={[
            {
              key: 'id',
              title: 'شناسه',
              template: row => 
                <LongText
                  copyBtn={true} 
                  direction="ltr"
                  tooltip="برای مشاهده کد کامل کلیک کنید"
                  maxWidth="70px"
                  children={row.backupId} 
                />,
              sortBy: row => row.backupId
            },
            {
              key: 'kind',
              title: 'نوع پشتیبان‌گیری',
              template: row => <span>{kindsToFa[row.kind]}</span>,
              sortBy: row => row.kind
            },
            {
              key: 'size',
              title: 'حجم',
              template: row => <span dir="ltr">{toHumanFileSizeFromMb(row.size)}</span>,
              sortBy: row => row.size
            },
            {
              key: 'created',
              title: 'زمان دقیق',
              template: row => <DateTime time={row.created * 1000} />,
              sortBy: row => row.created
            },
            {
              key: 'star',
              title: '',
              template: row => 
                row.star == '1' ? <span className="icon-star" style={s.star} /> : <div />,
            },
            {
              key: 'actions',
              title: '',
              template: row => (

                <MoreBubble
                  bubbleItems={[
                    { title: 'بازگردانی این پشتیبان' },
                    { separator: true },
                    row.star == '0' 
                      ? { title: 'ستاره‌دار کردن', iconClass: 'icon-star', iconColor: '#f0c52e' }
                      : { title: 'حذف از ستاره‌دارها', iconClass: 'icon-cancel', iconColor: '#f0502e' },
                    { title: 'ذخیره در دراپ‌باکس', image: getImage('dropbox') },
                    { title: 'ذخیره در گوگل‌درایو', image: getImage('google-drive'), disabled: true },
                  ]}
                  children="بیشتر"
                />

              ),
            }
          ]}
          data={list}
        />

      </div>
    );
  }
}

export default BackupList;
