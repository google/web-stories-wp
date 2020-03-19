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
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import StoryPropTypes from '../types';
import generatePatternStyles from '../utils/generatePatternStyles';
import { PAGE_WIDTH, PAGE_HEIGHT } from '../constants';
import { generateOverlayStyles, OverlayType } from '../utils/backgroundOverlay';
import { LinkType } from '../components/link';
import OutputElement from './element';

function OutputPage({ page, index }) {
  const {
    id,
    backgroundColor,
    elements,
    backgroundElementId,
    backgroundOverlay,
  } = page;
  // Aspect-ratio constraints.
  const aspectRatioStyles = {
    width: `calc(100 * var(--story-page-vw))`, // 100vw
    height: `calc(100 * ${PAGE_HEIGHT / PAGE_WIDTH} * var(--story-page-vw))`, // 16/9 * 100vw
    maxHeight: `calc(100 * var(--story-page-vh))`, // 100vh
    maxWidth: `calc(100 * ${PAGE_WIDTH / PAGE_HEIGHT} * var(--story-page-vh))`, // 9/16 * 100vh
    // todo@: this expression uses CSS `min()`, which is still very sparsely supported.
    fontSize: `calc(100 * min(var(--story-page-vh), var(--story-page-vw) * ${PAGE_HEIGHT /
      PAGE_WIDTH}))`,
  };
  const backgroundStyles = generatePatternStyles(backgroundColor);
  const backgroundOverlayStyles = generateOverlayStyles(backgroundOverlay);
  const backgroundNonFullbleedElements = elements.filter(
    (element) =>
      element.id === backgroundElementId &&
      element.isFullbleedBackground === false
  );
  const backgroundFullbleedElements = elements.filter(
    (element) =>
      element.id === backgroundElementId &&
      element.isFullbleedBackground !== false
  );
  const regularElements = elements.filter(
    (element) =>
      element.id !== backgroundElementId &&
      element.link?.type !== LinkType.ONE_TAP
  );
  const ctaElements = elements.filter(
    (element) =>
      element.id !== backgroundElementId &&
      element.link?.type === LinkType.ONE_TAP
  );
  return (
    <amp-story-page id={id}>
      <amp-story-grid-layer template="vertical">
        <div className="page-background-area" style={backgroundStyles}>
          {backgroundFullbleedElements.map((element) => (
            <OutputElement key={'el-' + element.id} element={element} />
          ))}
        </div>
        <div className="page-safe-area" style={{ ...aspectRatioStyles }}>
          {backgroundNonFullbleedElements.map((element) => (
            <OutputElement key={'el-' + element.id} element={element} />
          ))}
        </div>
        {backgroundOverlay && backgroundOverlay !== OverlayType.NONE && (
          <div
            className="page-background-overlay-area"
            style={{ ...backgroundOverlayStyles }}
          />
        )}
        <div className="page-safe-area" style={aspectRatioStyles}>
          {regularElements.map((element) => (
            <OutputElement key={'el-' + element.id} element={element} />
          ))}
        </div>
      </amp-story-grid-layer>
      {ctaElements.length && index >= 1 && (
        <amp-story-cta-layer>
          {ctaElements.map((element) => (
            <OutputElement key={'el-' + element.id} element={element} />
          ))}
        </amp-story-cta-layer>
      )}
    </amp-story-page>
  );
}

OutputPage.propTypes = {
  page: StoryPropTypes.page.isRequired,
  index: PropTypes.number,
};

export default OutputPage;
