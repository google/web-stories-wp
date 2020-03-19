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
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import Button from '../';
import { BUTTON_TYPES } from '../../../constants';

export default {
  title: 'Dashboard/Components/Button',
  component: Button,
};

export const _default = () => {
  return (
    <Button
      isDisabled={boolean('isDisabled')}
      onClick={action('clicked')}
      type={select(
        'type',
        {
          cta: BUTTON_TYPES.CTA,
          primary: BUTTON_TYPES.PRIMARY,
          secondary: BUTTON_TYPES.SECONDARY,
        },
        BUTTON_TYPES.PRIMARY
      )}
    >
      {text('children', 'Default Button Demo')}
    </Button>
  );
};

const LongContainer = styled.div`
  width: 30rem;
`;
const LongButton = styled(Button)`
  width: 90%;
`;
export const _LongButton = () => {
  return (
    <LongContainer>
      <LongButton
        isDisabled={boolean('isDisabled')}
        onClick={action('clicked')}
        type={select(
          'type',
          {
            cta: BUTTON_TYPES.CTA,
            primary: BUTTON_TYPES.PRIMARY,
            secondary: BUTTON_TYPES.SECONDARY,
          },
          BUTTON_TYPES.PRIMARY
        )}
      >
        {text('children', 'Open in editor')}
      </LongButton>
    </LongContainer>
  );
};

const SecondaryButtonContainer = styled.div`
  width: 40rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: black;
`;

const LargerFontChild = styled.span`
  font-size: 2.2rem;
`;

export const SecondaryButton = () => {
  return (
    <SecondaryButtonContainer>
      <Button
        isDisabled={boolean('isDisabled')}
        onClick={action('clicked')}
        type={select(
          'type',
          {
            cta: BUTTON_TYPES.CTA,
            primary: BUTTON_TYPES.PRIMARY,
            secondary: BUTTON_TYPES.SECONDARY,
          },
          BUTTON_TYPES.SECONDARY
        )}
      >
        <LargerFontChild>{text('children', 'View Details')}</LargerFontChild>
      </Button>
    </SecondaryButtonContainer>
  );
};
