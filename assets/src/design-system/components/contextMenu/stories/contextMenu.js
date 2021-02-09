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
import { boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import ContextMenu from '../';
import { getOptions } from '../../menu/utils';

const demoItems = [
  { value: '1', label: 'one' },
  { value: 'foo', label: 'two' },
  { value: 'test', label: 'thing', disabled: true },
  { value: 'bar', label: 'three', separator: 'top' },
  {
    value: 'link',
    label: 'i am a link!',
    url: 'https://www.google.com/',
  },
  {
    value: 'edge_case',
    label: 'i am a very very very very very very very long label',
    separator: 'bottom',
  },
  { value: 'lions', label: 'lions' },
  { value: 'tigers', label: 'tigers', separator: 'top' },
  { value: 'bears', label: 'bears' },
];

// const options = getOptions(demoItems);

export default {
  title: 'DesignSystem/Components/ContextMenu',
  component: ContextMenu,
};
const PopoverWrapper = styled.div`
  position: relative;
`;

export const _default = () => (
  <PopoverWrapper>
    <ContextMenu
      items={demoItems}
      dividers={boolean('dividers')}
      isOpen={boolean('isOpen', true)}
      onSelect={(item) => {
        action(`clicked on dropdown item ${item.value}`)(item);
      }}
    />
  </PopoverWrapper>
);
