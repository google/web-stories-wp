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
 * Checks if the current document has selection,
 * either by having text selected or being focused on a text/number input.
 *
 * @return {boolean} If selection found.
 */
function documentHasSelection() {
  const { activeElement } = document;
  const { tagName, type, isContentEditable } = activeElement;
  const isInput = () => {
    return (
      ('input' === tagName.toLowerCase() ||
        'textarea' === tagName.toLowerCase() ||
        'true' === isContentEditable) &&
      ('text' === type || 'number' === type)
    );
  };

  if (isInput()) {
    return true;
  }

  const selection = window.getSelection();
  const range = selection.rangeCount ? selection.getRangeAt(0) : null;

  return range && !range.collapsed;
}

export default documentHasSelection;
