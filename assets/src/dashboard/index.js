/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import Modal from 'react-modal';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { FlagsProvider } from 'flagged';
import { updateSettings } from '@web-stories-wp/date';

/**
 * Internal dependencies
 */
import { initializeTracking } from '../../../packages/tracking/src';
import App from './app';
import './style.css'; // This way the general dashboard styles are loaded before all the component styles.

__webpack_public_path__ = global.webStoriesDashboardSettings.publicPath;

/**
 * Initializes the Web Stories dashboard screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} config   Story editor settings.
 * @param {Object} flags    The flags for the application.
 */
const initialize = (id, config, flags) => {
  const appElement = document.getElementById(id);

  // see http://reactcommunity.org/react-modal/accessibility/
  Modal.setAppElement(appElement);

  updateSettings(config.locale);

  initializeTracking('Dashboard');

  render(
    <FlagsProvider features={flags}>
      <StrictMode>
        <App config={config} />
      </StrictMode>
    </FlagsProvider>,
    appElement
  );
};

const initializeWithConfig = () => {
  const { id, config, flags } = window.webStoriesDashboardSettings;
  initialize(id, config, flags);
};

if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeWithConfig);
} else {
  initializeWithConfig();
}
