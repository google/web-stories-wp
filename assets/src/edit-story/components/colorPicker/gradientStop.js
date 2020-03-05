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
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Pointer from './pointer';

const Stop = styled.button.attrs(({ position }) => ({
  style: {
    left: `${position * 155 + 6}px`,
  },
}))`
  position: absolute;
  background: transparent;
  border: 0;
  padding: 0;
  top: 6px;

  &:focus {
    /* We auto-select stops on focus, so no extra focus display is necessary */
    outline: none;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
      transform-origin: 0 0;
      transform: scale(1.333);
    `}
`;

function GradientStopWithRef(
  {
    position,
    index,
    isSelected,

    onSelect /*
    onAdd,
    onDelete,
    onMove,*/,
  },
  ref
) {
  return (
    <Stop
      ref={ref}
      key={index}
      isSelected={isSelected}
      position={position}
      onFocus={() => onSelect(index)}
      onClick={() => onSelect(index)}
      /* translators: %d is stop percentage */
      aria-label={sprintf(
        __('Gradient stop at %d%%', 'web-stories'),
        Math.round(position * 100)
      )}
    >
      <Pointer offset={-6} />
    </Stop>
  );
}

GradientStopWithRef.propTypes = {
  position: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,

  onSelect:
    PropTypes.func
      .isRequired /*
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,*/,
};

export default forwardRef(GradientStopWithRef);
