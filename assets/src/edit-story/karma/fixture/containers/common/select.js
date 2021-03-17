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
import { Container } from '../container';

/**
 * The select dropdown, which is actually just a button that open a popup
 * containing the actual dropdown options.
 */
export class Select extends Container {
  constructor(node, path) {
    super(node, path);
    this.name = this.node.getAttribute('aria-label');
  }

  get select() {
    return this.node;
  }

  get value() {
    return this.node.innerText;
  }

  get optionList() {
    return this.getByRoleIn(this.node.ownerDocument, 'listbox', {
      name: new RegExp(this.name),
    });
  }

  option(name) {
    return this.getByRoleIn(this.optionList, 'option', { name });
  }
}
