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
import useCommonAspectRatio from './useCommonAspectRatio';
import useCommonExtremes from './useCommonExtremes';

import CONFIG from './config';

function useControls() {
  const width = useCommonProperty('width');
  const height = useCommonProperty('height');
  const x = useCommonProperty('x');
  const y = useCommonProperty('y');
  const rotation = useCommonProperty('rotationAngle');

  const lockAspectRatio = useCommonAspectRatio();
  const extremes = useCommonExtremes();

  useElementSetup(
    CONFIG.WIDTH.PROPERTY,
    {
      value: width,
      min: CONFIG.WIDTH.MIN,
      max: CONFIG.WIDTH.MAX,
    },
    [width]
  );

  useElementSetup(
    CONFIG.HEIGHT.PROPERTY,
    {
      value: height,
      min: CONFIG.HEIGHT.MIN,
      max: CONFIG.HEIGHT.MAX,
    },
    [height]
  );

  useElementSetup(CONFIG.LOCKASPECTRATIO.PROPERTY, { value: lockAspectRatio }, [
    height,
  ]);

  useElementSetup(
    CONFIG.X.PROPERTY,
    {
      value: x,
      min: CONFIG.X.MIN + extremes.minX,
      max: CONFIG.X.MAX + extremes.maxX,
    },
    [x, extremes]
  );

  useElementSetup(
    CONFIG.Y.PROPERTY,
    {
      value: y,
      min: CONFIG.Y.MIN + extremes.minY,
      max: CONFIG.Y.MAX + extremes.maxY,
    },
    [x, extremes]
  );

  useElementSetup(
    CONFIG.ROTATION.PROPERTY,
    {
      value: rotation,
      min: CONFIG.ROTATION.MIN,
      max: CONFIG.ROTATION.MAX,
    },
    [rotation]
  );
}

export default useControls;
