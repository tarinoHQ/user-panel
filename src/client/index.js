import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';
import Raven from 'raven-js';
import '../common/utils/dom4';
import '../common/utils/modernizr';
import '../../bower_components/placeholders/dist/placeholders.min';

// App specific imports
import Root from '../common/containers/Root';
import configureStore from '../common/store/configureStore';
import rootSaga from '../common/sagas';
import routes from '../common/routes';
import configureHistory from '../common/services/history';

// Redux Stuff
import { dispatchRequestUser } from '../common/sagas/auth';

// Styles
import '../common/styles';
// styles._insertCss();

// Initilize sotre
const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

// Fetch user 
dispatchRequestUser(store);
setInterval(() => dispatchRequestUser(store), 60 * 1000);

// Initilize history
const history = configureHistory(store);

// Config sentry
Raven.config('https://a9b54051a97647a292707d86f1823787@sentry.io/78673')
  .install();

// Element to render app in
const rootElement = document.getElementById('root');

// Render app in browser
// const rootCompProps = { store: store, history: history, routes: routes };
const rootCompProps = { history, routes, store };
render(
  <Provider store={store}>
    <Root {...rootCompProps} />
  </Provider>,
  rootElement
);

// Hot module replacment for dev purpose
// if (module.hot) {
//   module.hot.accept('../common/routes', () => {
//     const newRoutes = require('../common/routes').default;
//     render(
//       <AppContainer>
//         <Provider store={store}>
//           <Root history={history} routes={newRoutes} />
//         </Provider>
//       </AppContainer>,
//       rootElement
//     );
//   });
// }

/**
 * Warning from React Router, caused by react-hot-loader.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
// if (module.hot) {
//   const isString = (string) => typeof string === 'string';
//
//   const orgError = console.error; // eslint-disable-line no-console
//   console.error = (...args) => { // eslint-disable-line no-console
//     if (args && args.length === 1 && isString(args[0]) && args[0].indexOf('You cannot change <Router routes>;') > -1) {
//       // React route changed
//     } else {
//       // Log the error as normally
//       orgError.apply(console, args);
//     }
//   };
// }
