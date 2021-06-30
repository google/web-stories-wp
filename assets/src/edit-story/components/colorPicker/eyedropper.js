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
import { useCallback } from 'react';

/**
 * Internal dependencies
 */
import { useCanvas, useLayout } from '../../app';
import { ZOOM_SETTING } from '../../constants';

export default ({ onChange }) => {
  const {
    state: { fullbleedContainer },
    actions: {
      setIsEyedropperActive,
      setEyedropperCallback,
      setEyedropperImg,
      setEyedropperPixelData,
    },
  } = useCanvas();

  const { setZoomSetting } = useLayout(({ actions: { setZoomSetting } }) => ({
    setZoomSetting,
  }));

  const initEyedropper = useCallback(async () => {
    setZoomSetting(ZOOM_SETTING.FIT);
    const prepareEyedropper = () =>
      new Promise((resolve) => {
        // Wait one tick for the zoom to settle in.
        setTimeout(() => {
          import(/* webpackChunkName: "html-to-image" */ 'html-to-image').then(
            (htmlToImage) => {
              htmlToImage
                .toCanvas(fullbleedContainer, { preferredFontFormat: 'woff2' })
                .then((canvas) => {
                  const ctx = canvas.getContext('2d');
                  const pixelData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                  ).data;
                  setEyedropperPixelData(pixelData);
                  setEyedropperImg(canvas.toDataURL());
                  resolve();
                });
            }
          );
        });
      });

    await prepareEyedropper();

    setEyedropperCallback(() => (rgbObject) => {
      onChange(rgbObject);
      setIsEyedropperActive(false);
      setEyedropperImg(null);
      setEyedropperPixelData(null);
    });
    setIsEyedropperActive(true);
  }, [
    fullbleedContainer,
    onChange,
    setIsEyedropperActive,
    setEyedropperCallback,
    setEyedropperImg,
    setEyedropperPixelData,
    setZoomSetting,
  ]);

  return { initEyedropper };
};
