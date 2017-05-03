import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import delay from 'lodash/delay';
import { v4 } from 'node-uuid';

const ModalClose = (props) => {
  return (
    <div {...props} className="modal-close" />
  );
};

class ModalWindow extends React.Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    width: PropTypes.number,
  }

  static defaultProps = {
    hideCloseButton: false,
  }

  closeModal () {
    this.props.removeActiveModal();
  }

  _handleOverlayClick (e) {
    this.closeModal();
  }

  _handleModalClick (e) {
    e.stopPropagation();
  }

  _handleCloseClick () {
    this.closeModal();
  }

  renderModal () {
    let { hideCloseButton, isOpen, content, removeActiveModal, modalId, ...props } = this.props;

    return (
      <div
        key={v4()}
        className="screen-overlay"
        onClick={this._handleOverlayClick.bind(this)}>
        <div
          {...props}
          className="modal"
          onClick={this._handleModalClick.bind(null)}>
          {hideCloseButton || <ModalClose onClick={this._handleCloseClick.bind(this)}/>}
          {React.cloneElement(content(), {
            closeModal: this.closeModal.bind(this)
          })}
        </div>
      </div>
    );
  }

  render () {
    let { modalId, ...props } = this.props;

    return (
      <Transition
        component={false} // don't use a wrapping component
        measure={false} // don't measure component
        enter={{
          opacity: 1,
          translateY: 0
        }}
        leave={{
          opacity: 0,
          translateY: 10
        }}
      >
        {this.props.isOpen === true && this.renderModal()}
      </Transition>
    );
  }
}

export default ModalWindow;
