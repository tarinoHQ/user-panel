import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/ui';
import * as selectors from '../selectors/ui';

import ModalWindow from '../components/ModalWindow';

const mapStateToProps = (state, ownProps) => ({
  isOpen: selectors.getActiveModal(state) == ownProps.modalId
});

const mapDispatchToProps = {
  removeActiveModal: actions.removeActiveModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
