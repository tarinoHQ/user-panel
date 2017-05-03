import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

import { Motion, spring, presets } from 'react-motion';
import { Link } from 'react-router';

@onClickOutside
class MoreBubble extends Component {
  constructor(p) {
    super(p);
    this.state = {
      isBubbleOpen: false
    };
    this._toggleBubble = this._toggleBubble.bind(this);
  }

  static propTypes = {
    bubbleItems: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.node,
      linkTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      className: PropTypes.string,
      extra: PropTypes.func,
      separator: PropTypes.bool,
      disabled: PropTypes.bool,
    })),
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
            className="more-bubble__bubble">
            <ul>

              {map(this.props.bubbleItems, (item) => {

                const { separator, className, image, iconClass, iconColor, style, linkTo, onClick, title, extra, disabled, ...itemProps } = item;

                if (typeof separator !== 'undefined' && separator) {
                  return <li key={v4()} className="more-bubble__separator"></li>;
                }

                let Wrapper = Link;
                if(!linkTo) {
                  Wrapper = ({ to, activeClassName, ...props }) => <a {...props} />;
                }
                if (disabled) {
                  Wrapper = ({ to, activeClassName, onClick, ...props }) => <span {...props} />;
                }

                return (
                  <li
                    key={v4()}
                    className={c('more-bubble__item', {
                      'more-bubble__item--image': image || iconClass,
                      'more-bubble__item--disabled': disabled
                    }, className)}
                    {...itemProps}>

                    <Wrapper
                      to={linkTo}
                      style={style}
                      activeClassName="is-active"
                      onClick={onClick}>

                      {image && <img className="more-bubble__item__image" src={image} />}
                      {iconClass && <span className={`${iconClass} more-bubble__item__icon`} style={{ color: iconColor }} />}

                      {title}
                    </Wrapper>

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
      className: c('more-bubble__link', {
        'more-bubble__link--arrow-down': this.hasBubbleItems(),
        'is-open': this.state.isBubbleOpen
      }),
      onClick: this._toggleBubble,
      children: children
    };

    return (
      <div
        className={c(
          'more-bubble',
          className
        )}
        {...props}
      >
        {
          linkTo !== ''
          ? <Link
              {...linkProps}
              to={linkTo} />
          : <button {...linkProps} />
        }

        {this.hasBubbleItems() && this.renderBubbleItems()}
      </div>
    );
  }
}

export default MoreBubble;
