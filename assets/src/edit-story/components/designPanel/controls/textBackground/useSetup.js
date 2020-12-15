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
 * Internal dependencies
 */
import useElementSetup from '../../useElementSetup';
import useCommonProperty from '../../useCommonProperty';

import useCommonBackgroundColor from './useCommonBackgroundColor';
import CONFIG from './config';

function useSetup() {
  const backgroundMode = useCommonProperty('backgroundTextMode');
  const backgroundColor = useCommonBackgroundColor();

  useElementSetup(
    CONFIG.BACKGROUNDMODE.PROPERTY,
    {
      value: backgroundMode,
    },
    [backgroundMode]
  );

  useElementSetup(
    CONFIG.BACKGROUNDCOLOR.PROPERTY,
    {
      value: backgroundColor,
    },
    [backgroundColor]
  );
}

export default useSetup;
