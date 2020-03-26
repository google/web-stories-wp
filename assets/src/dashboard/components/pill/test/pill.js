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
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

/**
 * Internal dependencies
 */
import theme from '../../../theme';

import { Pill } from '../';

const wrapper = (children) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe('Pill', () => {
  const pillText = 'text pill label';
  const onClickMock = jest.fn();

  it('should render default pill as checkbox', () => {
    const { getByRole, getByText } = wrapper(
      <Pill onClick={onClickMock} name="test_pill" value="test">
        {pillText}
      </Pill>
    );
    expect(getByRole('checkbox')).toBeDefined();
    expect(getByText(pillText)).toBeDefined();
  });

  it('should render pill as radio input', () => {
    const { getByRole, getByText } = wrapper(
      <Pill
        onClick={onClickMock}
        name="test_pill"
        value="test"
        inputType="radio"
      >
        {pillText}
      </Pill>
    );
    expect(getByRole('radio')).toBeDefined();
    expect(getByText(pillText)).toBeDefined();
  });

  it('should simulate a click on <Pill />', () => {
    const { getByText } = wrapper(
      <Pill
        onClick={onClickMock}
        name="test_pill"
        value="test"
        inputType="radio"
      >
        {pillText}
      </Pill>
    );

    const pill = getByText(pillText);

    fireEvent.click(pill);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
