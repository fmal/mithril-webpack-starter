import './globals.css';

/* eslint-disable no-unused-vars*/
import m, { mount } from 'mithril';
/* eslint-enable no-unused-vars*/

import AppLayout from './components/appLayout';
import appState from './models/appState';

mount(
  document.getElementById('root'),
  <AppLayout
    messages={appState.messages}
  />
);

if (module.hot) {
  module.hot.accept();
}
