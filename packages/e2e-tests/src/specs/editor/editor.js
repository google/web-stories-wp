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
import percySnapshot from '@percy/puppeteer';
import {
  createNewStory,
  deactivateRTL,
  activateRTL,
  visitSettings,
} from '@web-stories-wp/e2e-test-utils';

async function toggleVideoOptimization() {
  await visitSettings();
  const selector = '[data-testid="media-optimization-settings-checkbox"]';
  await page.waitForSelector(selector);
  // Clicking will only act on the first element.
  await expect(page).toClick(selector);
  // Await REST API request.
  await page.waitForResponse((response) =>
    response.url().includes('web-stories/v1/users/me')
  );
  // Wait for a second to make sure request has saved.
  await page.waitForTimeout(1000);
}

describe('Story Editor', () => {
  it('should be able to create a blank story', async () => {
    await createNewStory();

    await expect(page).toMatchElement('input[placeholder="Add title"]');

    await percySnapshot(page, 'Empty Editor');
  });

  it('should be able to create a blank story on RTL', async () => {
    await activateRTL();
    await createNewStory();

    await expect(page).toMatchElement('input[placeholder="Add title"]');

    await percySnapshot(page, 'Empty Editor on RTL');
    await deactivateRTL();
  });

  it('should have cross-origin isolation enabled', async () => {
    await createNewStory();

    const crossOriginIsolated = await page.evaluate(
      () => window.crossOriginIsolated
    );
    expect(crossOriginIsolated).toBeTrue();
  });

  it('should have cross-origin isolation disabled', async () => {
    await toggleVideoOptimization();
    await createNewStory();

    const crossOriginIsolated = await page.evaluate(
      () => window.crossOriginIsolated
    );
    expect(crossOriginIsolated).toBeFalse();
    await toggleVideoOptimization();
  });
});
