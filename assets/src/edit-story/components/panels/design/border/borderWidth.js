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
import { useCallback } from 'react';
import styled from 'styled-components';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import { Row } from '../../../form';
import { useCommonObjectValue } from '../../shared';
import {
  LockToggle,
  NumericInput,
  Text,
  THEME_CONSTANTS,
} from '../../../../../design-system';
import { MULTIPLE_DISPLAY_VALUE, MULTIPLE_VALUE } from '../../../../constants';
import { DEFAULT_BORDER } from './shared';

const BorderRow = styled(Row)`
  ${({ locked }) => locked && 'justify-content: normal'};
`;

const BoxedNumeric = styled(NumericInput)`
  input {
    padding: 0;
  }
`;

const Space = styled.div`
  flex: 0 0 10px;
`;

const Label = styled.label`
  height: ${({ locked }) => !locked && '64px'};
  flex: ${({ locked }) => (locked ? null : 1)};
  width: ${({ locked }) => (locked ? '50%' : null)};
`;

const LabelText = styled(Text).attrs({
  size: THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL,
  as: 'span',
})`
  color: ${({ theme }) => theme.colors.fg.secondary};
  text-align: center;
  width: 100%;
  display: inline-block;
  margin-top: 8px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  height: ${({ locked }) => !locked && '60px'};
`;

function WidthControls({ selectedElements, pushUpdateForObject }) {
  const border = useCommonObjectValue(
    selectedElements,
    'border',
    DEFAULT_BORDER
  );

  // Only if true for all selected elements.
  const lockBorder = border.lockedWidth === true;

  const handleChange = useCallback(
    (name, evt) => {
      const value = Number(evt?.target?.value);
      if (value) {
        const newBorder = !lockBorder
          ? {
              [name]: value,
            }
          : {
              left: value,
              top: value,
              right: value,
              bottom: value,
            };
        pushUpdateForObject('border', newBorder, DEFAULT_BORDER, true);
      }
    },
    [pushUpdateForObject, lockBorder]
  );

  const handleLockChange = useCallback(
    (newBorder) => {
      pushUpdateForObject('border', newBorder, DEFAULT_BORDER, true);
    },
    [pushUpdateForObject]
  );

  const firstInputLabel = lockBorder
    ? __('Border', 'web-stories')
    : __('Left border', 'web-stories');

  const getMixedValueProps = useCallback((value) => {
    return {
      isIndeterminate: MULTIPLE_VALUE === value,
      placeholder: MULTIPLE_VALUE === value ? MULTIPLE_DISPLAY_VALUE : null,
    };
  }, []);
  return (
    <BorderRow locked={lockBorder}>
      <Label locked={lockBorder}>
        <BoxedNumeric
          locked={lockBorder}
          value={border.left}
          onChange={(evt) => handleChange('left', evt)}
          aria-label={firstInputLabel}
          {...getMixedValueProps(border.left)}
        />
        {!lockBorder && <LabelText>{__('Left', 'web-stories')}</LabelText>}
      </Label>
      {!lockBorder && (
        <>
          <Space />
          <Label>
            <BoxedNumeric
              value={border.top}
              onChange={(evt) => handleChange('top', evt)}
              aria-label={__('Top border', 'web-stories')}
              {...getMixedValueProps(border.top)}
            />
            <LabelText>{__('Top', 'web-stories')}</LabelText>
          </Label>
          <Space />
          <Label>
            <BoxedNumeric
              value={border.right}
              onChange={(evt) => handleChange('right', evt)}
              aria-label={__('Right border', 'web-stories')}
              {...getMixedValueProps(border.right)}
            />
            <LabelText>{__('Right', 'web-stories')}</LabelText>
          </Label>
          <Space />
          <Label>
            <BoxedNumeric
              value={border.bottom}
              onChange={(evt) => handleChange('bottom', evt)}
              aria-label={__('Bottom border', 'web-stories')}
              {...getMixedValueProps(border.bottom)}
            />
            <LabelText>{__('Bottom', 'web-stories')}</LabelText>
          </Label>
        </>
      )}
      <Space />
      <ToggleWrapper locked={lockBorder}>
        <LockToggle
          isLocked={lockBorder}
          onClick={() => {
            let args = {
              lockedWidth: !lockBorder,
            };
            // If the border width wasn't locked before (and is now), unify all the values.
            if (!lockBorder) {
              args = {
                ...args,
                top: border.left,
                right: border.left,
                bottom: border.left,
              };
            }
            handleLockChange(args);
          }}
          aria-label={__('Toggle border ratio lock', 'web-stories')}
        />
      </ToggleWrapper>
    </BorderRow>
  );
}

WidthControls.propTypes = {
  selectedElements: PropTypes.array.isRequired,
  pushUpdateForObject: PropTypes.func.isRequired,
};

export default WidthControls;
