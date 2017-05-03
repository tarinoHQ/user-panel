import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class RichRadio extends Component {
  constructor(p) {
    super(p);

    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    onClick: () => {},
    onChange: () => {},
    inline: false,
    checked: false,
    disabled: false,
  }

  onClick(e) {
    this.props.onClick(e);
    if (!this.props.disabled) {
      this.props.onChange(this.props.value, e);
    }
  }

  render() {
    const { theme, icon, title, description, name, value, inline, checked, disabled, onClick, onChange, className, children, ...props } = this.props;
    const hasIcon = typeof icon !== 'undefined';

    return (
      <div
        className={c('rich-radio', {
          'rich-radio--inline': inline,
          'rich-radio--disabled': disabled,
          'rich-radio--checked': checked,
          'rich-radio--no-icon': !hasIcon,
        }, className)}
        onClick={this.onClick}
        {...props}
        >

        <input
          style={{ display: 'none', visibility: 'hidden' }}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => {}}
        />

        {hasIcon &&
          <div className="rich-radio__icon">
            <div className="rich-radio__icon__check" />
            <img className="rich-radio__icon__img" src={icon} />
          </div>
        }

        <div className="rich-radio__content">
          <div className="rich-radio__content__aligner">

            <div className="rich-radio__title">{title}</div>

            {typeof description !== 'undefined' &&
              <div className="rich-radio__description">{description}</div>}

          </div>
        </div>
      </div>
    );
  }
}

export default RichRadio;
