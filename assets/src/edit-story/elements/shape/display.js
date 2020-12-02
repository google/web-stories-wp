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
import { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
  elementFillContent,
  elementWithBackgroundColor,
  elementWithBorder,
} from '../shared';
import StoryPropTypes from '../../types';
import { useTransformHandler } from '../../components/transform';
import { shouldDisplayBorder } from '../../components/elementBorder/utils';
import useColorTransformHandler from '../shared/useColorTransformHandler';
import { useUnits } from '../../units';

const Element = styled.div`
  ${elementFillContent}
  ${elementWithBackgroundColor}
  ${elementWithBorder}
`;

function ShapeDisplay({ element, previewMode }) {
  const {
    id,
    isDefaultBackground,
    backgroundColor,
    border,
    borderRadius,
  } = element;

  const { dataToEditorX } = useUnits((state) => ({
    dataToEditorX: state.actions.dataToEditorX,
  }));

  const ref = useRef(null);
  useColorTransformHandler({ id, targetRef: ref });

  useTransformHandler(id, (transform) => {
    // Since outside border is applied directly to the element, we need to
    // adjust the size of the element according to the border width.
    if (ref.current && !isDefaultBackground) {
      if (transform) {
        const { resize } = transform;
        if (resize && resize[0] !== 0 && resize[1] !== 0) {
          const [width, height] = resize;
          if (shouldDisplayBorder(element)) {
            ref.current.style.width = width + border.left + border.right + 'px';
            ref.current.style.height =
              height + border.top + border.bottom + 'px';
          }
        }
      } else {
        ref.current.style.width = '';
        ref.current.style.height = '';
      }
    }
  });

  if (isDefaultBackground) {
    return <Element ref={ref} />;
  }

  return (
    <Element
      ref={ref}
      backgroundColor={backgroundColor}
      borderRadius={
        previewMode && borderRadius
          ? {
              ...borderRadius,
              topLeft: dataToEditorX(borderRadius.topLeft),
              topRight: dataToEditorX(borderRadius.topRight),
              bottomLeft: dataToEditorX(borderRadius.bottomLeft),
              bottomRight: dataToEditorX(borderRadius.bottomRight),
            }
          : borderRadius
      }
      border={
        previewMode && border
          ? {
              ...border,
              left: dataToEditorX(border.left),
              top: dataToEditorX(border.top),
              right: dataToEditorX(border.right),
              bottom: dataToEditorX(border.bottom),
            }
          : border
      }
    />
  );
}

ShapeDisplay.propTypes = {
  element: StoryPropTypes.elements.shape.isRequired,
  previewMode: PropTypes.bool,
};

export default ShapeDisplay;
