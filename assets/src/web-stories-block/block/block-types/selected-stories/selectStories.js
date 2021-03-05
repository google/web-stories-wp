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
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PageSizePropType } from '../../../../dashboard/types';
import {
  SearchPropTypes,
  SortPropTypes,
  PagePropTypes,
} from '../../../../dashboard/utils/useStoryView';
import {
  TEXT_INPUT_DEBOUNCE,
  DROPDOWN_TYPES,
  STORY_SORT_MENU_ITEMS,
} from '../../../../dashboard/constants';
import { Dropdown, InfiniteScroller } from '../../../../dashboard/components';
import FontProvider from '../../../../dashboard/app/font/fontProvider';
import { Search } from '../../../../design-system';
import { UnitsProvider } from '../../../../edit-story/units';
import { TransformProvider } from '../../../../edit-story/components/transform';
import { StoryGridItem } from './components/cardGridItem';
import ItemOverlay from './components/itemOverlay';
import StoryPreview from './storyPreview';

const StoryFilter = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 10px 0;
  margin-top: -12px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;

  #typeahead-search,
  #typeahead-author-search {
    min-height: 18px;
    border: 0;
    background: transparent;

    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }
`;

const StoryGrid = styled.div(
  ({ columnWidth, theme }) => `
  display: grid;
  overflow: auto !important;
  width: 100%;
  height: calc(100% - 95px) !important;
  padding: 10px 5px;
  grid-column-gap: ${theme.DEPRECATED_THEME.grid.columnGap.desktop}px;
  grid-row-gap: 80px;
  grid-template-columns: repeat(auto-fill, ${columnWidth - 5}px);
  grid-template-rows: auto !important;
  scroll-margin-top: 30vh;
  margin-top: 2px; // this is for keyboard focus

  ${theme.DEPRECATED_THEME.breakpoint.tablet} {
    grid-column-gap: ${theme.DEPRECATED_THEME.grid.columnGap.tablet}px;
  }
  ${theme.DEPRECATED_THEME.breakpoint.largeDisplayPhone} {
    grid-column-gap: ${
      theme.DEPRECATED_THEME.grid.columnGap.largeDisplayPhone
    }px;
  }
  ${theme.DEPRECATED_THEME.breakpoint.smallDisplayPhone} {
    grid-column-gap: ${
      theme.DEPRECATED_THEME.grid.columnGap.smallDisplayPhone
    }px;
  }
  ${theme.DEPRECATED_THEME.breakpoint.min} {
    grid-column-gap: ${theme.DEPRECATED_THEME.grid.columnGap.min}px;
  }
`
);

const SearchContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 60% 25% 15%;
  vertical-align: baseline;
  position: relative;
  height: 29px;
  width: 100%;

  @media ${({ theme }) => theme.DEPRECATED_THEME.breakpoint.smallDisplayPhone} {
    left: ${({ theme }) =>
      `${theme.DEPRECATED_THEME.standardViewContentGutter.min}px`};
    max-width: 100%;
    justify-content: flex-start;
  }
`;

const SearchStoryInner = styled.div`
  grid-column: 2;
`;

const DropdownContainer = styled.div`
  margin: auto 8px;
`;

// Overrides WP input styles with some increased specificity.
const StyledSearch = styled(Search)(
  ({ theme }) => css`
    &&& {
      box-shadow: none;
      border: 1px solid ${theme.colors.border.defaultNormal};
      padding: 8px 20px 8px 40px;
      border-radius: ${theme.borders.radius.small};
      color: ${theme.colors.fg.primary};
    }
  `
);

