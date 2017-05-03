import React, { Component, PropTypes } from 'react';
import { toHumanFileSize } from '../utils/numberUtils';
import { toPersian } from '../utils/numberUtils';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compact from 'lodash/compact';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/support';
import * as selectors from '../selectors/support';

import { Motion, spring, presets } from 'react-motion';
import TicketMsg from '../components/TicketMsg';
import IconText from '../components/IconText';
import DateTime from '../components/DateTime';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Dropzone from 'react-dropzone';
import Row from '../components/Row';

const styles = {
  default: {
    margin: '15px 0 15px 0',
    padding: 15,
    borderRadius: '5px',
    border: '2px dashed #444',
    color: '#444',
    cursor: 'pointer',
  },
  active: {
    border: '2px solid #f5843c',
    color: '#f5843c',
  }
};

@withRouter
@connect(
  state => ({
    // Ticket Reply
    isReplySending: selectors.isTicketReplySending(state),
    replyError: selectors.getTicketReplyError(state),
    replyText: selectors.getTicketReplyText(state),
    replyAttachment: selectors.getTicketReplyAttachment(state),
    // Ticket Messages
    isMessagesFetching: selectors.isTicketMessagesFetching(state),
    getMessagesError: selectors.getTicketMessagesError(state),
    getMessages: selectors.getTicketMessages(state),
    // Tickets
    getTicketsById: selectors.getTicketsById(state),
  }),
  {
    // Ticket Reply
    setTicketReplyText: actions.setTicketReplyText,
    setTicketReplyAttachment: actions.setTicketReplyAttachment,
    sendTicketReply: actions.sendTicketReply,
    // Ticket Messages
    requestTicketMessages: actions.requestTicketMessages,
    // Tickets
    requestTickets: actions.requestTickets,
  }
)
class SupportThread extends Component {
  constructor(props) {
    super(props);

    this.ticketId           = this.props.params.id;
    this._retryClicked      = this._retryClicked.bind(this);
    this._textChanged       = this._textChanged.bind(this);
    this._attachmentChanged = this._attachmentChanged.bind(this);
    this._submitClicked     = this._submitClicked.bind(this);
  }

  componentDidMount() {
    this.props.requestTickets(this.ticketId);
    this.props.requestTicketMessages(this.ticketId);
  }

  _textChanged(e) {
    this.props.setTicketReplyText(e.target.value);
  }

  _attachmentChanged(files) {
    this.props.setTicketReplyAttachment(files[0] || null);
  }

  _submitClicked() {
    this.props.sendTicketReply(this.ticketId);
  }

  _retryClicked() {
    this.props.sendTicketReply(this.ticketId);
  }

  getTicketsById() {
    return this.props.getTicketsById[this.ticketId] || {};
  }

  messagesLoadingStyles() {
    if (this.props.isMessagesFetching) {
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

  renderMessagesLoading() {
    return (
      <Motion style={this.messagesLoadingStyles()}>
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

  renderMessagesError() {
    return !!this.props.getMessagesError && (
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

  renderMessages() {
    const { isMessagesFetching, getMessagesError, getMessages } = this.props;
    return map(getMessages, msg => (
      <TicketMsg
        key={v4()}
        author={msg.type}
        name={msg.dep_user.name}
        role={msg.dep_user.role}
        avatar={msg.dep_user.avatar}
        createdAt={msg.created}
        attachments={compact(msg.files)}
        text={msg.msg}
      />
    ));
  }

  render() {
    const { router, isReplySending, replyError, replyText, replyAttachment, isMessagesFetching, getMessagesError, getMessages, sendTicketReply, requestTicketMessages, setTicketReplyText, setTicketReplyAttachment, getTicketsById } = this.props;

    return (
      <div>
        <Row style={{ marginBottom: 20, textAlign: 'center' }}>
          <Button
            noBg={true}
            theme="warning"
            iconClass="icon-right-open-big"
            onClick={() => router.push('/support/threads')}>
            بازگشت
          </Button>
        </Row>

        <header className="thread__header">
          <div className="thread__info-pair">
            <span className="thread__info-pair__key">کد</span>
            <span>{toPersian(this.ticketId)}</span>
          </div>

          <div className="thread__info-pair">
            <span className="thread__info-pair__key">ساخته‌شده از</span>
            <DateTime time={this.getTicketsById().created} />
          </div>

          <div className="thread__info-pair">
            <span className="thread__info-pair__key">محصول</span>
            <span>{(this.getTicketsById().order || {}).name || '...'}</span>
          </div>

          <h1 className="thread__title">
            {this.getTicketsById().title || 'پیام‌های درخواست شما ...'}
          </h1>
        </header>

        <Row style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #e5e5e5' }}>
          <Input
            multiLine={true}
            inputProps={{ style: { minHeight: 100 } }}
            fullWidth={true}
            label="متن پاسخ‌تان را بنویسید"
            placeholder="سلام، میخواستم بگم ..."
            value={replyText}
            onChange={this._textChanged}
          />

          <Dropzone
            style={styles.default}
            activeStyle={styles.active}
            disablePreview={true}
            accept="application/gzip,application/tar,application/tar+gzip,application/x-gzip,application/zip,image/*,application/pdf"
            onDrop={this._attachmentChanged}>
            <div>
              <span className="icon-file-image" />
              <span className="icon-file-pdf" />
              <span className="icon-file-archive" />&nbsp;
              ضمیمه را به صورت فشرده، تصویر یا PDF انتخاب کنید.
              {!!replyAttachment &&
                <span style={{ color: '#11c358' }}>&nbsp;
                  <strong>{replyAttachment.name}</strong>&nbsp;:&nbsp;
                  {toHumanFileSize(replyAttachment.size)}
                </span>
              }
            </div>
          </Dropzone>

          <Row style={{ marginTop: 10 }}>
            {!!replyError &&
              <IconText
                style={{ marginBottom: 10 }}
                color="warning"
                iconClass="icon-attention">
                مشکلی در ارتباط به وجود آمده‌است. دوباره تلاش کنید.
              </IconText>
            }
            <Button
              loading={isReplySending}
              iconClass="icon-flight"
              children="ارسال پیام"
              onClick={this._submitClicked}
            />

          </Row>
        </Row>

        {this.renderMessages()}
        {this.renderMessagesLoading()}
        {this.renderMessagesError()}

      </div>
    );
  }
}

export default SupportThread;
