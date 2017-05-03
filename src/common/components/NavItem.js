import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import { Motion, spring, presets } from 'react-motion';
import { Link } from 'react-router';

@onClickOutside
class NavItem extends Component {
  constructor(p) {
    super(p);
    this.state = {
      isBubbleOpen: false
    };
    this._toggleBubble = this._toggleBubble.bind(this);
  }

  static propTypes = {
    bubbleItems: PropTypes.arrayOf(PropTypes.object),
    // Sample bubbleItem: { title: '', linkTo: '', className: ''. extra: '', separator: false }
    linkTo: PropTypes.string,
  }

  static defaultProps = {
    bubbleItems: [],
    linkTo: ''
  }

  handleClickOutside() {
    this.setState({ isBubbleOpen: false });
  }

  _toggleBubble() {
    if(this.hasBubbleItems())
      this.setState({ isBubbleOpen: !this.state.isBubbleOpen });
  }

  getBubbleStyle() {
    if (this.state.isBubbleOpen) {
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

  hasBubbleItems() {
    return this.props.bubbleItems.length !== 0;
  }

  renderBubbleItems() {
    return (
      <Motion
        style={this.getBubbleStyle()}>
        {v =>
          <div
            style={{
              opacity: v.opacity,
              transform: `scale(${v.scale})`,
              display: v.opacity == 0 ? 'none' : 'block'
            }}
            className="nav-item__bubble">
            <ul>

              {map(this.props.bubbleItems, (item) => {
                let { separator, className, linkTo, title, extra, ...itemProps } = item;

                if (typeof separator !== 'undefined' && separator) {
                  return <li key={v4()} className="nav-item__bubble__separator"></li>;
                }

                return (
                  <li key={v4()} className={c('nav-item__bubble__item', className)} {...itemProps}>
                    <Link
                      to={linkTo}
                      activeClassName="is-active">
                      {title}
                    </Link>
                    {typeof extra !== 'undefined' && extra()}
                  </li>
                );
              })}

            </ul>
          </div>
        }
      </Motion>
    );
  }

  render() {
    let { linkTo, children, className, bubbleItems, ...props } = this.props;

    let linkProps = {
      className: c('nav-item__link', {
        'nav-item__link--arrow-down': this.hasBubbleItems(),
        'is-open': this.state.isBubbleOpen
      }),
      onClick: this._toggleBubble,
      children: children
    };

    return (
      <div
        className={c(
          'nav-item',
          className
        )}
        {...props}
      >
        {
          linkTo !== ''
          ? <Link
              {...linkProps}
              to={linkTo}
              activeClassName="nav-item__link--active" />
          : <button {...linkProps} />
        }

        {this.hasBubbleItems() && this.renderBubbleItems()}
      </div>
    );
  }
}

export default NavItem;
