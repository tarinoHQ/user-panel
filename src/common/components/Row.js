import React, { Component, PropTypes, Children } from 'react';
import c from 'rc-classnames';
import has from 'lodash/has';

import Col from './Col';

class Row extends Component {

  static propTypes = {
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    gutter: PropTypes.string,
    gutterPosition: PropTypes.oneOf(['right', 'left', 'both']),
  }

  render() {
    const { dir, gutter, gutterPosition, className, children, ...props } = this.props;

    return (
      <div
        className={c('row', className)}
        {...props}
      >
        {Children.map(children,
         (child) => {
           if(has(child, 'type') && child.type.displayName == 'Col') {
             let props = {};
             if (typeof dir !== 'undefined') props.dir = dir;
             if (typeof gutter !== 'undefined') props.gutter = gutter;
             if (typeof gutterPosition !== 'undefined') props.gutterPosition = gutterPosition;
             return React.cloneElement(child, props);
           }

           return child;
         }
        )}
      </div>
    );
  }
}

export default Row;
