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
 * Internal dependencies
 */
import { visitDashboard } from './';

async function setAnalyticsCode(code) {
  await visitDashboard();

  const dashboardNavigation = await expect(page).toMatchElement(
    '[aria-label="Main dashboard navigation"]'
  );

  await expect(dashboardNavigation).toClick('a', {
    text: 'Editor Settings',
  });

  await page.evaluate((inputValue) => {
    const input = document.getElementById('gaTrackingId');
    input.value = inputValue;
  }, code);

  await expect(page).toClick('button', { text: 'Save' });
}

export default setAnalyticsCode;
