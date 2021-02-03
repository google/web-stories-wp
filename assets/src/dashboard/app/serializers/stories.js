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

/**
 * Internal dependencies
 */
import { migrate, DATA_VERSION } from '../../../edit-story/migration/migrate';

export default function reshapeStoryObject(editStoryURL) {
  return function (originalStoryData) {
    const {
      id,
      title,
      status,
      date,
      date_gmt,
      modified,
      modified_gmt,
      link,
      preview_link: previewLink,
      story_data: storyData,
      _embedded: { author = [] } = {},
    } = originalStoryData;
    if (
      !Array.isArray(storyData.pages) ||
      !id ||
      storyData.pages.length === 0
    ) {
      return null;
    }

    const updatedStoryData = {
      ...migrate(storyData, storyData.version),
      version: DATA_VERSION,
    };

    return {
      id,
      status,
      title: title.raw,
      created: date,
      created_gmt: `${date_gmt}Z`,
      modified,
      modified_gmt: `${modified_gmt}Z`,
      pages: updatedStoryData.pages,
      author: author[0]?.name || '',
      centerTargetAction: '',
      bottomTargetAction: `${editStoryURL}&post=${id}`,
      editStoryLink: `${editStoryURL}&post=${id}`,
      previewLink,
      link,
      originalStoryData,
    };
  };
}
