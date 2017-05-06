'use strict';

require('babel-polyfill');

var _configureStore = require('../common/store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRouter = require('react-router');

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _config = require('../../config');

var _server = require('react-dom/server');

var _Root = require('../common/containers/Root');

var _Root2 = _interopRequireDefault(_Root);

var _Html = require('../common/components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _webpackConfig = require('../../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _reactRedux = require('react-redux');

var _sagas = require('../common/sagas');

var _sagas2 = _interopRequireDefault(_sagas);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _routes = require('../common/routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import webpack from 'webpack';

// import { AppContainer } from 'react-hot-loader';

// import DashboardPlugin from 'webpack-dashboard/plugin';
var app = (0, _express2.default)(); /* eslint-disable no-console */

var pretty = new _prettyError2.default();
// const compiler = webpack(config);
pretty.start();
// compiler.apply(new DashboardPlugin());
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));
var __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
if (__DEVELOPMENT__) console.log('panel is in dev mode.');

console.log('are we in?');

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use('/dist', _express2.default.static(_config.staticPath));
app.use('/', _express2.default.static(_config.staticPath));
app.use((0, _compression2.default)());
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, '../../favicon.ico')));

if (__DEVELOPMENT__) {
  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

function renderPage(_ref) {
  var renderProps = _ref.renderProps,
      store = _ref.store,
      res = _ref.res,
      token = _ref.token;

  var component = _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_Root2.default, { store: store, routes: _routes2.default, history: (0, _reactRouter.createMemoryHistory)(), renderProps: renderProps, type: 'server' })
  );

  console.log('we are at render page');

  res.status(200);

  store.runSaga(_sagas2.default).done.then(function () {
    res.send('<!doctype html>\n' + (0, _server.renderToString)(_react2.default.createElement(_Html2.default, {
      component: component,
      store: store,
      token: token
    })));
  }).catch(function (e) {
    console.log(e);
    res.status(500).send('Error while fetching data');
  });

  store.close();
}

app.use(function (req, res) {
  console.log('we are at middleware');

  var store = (0, _configureStore2.default)();

  (0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
    console.log('we are at match');
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
    } else if (renderProps) {
      var token = req.query.token || undefined;
      renderPage({ renderProps: renderProps, store: store, res: res, token: token });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (_config.port) {
  app.listen(_config.port, function (error) {
    if (error) {
      console.error(error);
    } else {
      console.info('\n--> ✅  Server is running on port %s.', _config.port);
      console.info('--> 💻  Open http://%s:%s in a browser to view the app.', _config.host, _config.port);
    }
  });
} else {
  console.error('ERROR: No PORT environment variable has been specified');
}

// app.use(function(req, res) {
//   console.log('req', req.url);
//   const store = configureStore();

//   // Note that req.url here should be the full URL path from
//   // the original request, including the query string.
//   match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps && renderProps.components) {
//       const rootComp = (
//         <Provider store={store}>
//           <Root store={store} routes={routes} history={createMemoryHistory()} renderProps={renderProps} type="server" />
//         </Provider>
//       );

//       store.runSaga(rootSaga).done.then(() => {
//         console.log('sagas complete');
//         res.status(200).render('index', {
//           title: 'User Panel',
//           body: renderToString(rootComp),
//           initialState: JSON.stringify(store.getState())
//         });
//       }).catch(e => {
//         console.log(e.message);
//         res.status(500).send(e.message);
//       });

//       renderToString(rootComp);
//       store.close();

//       //res.status(200).send(layout('','{}'))
//     } else {
//       res.status(404).send('Not found');
//     }
//   });
// });