function SelectStories({
  selectedStories,
  orderedStories,
  pageSize,
  search,
  sort,
  addItemToSelectedStories,
  authors,
  removeItemFromSelectedStories,
  allPagesFetched,
  isLoading,
  page,
  setAuthorKeyword,
  currentAuthor,
  setCurrentAuthor,
}) {
  const [debouncedTypeaheadChange] = useDebouncedCallback((value) => {
    search.setKeyword(value);
  }, TEXT_INPUT_DEBOUNCE);

  const [debouncedTypeaheadAuthorChange] = useDebouncedCallback((value) => {
    // Set the user input as the current search keyword.
    setAuthorKeyword(value);

    // On selecting author from the dropdown, '<Search />' component sets the value from the
    // suggestions array, which in our case is author ID. Check the value is a number.
    if (value.length > 0 && !isNaN(value)) {
      setCurrentAuthor(
        authors.filter((author) => author.id === parseInt(value))
      );
    }

    if ('' === value) {
      setCurrentAuthor({
        id: 0,
        name: '',
      });
    }
  }, TEXT_INPUT_DEBOUNCE);

  const [debouncedAuthorChange] = useDebouncedCallback((evt, newOption) => {
    // On selecting author from the dropdown, '<Search />' component sets the newOption from the
    // suggestions array, which in our case is author ID. Check the newOption is a number.
    if (newOption.value) {
      setCurrentAuthor(
        authors.filter((author) => author.id === parseInt(newOption.value))
      );
    }

    if ('' === newOption.value) {
      setCurrentAuthor({
        id: 0,
        name: '',
      });
    }
  }, TEXT_INPUT_DEBOUNCE);

  const onSortChange = useCallback(
    (newSort) => {
      sort.set(newSort);
    },
    [sort]
  );

  const authorSearchOptions = useMemo(() => {
    return authors
      .filter(({ name }) => Boolean(name?.trim().length))
      .map(({ id, name }) => ({
        label: name,
        value: id.toString(),
      }));
  }, [authors]);

  const storiesSearchOptions = useMemo(() => {
    return orderedStories
      .filter(({ title }) => Boolean(title?.trim().length))
      .map(({ id, title }) => ({
        label: title,
        value: id.toString(),
      }));
  }, [orderedStories]);

  return (
    <>
      <StoryFilter data-testid="story-filter">
        <SearchContainer>
          <SearchStoryInner>
            <StyledSearch
              ariaInputLabel={__('Search Stories', 'web-stories')}
              placeholder={__('Search Stories', 'web-stories')}
              emptyText={__('No stories available', 'web-stories')}
              selectedValue={{ label: search.keyword, value: search.keyword }}
              options={storiesSearchOptions}
              handleSearchValueChange={debouncedTypeaheadChange}
              popupZIndex={100001} // '.components-modal__screen-overlay adds z-index 100000.
            />
          </SearchStoryInner>
          <StyledSearch
            ariaInputLabel={__('Search by Author', 'web-stories')}
            placeholder={__('Search by Author', 'web-stories')}
            emptyText={__('No authors available', 'web-stories')}
            selectedValue={{
              label: currentAuthor.name,
              value: currentAuthor.name,
            }}
            options={authorSearchOptions}
            handleSearchValueChange={debouncedTypeaheadAuthorChange}
            onMenuItemClick={debouncedAuthorChange}
            popupZIndex={100001} // '.components-modal__screen-overlay adds z-index 100000.
          />
        </SearchContainer>
        <DropdownContainer>
          <Dropdown
            alignment="flex-end"
            ariaLabel={__('Choose sort option for display', 'web-stories')}
            items={STORY_SORT_MENU_ITEMS}
            type={DROPDOWN_TYPES.MENU}
            value={sort.value}
            onChange={(newSort) => {
              onSortChange(newSort.value);
            }}
          />
        </DropdownContainer>
      </StoryFilter>
      {!orderedStories.length && search.keyword && (
        <p>
          {sprintf(
            /* translators: %s: story title. */
            __(
              `Sorry, we couldn't find any results matching "%s"`,
              'web-stories'
            ),
            search.keyword
          )}
        </p>
      )}
      {!orderedStories.length && !search.keyword && (
        <p>{__(`Sorry, we couldn't find any results`, 'web-stories')}</p>
      )}
      {orderedStories.length >= 1 && (
        <FontProvider>
          <TransformProvider>
            <UnitsProvider
              pageSize={{
                width: pageSize.width,
                height: pageSize.height,
              }}
            >
              <StoryGrid
                role="list"
                columnWidth={pageSize.width}
                ariaLabel={__('Viewing stories', 'web-stories')}
              >
                {orderedStories.map((story) => {
                  const isSelected = selectedStories.includes(story.id);

                  return (
                    <StoryGridItem
                      key={story.id}
                      role="listitem"
                      data-testid={`story-grid-item-${story.id}`}
                    >
                      <StoryPreview story={story} pageSize={pageSize} />
                      <ItemOverlay
                        isSelected={isSelected}
                        pageSize={pageSize}
                        storyId={story.id}
                        addItemToSelectedStories={addItemToSelectedStories}
                        removeItemFromSelectedStories={
                          removeItemFromSelectedStories
                        }
                      />
                    </StoryGridItem>
                  );
                })}
              </StoryGrid>
              <InfiniteScroller
                canLoadMore={!allPagesFetched}
                isLoading={isLoading}
                allDataLoadedMessage={__('No more stories', 'web-stories')}
                onLoadMore={page.requestNextPage}
              />
            </UnitsProvider>
          </TransformProvider>
        </FontProvider>
      )}
    </>
  );
}

SelectStories.propTypes = {
  selectedStories: PropTypes.array,
  orderedStories: PropTypes.array,
  pageSize: PageSizePropType,
  search: SearchPropTypes,
  currentAuthor: PropTypes.string,
  setCurrentAuthor: PropTypes.func,
  sort: SortPropTypes,
  addItemToSelectedStories: PropTypes.func,
  authors: PropTypes.array,
  removeItemFromSelectedStories: PropTypes.func,
  allPagesFetched: PropTypes.bool,
  isLoading: PropTypes.bool,
  page: PagePropTypes,
  setAuthorKeyword: PropTypes.func,
};

export default SelectStories;
