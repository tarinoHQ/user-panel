import React, { Component, PropTypes } from 'react';
import compact from 'lodash/compact';
import { v4 } from 'node-uuid';
import c from 'rc-classnames';
import map from 'lodash/map';

class ChecklistRow extends Component {
  static propTypes = {
    label: PropTypes.string,
    checkboxes: PropTypes.arrayOf(PropTypes.object),
    // { key: 'de', onChange: () => {}, label: 'ad', checked: false }
  }

  static defaultProps = {
    rows: []
  }

  render() {
    const { label, checkboxes, ...props } = this.props;

    return (
      <div className="checklist__row" {...props}>

        <div className="checklist__row__checkboxes">
          {map(compact(checkboxes), chbx => {
            return (
              <label
                key={chbx.key}
                className={c('checklist__row__checkarea', {
                  'checklist__row__checkarea--checked': !!chbx.checked
                })}
                {...(chbx.props || {})}>
                <input
                  className={c('checklist__row__checkbox')}
                  type="checkbox"
                  checked={!!chbx.checked}
                  onChange={chbx.onChange}
                  {...(chbx.inputProps || {})}
                />
                <span className="checklist__row__check-label">{chbx.label}</span>
              </label>
            );
          })}
        </div>

        <div className="checklist__row__label">
          {label}
        </div>
      </div>
    );
  }
}

class Checklist extends Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.function])),
    // [{
    // label: 'string',
    // checkboxes: [
    // { key: 'de', onChange: () => {}, label: 'ad', checked: false }
    // ]
    // }]
  }

  static defaultProps = {
    rows: []
  }

  renderRows() {
    const { rows, ...props } = this.props;
    const parsedRows = map(rows, r => (
      <ChecklistRow
        key={v4()}
        label={r.label}
        checkboxes={r.checkboxes}
        {...(r.props || {})}
      />
    ));

    return parsedRows;
  }

  render() {
    const { className, rows, ...props } = this.props;

    return (
      <div className={c('checklist', className)} {...props}>
        {this.renderRows()}
      </div>
    );
  }
}

export default Checklist;
