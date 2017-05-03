import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import c from 'rc-classnames';

import * as actions from '../actions/wallet';
import * as selectors from '../selectors/wallet';

import IconText from '../components/IconText';
import Button from '../components/Button';
import Input from '../components/Input';
import Link from '../components/Link';

@connect(
  state => ({
    showOffCodeInput: selectors.showOffCodeInput(state),
    offCode: selectors.getOffCode(state),
    isOffCodeValid: selectors.isOffCodeValid(state),
    isOffCodeFetching: selectors.isOffCodeFetching(state),
    offCodeStatus: selectors.getOffCodeStatus(state),
    offCodeError: selectors.getOffCodeError(state),
  }),
  {
    toggleOffCode: actions.toggleOffCode,
    setOffCode: actions.setOffCode,
    requestOffCode: actions.requestOffCode,
  }
)
class CouponForm extends Component {
  constructor(p) {
    super(p);

    this._showClicked = this._showClicked.bind(this);
    this._inputChanged = this._inputChanged.bind(this);
    this._submitClicked = this._submitClicked.bind(this);
  }

  static propTypes = {
    invoiceId: PropTypes.string.isRequired
  }

  _showClicked(e) {
    this.props.toggleOffCode();
  }

  _inputChanged(e) {
    this.props.setOffCode(e.target.value);
  }

  _submitClicked(e) {
    e.preventDefault();
    this.props.requestOffCode(this.props.invoiceId);
    return false;
  }

  renderShowBtn() {
    return (
      <div className="coupon-form__btn" onClick={this._showClicked}>
        کد تخفیف دارید؟
      </div>
    );
  }

  renderForm() {
    const { offCode, isOffCodeValid, isOffCodeFetching, offCodeStatus, offCodeError, ...props } = this.props;

    return (
      <form onSubmit={this._submitClicked}>
        <Input
          startIcons={[
            { className: 'icon-money' }
          ]}
          placeholder="کد تخفیف؟"
          value={offCode}
          onChange={this._inputChanged}
        />

        {offCodeStatus === 21 &&
          <IconText color="warning" iconClass="icon-pencil">دوباره کدرا بررسی کنید.</IconText>
        }

        {isOffCodeValid &&
          <IconText color="success" iconClass="icon-ok">کد معتبر است!</IconText>
        }

        <Button
          disabled={isOffCodeValid}
          loading={isOffCodeFetching}
          onClick={this._submitClicked}>
          اعمال تخفیف
        </Button>
      </form>
    );
  }

  render() {
    const { showOffCodeInput, offCode, isOffCodeValid, isOffCodeFetching, offCodeStatus, offCodeError, ...props } = this.props;

    return (
      <div className="coupon-form">
        {showOffCodeInput ? this.renderForm() : this.renderShowBtn()}
      </div>
    );
  }
}

export default CouponForm;
