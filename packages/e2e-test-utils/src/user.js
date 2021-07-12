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
 * Internal dependencies
 */
import loginUser from './loginUser';
import getLoggedInUser from './getLoggedInUser';

const current = {
  username: null,
  password: null,
};

export async function setCurrentUser(username, password) {
  if (username === null) {
    return;
  }

  if (current.username === username) {
    return;
  }

  await loginUser(username, password);

  const currentUser = await getLoggedInUser();
  expect(currentUser).toMatch(username);

  current.username = username;
  current.password = password;
}

export function getCurrentUser() {
  return current;
}
