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
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import StoryPropTypes from '../../types';

const TextLayer = styled.span`
  color: ${({ theme }) => theme.colors.bg.v1};
  white-space: nowrap;
  font-size: 13px;
  text-overflow: ' ';
  overflow: hidden;
  max-width: 100%;
`;

function TextLayerContent({ element: { content } }) {
  // Remove all tags
  const rawContent = content.replace(/<[^>]*>/g, '');
  return <TextLayer>{rawContent}</TextLayer>;
}

TextLayerContent.propTypes = {
  element: StoryPropTypes.element.isRequired,
};

export default TextLayerContent;
