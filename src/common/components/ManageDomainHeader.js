import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import CopyBtn from './CopyBtn';
import Button from './Button';

class ManageDomainHeader extends Component {
  static PropTypes = {
    url: PropTypes.string.isRequired
  }

  render() {
    const { url, ...props } = this.props;

    let fullUrl = url;
    if (fullUrl.indexOf('http://') === -1 || fullUrl.indexOf('http://') === -1) {
      fullUrl = 'http://' + url;
    }

    return (
      <div className="manage-domain-header" {...props}>

        <Button
          className="manage-domain-header__button"
          iconClass="icon-link-ext"
          onClick={() => window.open(fullUrl)}>
          مشاهده سایت
        </Button>

        <div className="manage-domain-header__title">
          <h2 className="manage-domain-header__title__text">
            {url}
          </h2>
          <CopyBtn
            className="manage-domain-header__title__copy"
            text={url} />
        </div>

      </div>
    );
  }
}

export default ManageDomainHeader;
