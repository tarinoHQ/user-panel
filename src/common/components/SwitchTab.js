import React, { Component, PropTypes } from 'react';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

class SwitchOption extends Component {
  render() {
    const { active, className, children, image, ...props } = this.props;

    return (
      <div
        className={c('switch-tab__option', {
          'switch-tab__option--active': active
        }, className)}
        {...props}>

        {image && <img className="switch-tab__option__img" src={image} />}

        <span>{children}</span>

      </div>
    );
  }
}

class SwitchTab extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
    })).isRequired,
    theme: PropTypes.oneOf(['gray', 'blue']),
    activeOption: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: 'blue'
  };

  render() {
    const { options, theme, onChange, activeOption, className, ...props } = this.props;

    return (
      <div className={c('switch-tab', `switch-tab--${theme}`, className)} {...props}>
        {map(options, o => {
          return (
            <SwitchOption
              key={o.key}
              active={o.key === activeOption}
              children={o.label}
              image={o.image}
              onClick={onChange.bind(undefined, o.key)}
            />
          );
        })}
      </div>
    );
  }
}

export default SwitchTab;
