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

export const PLACEMENT = {
  // TOP
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  // BOTTOM
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  // RIGHT
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  // LEFT
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
};

export const RTL_PLACEMENT = {
  // TOP
  [PLACEMENT.TOP]: PLACEMENT.TOP,
  [PLACEMENT.TOP_START]: PLACEMENT.TOP_END,
  [PLACEMENT.TOP_END]: PLACEMENT.TOP_START,
  // BOTTOM
  [PLACEMENT.BOTTOM]: PLACEMENT.BOTTOM,
  [PLACEMENT.BOTTOM_END]: PLACEMENT.BOTTOM_START,
  [PLACEMENT.BOTTOM_START]: PLACEMENT.BOTTOM_END,
  // RIGHT
  [PLACEMENT.RIGHT]: PLACEMENT.LEFT,
  [PLACEMENT.RIGHT_START]: PLACEMENT.LEFT_START,
  [PLACEMENT.RIGHT_END]: PLACEMENT.LEFT_END,
  // LEFT
  [PLACEMENT.LEFT]: PLACEMENT.RIGHT,
  [PLACEMENT.LEFT_START]: PLACEMENT.RIGHT_START,
  [PLACEMENT.LEFT_END]: PLACEMENT.RIGHT_END,
};
