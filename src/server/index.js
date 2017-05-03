/* eslint-disable no-console */
import "babel-polyfill";

import configureStore from '../common/store/configureStore';
import { match, createMemoryHistory } from 'react-router';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import DashboardPlugin from 'webpack-dashboard/plugin';
import { host, port, staticPath } from '../../config';
import { renderToString } from 'react-dom/server';
// import { AppContainer } from 'react-hot-loader';
import Root from '../common/containers/Root';
import Html from '../common/components/Html';
import config from '../../webpack.config.dev';
import { Provider } from 'react-redux';
import rootSaga from '../common/sagas';
import PrettyError from 'pretty-error';
import compression from 'compression';
import routes from '../common/routes';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
// import webpack from 'webpack';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import path from 'path';

const app = express();
const pretty = new PrettyError();
// const compiler = webpack(config);
pretty.start();
// compiler.apply(new DashboardPlugin());
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
if(__DEVELOPMENT__) 
  console.log('panel is in dev mode.');

console.log('are we in?');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/dist', express.static(staticPath));
app.use('/', express.static(staticPath));
app.use(compression());
app.use(favicon(path.join(__dirname, '../../favicon.ico')));

if (__DEVELOPMENT__) {
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

function renderPage({ renderProps, store, res, token }) {
    const component = (
      <Provider store={store}>
        <Root store={store} routes={routes} history={createMemoryHistory()} renderProps={renderProps} type="server" />
      </Provider>
    );

    console.log('we are at render page');

    res.status(200);

    store
      .runSaga(rootSaga)
      .done
      .then(() => {
        res.send('<!doctype html>\n' +
          renderToString(<Html
            component={component}
            store={store}
            token={token}
          />));
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send('Error while fetching data');
      });

    store.close();
}

app.use((req, res) => {
  console.log('we are at middleware');

  const store = configureStore();

  match({ routes, location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      console.log('we are at match');
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500);
      } else if (renderProps) {
        const token = req.query.token || undefined;
        renderPage({ renderProps, store, res, token });
      } else {
        res.status(404).send('Not found');
      }
    });
});

if (port) {
  app.listen(port, error => {
    if (error) {
      console.error(error);
    } else {
      console.info('\n--> ✅  Server is running on port %s.', port);
      console.info('--> 💻  Open http://%s:%s in a browser to view the app.', host, port);
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