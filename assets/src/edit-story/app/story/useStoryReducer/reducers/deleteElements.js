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
import { intersect } from './utils';

/**
 * Delete elements by the given list of ids.
 * If given list of ids is `null`, delete all currently selected elements.
 *
 * Elements will be deleted on the current page only.
 *
 * If an element id does not correspond do an element on the current page, id is ignored.
 *
 * If an empty list or a list of only unknown ids is given, state is unchanged.
 *
 * If any id to delete is the current background element, background element will be unset for the page.
 *
 * If any id to delete is in current selection, deleted ids are removed from selection.
 * Otherwise selection is unchanged.
 *
 * Current page is unchanged.
 *
 * @param {Object} state Current state
 * @param {Object} payload Action payload
 * @param {Array.<string>} payload.elementIds List of ids of elements to delete.
 * @return {Object} New state
 */
function deleteElements(state, { elementIds }) {
  const idsToDelete = elementIds === null ? state.selection : elementIds;

  if (idsToDelete.length === 0) {
    return state;
  }

  const pageIndex = state.pages.findIndex(({ id }) => id === state.current);

  const oldPage = state.pages[pageIndex];
  const pageElementIds = oldPage.elements.map(({ id }) => id);

  // Nothing to delete?
  const hasAnythingToDelete = intersect(pageElementIds, idsToDelete).length > 0;
  if (!hasAnythingToDelete) {
    return state;
  }

  const filteredElements = oldPage.elements.filter(
    (element) => !idsToDelete.includes(element.id)
  );

  const newPage = {
    ...oldPage,
    elements: filteredElements,
  };

  // Clear background if it has been deleted.
  if (
    Boolean(oldPage.backgroundElementId) &&
    idsToDelete.includes(oldPage.backgroundElementId)
  ) {
    newPage.backgroundElementId = null;
    newPage.backgroundOverlay = null;
  }

  const newPages = [
    ...state.pages.slice(0, pageIndex),
    newPage,
    ...state.pages.slice(pageIndex + 1),
  ];

  // This check is to make sure not to modify the selection array if no update is necessary.
  const wasAnySelected = intersect(state.selection, idsToDelete).length > 0;
  const newSelection = wasAnySelected
    ? state.selection.filter((id) => !idsToDelete.includes(id))
    : state.selection;

  return {
    ...state,
    pages: newPages,
    selection: newSelection,
  };
}

export default deleteElements;
