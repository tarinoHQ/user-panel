import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';
import map from 'lodash/map';

class Drawer extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    // e.g: [{ onClick: ()=>{}, props: {}, title: '', render: () => {}, key: 's' }]
    activeItem: PropTypes.string
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const {
      items,
      activeItem,
      className,
      ...props
    } = this.props;

    return (
      <div className="drawer">
        {map(items, i => {
          const { className, ...itemProps } = i.props || {};
          const renderSpecified = i.hasOwnProperty('render');
          const hasIcon = i.hasOwnProperty('iconClass');

          return (
            <button
              key={i.key}
              className={c('drawer__item', {
                'drawer__item--active': activeItem === i.key,
                'drawer__item--has-icon': hasIcon
              }, className)}
              onClick={i.onClick}
              {...itemProps}>
              <span className={c('drawer__icon', i.iconClass)}></span>
              {renderSpecified ? i.render() : i.title}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Drawer;
