import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import getImage from '../data/images';
import c from 'rc-classnames';

import RetinaImage from './RetinaImage';

@onClickOutside
class Window extends Component {

  static propTypes = {
    title: PropTypes.string,
    backLink: PropTypes.string,
    children: PropTypes.node,
    onBackClick: PropTypes.func,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    onBackClick: () => {},
    onClose: () => {},
    isOpen: false,
  }

  handleClickOutside() {
    this.props.onClose();
  }

  render() {
    const { title, backLink, children, onBackClick, onClose, isOpen, className, ...props } = this.props;

    return isOpen && (
      <div className={c('window', className)}>
      
        <div className="window__close" onClick={onClose}>
          <RetinaImage src={getImage('cancel')} />
        </div>

        {title && 
          <div className="window__header">
            <div 
              className="window__title"
              style={{ paddingTop: !backLink ? 7 : undefined }}>
              {title}
            </div>
            {!!backLink && 
              <div className="window__backlink" onClick={onBackClick}>{backLink}</div>}
          </div>
        }

        <div className="window__content">
          {children}
        </div>

      </div>
    );
  }
}

export default Window;