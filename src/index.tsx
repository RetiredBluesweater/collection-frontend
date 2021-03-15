import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';

import { AppRoot } from './components/AppRoot';
import { getOS } from './utils/device';
import { getInsets } from './utils/dom';
import config from './config';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-KM2M6J5',
};

TagManager.initialize(tagManagerArgs);

// Notify native application, initialization done. It will make native
// application hide loader and display this application.

/* if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const eruda = require('eruda');
  const el = document.createElement('div');
  document.body.appendChild(el);

  eruda.init({
    container: el,
    tool: ['console', 'elements'],
  });
} */

// Waiting for assets to be loaded to make sure, all css and js files are
// loaded
window.onload = () => {
  // Getting current operating system
  const os = getOS(navigator.userAgent);

  // Getting launch parameters
  const launchParams = window.location.search.slice(1);

  // According to that we know, there are CSS-variables defined in index.html
  // we are getting insets from them
  const insets = getInsets();

  // We are making some timeout due to we are unable to get device insets
  // correctly. There is a little timeout after VKWebAppInit is called when
  // we cannot get truthy insets
  ReactDOM.render(
    <AppRoot os={os} launchParams={launchParams} insets={insets} config={config} />,
    document.getElementById('root'),
  );
};
