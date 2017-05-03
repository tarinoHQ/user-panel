import React, { Component, PropTypes } from 'react';
import c from 'rc-classnames';

class SectionTitle extends Component {
  render() {
    const { subtitle, title, className, ...props } = this.props;
    const typeOfTitle = typeof title;
    const typeOfSubtitle = typeof subtitle;

    return (
      <div className={c('section-title', className)} {...props}>

        <h2 className="section-title__title">
          {typeOfTitle === 'function' ? title() : title}
        </h2>

        {typeOfSubtitle !== 'undefined' &&
          <p className="section-title__subtitle">
            {typeOfSubtitle === 'function' ? subtitle() : subtitle}
          </p>
        }

      </div>
    );
  }
}

export default SectionTitle;
