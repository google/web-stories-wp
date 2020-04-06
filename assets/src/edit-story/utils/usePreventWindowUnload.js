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
import { useCallback } from 'react';

/**
 * This is a helper that to compliant the correct register/unregister system of `beforeunload` event
 *
 * @param {Event} event beforeunload Event object
 */

const beforeUnloadListener = (event, scope) => {
  event.preventDefault();
  event.returnValue = scope;
};

/**
 * This allow listeners registering by scope.
 * It should be declared outside of the hook to avoid recreate different references of the registered handler in order to make posible remove it later from multiple contexts.
 */
const beforeUnloadListeners = new Map();
const setBeforeUnloadListenersById = (id) => {
  beforeUnloadListeners.set(id, (event) => beforeUnloadListener(event, id));
};

function PreventWindowUnloadProvider() {
  const setPreventUnload = useCallback((id, value) => {
    if (value) {
      // Register beforeunload by scope
      if (!beforeUnloadListeners.has(id)) setBeforeUnloadListenersById(id);
      window.addEventListener('beforeunload', beforeUnloadListeners.get(id));
    } else {
      // Unregister beforeunload by scope
      window.removeEventListener('beforeunload', beforeUnloadListeners.get(id));
      beforeUnloadListeners.delete(id);
    }
  }, []);

  return setPreventUnload;
}

export default PreventWindowUnloadProvider;
