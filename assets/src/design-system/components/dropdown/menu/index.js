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
import { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import { DROPDOWN_ITEM, MENU_OPTIONS, DROPDOWN_VALUE_TYPE } from '../types';
import {
  EmptyList,
  GroupLabel,
  GroupList,
  MenuContainer,
  List,
} from './components';
import useDropdownMenu from './useDropdownMenu';
import { getInset } from './utils';
import { DefaultListItem } from './defaultListItem';

export const DropdownMenu = ({
  anchorHeight,
  dropdownHeight,
  emptyText,
  menuStylesOverride,
  hasMenuRole,
  isRTL,
  options = [],
  listId,
  onMenuItemClick,
  onDismissMenu,
  renderItem = DefaultListItem,
  flattenedGroupedOptions,
  activeValue,
  menuAriaLabel,
}) => {
  const ListItem = renderItem;
  const listRef = useRef();
  const optionsRef = useRef([]);

  const handleMenuItemSelect = useCallback(
    (event, { value }) => onMenuItemClick(event, value),
    [onMenuItemClick]
  );

  const { focusedIndex, listLength } = useDropdownMenu({
    activeValue,
    handleMenuItemSelect,
    isRTL,
    options: flattenedGroupedOptions || options,
    listRef,
    onDismissMenu,
  });

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl || focusedIndex === null) {
      return;
    }
    if (focusedIndex === -1) {
      listEl.scrollTo(0, 0);
      return;
    }

    const highlighedOptionEl = optionsRef.current[focusedIndex];
    if (!highlighedOptionEl) {
      return;
    }

    highlighedOptionEl.focus();
    listEl.scrollTo(0, highlighedOptionEl.offsetTop - listEl.clientHeight / 2);
  }, [focusedIndex]);

  const renderMenuLabel = (label) => {
    return (
      <GroupLabel id={`dropdownMenuLabel-${label}`} role="presentation">
        {label}
      </GroupLabel>
    );
  };

  const renderMenuItem = useCallback(
    (option, optionIndex, groupIndex = 0) => {
      const isSelected = option.value === activeValue;
      const optionInset = getInset(options, groupIndex, optionIndex);
      return (
        <ListItem
          aria-posinset={optionInset}
          aria-selected={isSelected}
          aria-setsize={listLength}
          id={`dropdownMenuItem-${option.value}`}
          key={option.value}
          role={hasMenuRole ? 'menuitem' : 'option'}
          onClick={(event) => handleMenuItemSelect(event, option)}
          tabIndex={0}
          ref={(el) => (optionsRef.current[optionInset] = el)}
          option={option}
          isSelected={isSelected}
        />
      );
    },
    [activeValue, options, listLength, hasMenuRole, handleMenuItemSelect]
  );

  const MenuContent = useMemo(() => {
    if (!options || options.length === 0) {
      return <EmptyList>{emptyText}</EmptyList>;
    } else if (flattenedGroupedOptions) {
      return options.map(({ label, options: groupOptions }, groupIndex) => {
        const groupLabelId = `group-${uuidv4()}`;
        return (
          <GroupList
            key={label || `menuGroup_${groupIndex}`}
            aria-labelledby={groupLabelId}
            role="group"
          >
            {label && renderMenuLabel(label)}
            {groupOptions.map((groupOption, optionIndex) =>
              renderMenuItem(groupOption, optionIndex, groupIndex)
            )}
          </GroupList>
        );
      });
    } else {
      return (
        <List role={'group'} aria-labelledby={listId}>
          {options.map(renderMenuItem)}
        </List>
      );
    }
  }, [options, flattenedGroupedOptions, emptyText, renderMenuItem, listId]);

  return (
    <MenuContainer
      id={listId}
      anchorHeight={anchorHeight}
      dropdownHeight={dropdownHeight}
      styleOverride={menuStylesOverride}
      ref={listRef}
      role={hasMenuRole ? 'menu' : 'listbox'}
      aria-label={menuAriaLabel}
    >
      {MenuContent}
    </MenuContainer>
  );
};

DropdownMenu.propTypes = {
  anchorHeight: PropTypes.number,
  dropdownHeight: PropTypes.number,
  emptyText: PropTypes.string,
  menuStylesOverride: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hasMenuRole: PropTypes.bool,
  isRTL: PropTypes.bool,
  options: MENU_OPTIONS,
  listId: PropTypes.string.isRequired,
  menuAriaLabel: PropTypes.string,
  onMenuItemClick: PropTypes.func.isRequired,
  onDismissMenu: PropTypes.func.isRequired,
  renderItem: PropTypes.object,
  activeValue: DROPDOWN_VALUE_TYPE,
  flattenedGroupedOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(DROPDOWN_ITEM),
    PropTypes.bool,
  ]),
};
