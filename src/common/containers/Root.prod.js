import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, RouterContext, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import importedRoutes from '../routes';
// No devtools

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.node.isRequired
  };

  render() {
    const { store, history, routes, type, renderProps } = this.props;

    return (
      <Provider store={store}>
        <div>
          { type === 'server'
            ? <RouterContext {...renderProps} />
            : <Router
                history={history}
                routes={importedRoutes}
                render={applyRouterMiddleware(useScroll())} />
          }
        </div>
      </Provider>
    );
  }
}
