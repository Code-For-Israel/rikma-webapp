// Put all packages together.
// Used to generate umd/index.prod.js

import React from 'react';
import { createRoot } from 'react-dom/client';

import { IntlProvider } from 'react-intl';

import TinodeWeb from './views/tinode-web.jsx';

// Insert google analytics script and tag if configured.
if (typeof FIREBASE_INIT != 'undefined' && FIREBASE_INIT && FIREBASE_INIT.measurementId) {
  const head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + FIREBASE_INIT.measurementId;
  script.async = true;
  head.prepend(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', FIREBASE_INIT.measurementId);
}

const getHebrewTranslations = () => import('./i18n.min/he.json');

// Clear caches in dev mode
if (document.getElementsByTagName('html')[0].getAttribute('mode') === 'dev') {
  console.log('Clearing caches')
  window.caches.keys().then(names => {
    names.forEach(name => {
      window.caches.delete(name);
    });
  });
}

// Render the app.
const root = createRoot(document.getElementById('mountPoint'));
getHebrewTranslations().then(messages =>
  root.render(
    <IntlProvider locale='he' messages={messages} textComponent={React.Fragment}>
      <TinodeWeb />
    </IntlProvider>
));
