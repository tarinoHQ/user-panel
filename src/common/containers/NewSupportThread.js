import React, { Component, PropTypes } from 'react';
import { toHumanFileSize } from '../utils/numberUtils';
import { connect } from 'react-redux';

import * as supportActions from '../actions/support';
import * as supportSelectors from '../selectors/support';

import Select from '../components/Select';
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

@connect(
  state => ({
    ticketTitle: supportSelectors.getNewTicketTitle(state),
    ticketTarget: supportSelectors.getNewTicketTarget(state),
    ticketText: supportSelectors.getNewTicketText(state),
    ticketAttachment: supportSelectors.getNewTicketAttachment(state),
    isSending: supportSelectors.isNewTicketSending(state),
  }),
  {
    setTicketTitle: supportActions.setNewTicketTitle,
    setTicketTarget: supportActions.setNewTicketTarget,
    setTicketText: supportActions.setNewTicketText,
    setTicketAttachment: supportActions.setNewTicketAttachment,
    requestNewTicket: supportActions.requestNewTicket,
  }
)
class NewSupportThread extends Component {
  constructor(props) {
    super(props);

    this._titleChanged = this._titleChanged.bind(this);
    this._targetChanged = this._targetChanged.bind(this);
    this._textChanged = this._textChanged.bind(this);
    this._attachmentChanged = this._attachmentChanged.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  _titleChanged(e) {
    this.props.setTicketTitle(e.target.value);
  }

  _targetChanged(value) {
    this.props.setTicketTarget(value.value);
  }

  _textChanged(e) {
    this.props.setTicketText(e.target.value);
  }

  _attachmentChanged(files) {
    this.props.setTicketAttachment(files[0] || null);
  }

  _submitClicked() {
    this.props.requestNewTicket();
  }

  render() {
    let { ticketTitle, ticketTarget, ticketText, ticketAttachment, setTicketTitle, setTicketTarget, setTicketText, setTicketAttachment, requestNewTicket, isSending } = this.props;

    return (
      <div>
        <form onSubmit={() => false}>

          <Input
            smallFullWidth={true}
            style={{ maxWidth: '60%' }}
            label="موضوع درخواست‌تان چیست؟"
            placeholder="مثال:‌ چرا نمی‌تونم دامنه .me ثبت کنم؟"
            value={ticketTitle}
            onChange={this._titleChanged}
            endIcons={[
              { className: 'icon-pencil' },
            ]}
          />

          <Select
            label="مایلید کدام بخش درخواست را دریافت کند؟"
            ltr={false}
            name="target"
            placeholder="یکی را انتخاب کنید ..."
            value={ticketTarget}
            onChange={this._targetChanged}
            options={[
              { value: '1', label: 'بخش پشتیبانی' },
              { value: '2', label: 'خدمات پس از فروش' }
            ]}
          />

          <Input
            multiLine={true}
            inputProps={{ style: { minHeight: 100 } }}
            fullWidth={true}
            label="جزییات درخواست خود را بنویسید."
            placeholder="میخواستم بدونم چرا ..."
            value={ticketText}
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
              {!!ticketAttachment &&
                <span style={{ color: '#11c358' }}>&nbsp;
                  <strong>{ticketAttachment.name}</strong>&nbsp;:&nbsp;
                  {toHumanFileSize(ticketAttachment.size)}
                </span>
              }
            </div>
          </Dropzone>

          <Row style={{ marginTop: 10 }}>
            <Button
              loading={isSending}
              iconClass="icon-flight"
              children="ارسال درخواست"
              onClick={this._submitClicked}
            />
          </Row>

        </form>
      </div>
    );
  }
}

export default NewSupportThread;
