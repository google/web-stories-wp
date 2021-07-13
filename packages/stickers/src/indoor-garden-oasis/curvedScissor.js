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
import { _x } from '@web-stories-wp/i18n';
import PropTypes from 'prop-types';

const title = _x('Curved Scissors', 'sticker name', 'web-stories');

function CurvedScissor({ style }) {
  return (
    <svg
      style={style}
      viewBox="0 0 26 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M16.9717 33.125C16.2578 33.4375 15.9901 34.1407 16.0794 35.3125C16.5255 38.2813 16.5255 40.9375 16.0794 44.7656C15.9009 46.0938 16.704 46.7188 17.507 46.875C17.6855 46.875 17.864 46.9531 18.0424 46.9531C19.2024 46.9531 20.5409 46.25 21.1655 44.9219C23.1286 40.625 22.504 36.4844 19.5593 33.9063C18.5778 33.125 17.5963 32.8125 16.9717 33.125ZM20.0947 44.6094C19.5594 45.7031 18.3994 46.25 17.6855 46.0938C16.9717 45.9375 16.9717 45.2344 17.0609 44.8438C17.507 40.8594 17.507 38.2032 17.0609 35.1563C16.9717 34.2969 17.1501 33.9063 17.3286 33.8282C17.5963 33.75 18.1317 33.9063 18.7563 34.4532C21.4332 36.7969 21.9686 40.625 20.0947 44.6094Z"
        fill="#235524"
      />
      <path
        d="M24.0209 35.2344C22.6824 32.5781 20.184 30.625 16.7932 29.5312L15.9901 27.7344C22.8609 21.4844 27.144 9.29688 22.5932 0.703125C22.504 0.546875 22.3255 0.46875 22.147 0.46875C21.9686 0.46875 21.7901 0.625 21.7009 0.78125L12.4209 25.625C12.3317 25.7031 12.2424 25.7031 12.1532 25.7812C11.707 26.0156 11.4394 26.3281 11.2609 26.7188C5.37166 20.5469 2.07012 9.53125 6.08551 1.64062L12.2424 21.7969C12.3317 22.0312 12.5994 22.1875 12.867 22.1094C13.1347 22.0312 13.3132 21.7969 13.224 21.5625L6.62089 0.3125C6.62089 0.15625 6.44243 0 6.26397 0C6.08551 0 5.90705 0.078125 5.72858 0.234375C0.731662 8.59375 4.21166 21.0156 10.7255 27.5781C10.4578 28.125 10.1009 28.75 9.8332 29.375C6.3532 30.3125 3.76551 32.1875 2.24859 34.7656C0.46397 37.8125 0.285509 41.7187 1.7132 45.5469C2.69474 48.2031 5.72858 49.7656 8.22705 49.7656C8.58397 49.7656 8.85166 49.7656 9.20858 49.6875C11.2609 49.375 12.4209 47.9688 12.3317 45.9375C12.1532 42.5 12.1532 38.5156 13.1347 34.5312C13.9378 38.6719 13.6701 42.5781 13.224 45.9375C12.9563 47.9688 14.027 49.4531 16.0794 49.8437C16.4363 49.9219 16.8824 50 17.3286 50C19.827 50 22.6824 48.6719 23.8424 46.0938C25.627 42.2656 25.7163 38.2812 24.0209 35.2344ZM22.2363 2.03125C25.7163 10.0781 21.8794 20.8594 15.7224 26.7188C15.7224 26.6406 15.6332 26.6406 15.6332 26.5625C15.6332 26.4844 15.544 26.4844 15.544 26.4062C15.4547 26.3281 15.4547 26.25 15.3655 26.1719L15.2763 26.0938C15.187 26.0156 15.0978 25.9375 15.0086 25.8594C14.9194 25.7812 14.7409 25.7031 14.5624 25.625H14.4732C14.2055 25.5469 13.9378 25.4687 13.5809 25.4687L22.2363 2.03125ZM11.3501 45.8594C11.4394 48.0469 9.92243 48.5938 9.03012 48.75C6.71012 49.1406 3.58705 47.8125 2.60551 45.2344C1.26705 41.6406 1.35628 37.9688 3.05166 35.1562C4.47935 32.7344 6.97782 31.0156 10.2794 30.1562C10.4578 30.1562 10.547 30 10.547 29.9219C10.9932 28.9844 11.5286 28.0469 11.9747 27.1094C12.1532 26.7969 12.4209 26.5625 12.867 26.4062C13.0455 26.3281 13.224 26.3281 13.4024 26.3281C13.5809 26.3281 13.8486 26.4062 14.027 26.4844C14.1163 26.5625 14.2947 26.5625 14.384 26.6406C14.384 26.6406 14.384 26.6406 14.4732 26.7188C14.6517 26.875 14.8301 27.1094 14.9194 27.3438C14.9194 27.4219 15.0086 27.5781 15.0086 27.6562C15.0086 27.6562 15.0086 27.6562 15.0086 27.7344C15.0086 27.8125 15.0086 27.8906 15.0086 27.9687V28.0469C15.0086 28.125 14.9194 28.2031 14.9194 28.2813L13.224 31.4844C13.1347 31.7969 12.9563 32.1875 12.867 32.5C12.867 32.5 12.867 32.5 12.867 32.5781C11.1717 37.1875 11.1717 41.875 11.3501 45.8594ZM23.0394 45.7031C21.8794 48.2812 18.667 49.4531 16.4363 48.9062C15.544 48.6719 14.027 48.0469 14.2947 45.8594C14.7409 41.9531 15.0978 37.3438 13.7594 32.5C13.8486 32.1875 13.9378 31.9531 14.027 31.6406L15.4547 28.8281L15.9901 29.9219C16.0794 30 16.1686 30.1562 16.2578 30.1562C19.4701 31.1719 21.8794 33.0469 23.2178 35.4688C24.7347 38.4375 24.6455 42.1094 23.0394 45.7031Z"
        fill="#235524"
      />
      <path
        d="M9.47629 32.8907C8.76245 32.5782 7.87014 32.8126 6.8886 33.5938C3.76552 36.0938 2.96245 40.1563 4.65783 44.5313C5.19322 45.9376 6.62091 46.7188 7.78091 46.7188C7.87014 46.7188 8.0486 46.7188 8.13783 46.7188C9.11937 46.5626 9.74399 45.7813 9.65475 44.6876C9.47629 41.4063 9.47629 38.5157 10.1901 35.2344C10.3686 33.9844 10.1009 33.2032 9.47629 32.8907ZM9.2086 35.0001C8.49475 38.3594 8.40552 41.3282 8.67322 44.6876C8.67322 45.0782 8.67322 45.7813 7.95937 45.8594C7.15629 46.0157 5.99629 45.3907 5.55014 44.2188C4.03322 40.1563 4.74706 36.4063 7.51322 34.1407C8.0486 33.8282 8.49476 33.5938 8.85168 33.5938C8.94091 33.5938 9.03014 33.5938 9.03014 33.5938C9.2086 33.7501 9.38706 34.1407 9.2086 35.0001Z"
        fill="#235524"
      />
    </svg>
  );
}

CurvedScissor.propTypes = {
  style: PropTypes.object,
};

export default {
  aspectRatio: 26 / 50,
  svg: CurvedScissor,
  title,
};
