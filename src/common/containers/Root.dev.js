import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, RouterContext, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import DevTools from './DevTools';
// import importedRoutes from '../routes';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    routes: PropTypes.node
  };

  render() {
    const { store, history, routes, type, renderProps } = this.props;

    return (
      <div>
        { type === 'server'
          ? <RouterContext {...renderProps} />
          : <Router
              history={history}
              routes={routes}
              render={applyRouterMiddleware(useScroll())} />
        }
        {/* <DevTools /> */}
      </div>
    );
  }
}
