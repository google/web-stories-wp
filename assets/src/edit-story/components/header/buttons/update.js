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
import { useFeature } from 'flagged';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useStory, useLocalMedia, useHistory, useConfig } from '../../../app';
import { Outline, Primary } from '../../button';
import { useGlobalKeyDownEffect } from '../../keyboard';

function Update() {
  const { isSaving, status, saveStory } = useStory(
    ({
      state: {
        meta: { isSaving },
        story: { status },
      },
      actions: { saveStory },
    }) => ({ isSaving, status, saveStory })
  );
  const { isUploading } = useLocalMedia((state) => ({
    isUploading: state.state.isUploading,
  }));
  const {
    state: { hasNewChanges },
  } = useHistory();

  const isMetaBoxesFeatureEnabled = useFeature('customMetaBoxes');
  const { metaBoxes = {} } = useConfig();

  const locations = ['normal', 'advanced'];
  const hasMetaBoxes =
    isMetaBoxesFeatureEnabled &&
    locations.some((location) => Boolean(metaBoxes[location]?.length));

  useGlobalKeyDownEffect(
    { key: ['mod+s'] },
    (event) => {
      event.preventDefault();
      if (isSaving) {
        return;
      }
      saveStory();
    },
    [saveStory, isSaving]
  );

  const isSavingDraftDisabled =
    !hasMetaBoxes && (isSaving || isUploading || !hasNewChanges);

  if (!['publish', 'private', 'future'].includes(status)) {
    return (
      <Outline
        onClick={() => saveStory({ status: 'draft' })}
        isDisabled={isSavingDraftDisabled}
      >
        {__('Save draft', 'web-stories')}
      </Outline>
    );
  }

  let text = __('Update', 'web-stories');

  if (status === 'future') {
    text = __('Schedule', 'web-stories');
  }

  return (
    <Primary onClick={() => saveStory()} isDisabled={isSaving || isUploading}>
      {text}
    </Primary>
  );
}

export default Update;
