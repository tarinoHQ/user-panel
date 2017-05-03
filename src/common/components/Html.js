import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import { hasLocalStorage } from '../utils/windowUtils';

let scripts = [];
let css = [];

if (process.env.NODE_ENV === "production") {
  // on production, include scripts and css from the webpack stats
  const config = require("../../../webpack.config.prod");
  const stats = require("../../../dist/stats.json");
  scripts.push(`${config.output.publicPath}${stats.main}`);
  css.push(`${config.output.publicPath}${stats.css}`);
}
else {
  // on development, use the webpack dev server config
  // css are not needed since they are injected inline with webpack
  const config = require("../../../webpack.config.dev");
  const stats = require("../../../dist/stats.json");
  scripts.push(`${config.output.publicPath}${config.output.filename}`);
  css.push(`${config.output.publicPath}${stats.css}`);
}
class Html extends Component {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
    token: PropTypes.string,
  };

  render() {
    const { assets, component, store, token } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <Helmet
            htmlAttributes={{lang: "fa", amp: undefined}}
            title="میزمدیریت"
            titleTemplate="تارینو - %s"
            defaultTitle="تارینو - میزمدیریت"
            titleAttributes={{itemprop: "name", lang: "en"}}
            onChangeClientState={(newState) => console.log(newState)}
          />

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {css.map((href, k) => <link key={k} rel="stylesheet" type="text/css" href={href} />)}

        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
            $crisp=[];CRISP_WEBSITE_ID="95ef2052-7110-467b-a5c6-4e36feb8e143";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.im/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `}} charSet="UTF-8"/>
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(store.getState())}; ${!!token ? `localStorage.token="${token}";` : ''}`}} charSet="UTF-8"/>
          
          {scripts.map((src, i) => <script src={src} key={i} />)}
        </body>
      </html>
    );
  }
}

export default Html;
