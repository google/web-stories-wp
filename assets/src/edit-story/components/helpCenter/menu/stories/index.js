/*
 * Copyright 2021 Google LLC
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
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { theme as dsTheme, ThemeGlobals } from '@web-stories-wp/design-system';

/**
 * Internal dependencies
 */
import { Menu as HelpCenterMenu } from '..';

export default {
  title: 'Stories Editor/Components/Help Center/Menu',
};

const Bg = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 602px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  padding: 0 50px;
`;

const Container = styled.div`
  position: relative;
  width: 340px;
  height: 100%;
`;

export const Menu = () => {
  const [mounted, setMounted] = useState(true);
  return (
    <ThemeProvider theme={dsTheme}>
      <ThemeGlobals.Styles />
      <button onClick={() => setMounted((v) => !v)}>
        {mounted ? 'unmount' : 'mount'}
      </button>
      <Bg>
        <Container>
          <TransitionGroup component={null}>
            {mounted && <HelpCenterMenu key="someKey" readTips={{}} />}
          </TransitionGroup>
        </Container>
      </Bg>
    </ThemeProvider>
  );
};
