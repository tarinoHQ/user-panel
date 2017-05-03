import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import c from 'rc-classnames';
import map from 'lodash/map';

import * as actions from '../actions/themePicker';
import * as selectors from '../selectors/themePicker';

export class ThemeCats extends Component {
  static propTypes = {
    cats: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string, 
      title: PropTypes.string,
      active: PropTypes.bool,
    })),
    onCatClick: PropTypes.func,
    activeCat: PropTypes.string
  };

  render() {
    const { cats, onCatClick, activeCat } = this.props;

    return (
      <div className="theme-cats">
        <ul className="theme-cats__list">

          <li 
            key="all-themes"
            onClick={() => onCatClick('0')}
            className={c('theme-cats__cat', { 'theme-cats__cat--active': '0' === activeCat })}>
            همه
          </li>

          {map(cats, ({ id, title, active, onClick }) => (
            <li 
              key={id}
              onClick={() => onCatClick(id)}
              className={c('theme-cats__cat', { 'theme-cats__cat--active': id === activeCat })}>
              {title}
            </li>
          ))}
          
        </ul>
      </div>
    );
  }
}


@connect(
  state => ({
    cats: selectors.getCats(state),
    activeCat: selectors.getActiveCat(state)
  }),
  actions
)
export class ThemeCatsContainer extends Component {
  constructor(props) {
    super(props);
    this._catClicked = this._catClicked.bind(this);
  }

  _catClicked(id) {
    this.props.setThemeCat(id);
  }

  render() {
    return <ThemeCats {...this.props} onCatClick={this._catClicked} />;
  }
}

export default ThemeCatsContainer;