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
import styled from 'styled-components';
import { __ } from '@web-stories-wp/i18n';
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import {
  BUTTON_TRANSITION_TIMING,
  THEME_CONSTANTS,
  Text,
  useSnackbar,
} from '../../../../../../$term = $this->call_private_method( $object, 'get_term' );src';
import { useAPI } from '../../../../app/api';
import { useStory } from '../../../../app/story';
import { focusStyle } from '../../../panels/shared';
import isDefaultPage from '../../../../utils/isDefaultPage';
import { ReactComponent as Icon } from './images/illustration.svg';

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.fg.secondary};
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 42px;
  margin-right: 29px;
`;

const SaveButton = styled.button`
  border: 0;
  background: none;
  height: 56px;
  width: 100%;
  padding: 7px;
  background-color: ${({ theme }) =>
    theme.colors.interactiveBg.secondaryNormal};
  transition: background-color ${BUTTON_TRANSITION_TIMING};
  border-radius: ${({ theme }) => theme.borders.radius.small};
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.interactiveBg.secondaryHover};
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
      background-color: ${theme.colors.interactiveBg.disable};
      &:hover {
        background-color: ${theme.colors.interactiveBg.disable};
      }

      ${IconWrapper} svg {
        path:nth-child(1): ${theme.colors.fg.disable};
        path:nth-child(2) {
          fill: ${theme.colors.fg.tertiary};
        }
        path:nth-child(3) {
          fill: ${theme.colors.fg.secondary};
        }
      }

      ${StyledText} {
        color: ${theme.colors.fg.disable};
      }
  `}

  ${focusStyle};
`;

function TemplateSave({ setShowDefaultTemplates, updateList }) {
  const {
    actions: { addPageTemplate },
  } = useAPI();
  const { showSnackbar } = useSnackbar();

  const { currentPage } = useStory(({ state: { currentPage } }) => ({
    currentPage,
  }));

  const isDisabled = useMemo(
    () => currentPage && isDefaultPage(currentPage),
    [currentPage]
  );
  const handleSaveTemplate = useCallback(
    (e) => {
      e.preventDefault();
      if (isDisabled) {
        return;
      }
      addPageTemplate({ ...currentPage, id: uuidv4(), title: null })
        .then((addedTemplate) => {
          updateList?.(addedTemplate);
          showSnackbar({
            message: __('Page template saved.', 'web-stories'),
            dismissable: true,
          });
        })
        .catch(() => {
          showSnackbar({
            message: __(
              'Unable to save the template. Please try again.',
              'web-stories'
            ),
            dismissable: true,
          });
        });
      setShowDefaultTemplates(false);
    },
    [
      isDisabled,
      addPageTemplate,
      currentPage,
      setShowDefaultTemplates,
      showSnackbar,
      updateList,
    ]
  );

  const textId = useMemo(() => `template_save_btn_${uuidv4()}`, []);
  return (
    <SaveButton
      aria-disabled={isDisabled}
      onClick={handleSaveTemplate}
      aria-labelledby={textId}
      isDisabled={isDisabled}
    >
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <StyledText
        id={textId}
        size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL}
      >
        {__('Save current page as template', 'web-stories')}
      </StyledText>
    </SaveButton>
  );
}

TemplateSave.propTypes = {
  setShowDefaultTemplates: PropTypes.func.isRequired,
  updateList: PropTypes.func,
};

export default TemplateSave;
