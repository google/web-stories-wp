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
import stickers from '@web-stories-wp/stickers';
/**
 * Internal dependencies
 */
import StoryPropTypes from '../../types';
import { noop } from '../../../design-system';

const style = {
  display: 'block',
  height: 20,
  width: 'auto',
};

function StickerLayerContent({ element }) {
  const { sticker } = element;
  const Sticker = stickers[sticker.type]?.svg || noop;

  return <Sticker style={style} />;
}

StickerLayerContent.propTypes = {
  element: StoryPropTypes.elements.sticker.isRequired,
};

export default StickerLayerContent;
