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
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
  PREVIEW_RATIO,
  PAGE_RATIO,
  ALLOWED_EDITOR_PAGE_WIDTHS,
  HEADER_HEIGHT,
  PAGE_NAV_WIDTH,
} from '../../constants';
import pointerEventsCss from '../../utils/pointerEventsCss';
import useResizeEffect from '../../utils/useResizeEffect';
import useCanvas from './useCanvas';

/**
 * @file See https://user-images.githubusercontent.com/726049/72654503-bfffe780-3944-11ea-912c-fc54d68b6100.png
 * for the layering details.
 */

export const Z_INDEX = {
  NAV: 1,
  EDIT: 2,
};

const MENU_HEIGHT = 48;

export const CAROUSEL_VERTICAL_PADDING = 24;
export const COMPACT_CAROUSEL_VERTICAL_PADDING = 32;

export const COMPACT_THUMB_WIDTH = 72;
export const COMPACT_THUMB_HEIGHT = 8;

const MAX_CAROUSEL_THUMB_HEIGHT = 128;
// @todo: UX needed for min thumb size
export const MIN_CAROUSEL_THUMB_HEIGHT = MAX_CAROUSEL_THUMB_HEIGHT / 3;

// Below this available height switch to Compact mode.
export const COMPACT_CAROUSEL_BREAKPOINT =
  MIN_CAROUSEL_THUMB_HEIGHT + CAROUSEL_VERTICAL_PADDING * 2;

const MIN_CAROUSEL_HEIGHT =
  COMPACT_CAROUSEL_VERTICAL_PADDING * 2 + COMPACT_THUMB_HEIGHT;
const MAX_CAROUSEL_HEIGHT =
  MAX_CAROUSEL_THUMB_HEIGHT + CAROUSEL_VERTICAL_PADDING * 2;

// @todo: the menu height is not responsive
const Layer = styled.div`
  ${pointerEventsCss}

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${({ zIndex }) => (typeof zIndex === 'number' ? `z-index: ${zIndex};` : '')}

  display: grid;
  grid:
    'head      head      head      head      head    ' ${HEADER_HEIGHT}px
    '.         .         .         .         .       ' minmax(16px, 1fr)
    '.         prev      page      next      .       ' var(
      --page-preview-height-px
    )
    '.         .         menu      .         .       ' ${MENU_HEIGHT}px
    '.         .         .         .         .       ' 1fr
    'carousel  carousel  carousel  carousel  carousel' minmax(
      ${MIN_CAROUSEL_HEIGHT}px,
      ${MAX_CAROUSEL_HEIGHT}px
    )
    / 1fr ${PAGE_NAV_WIDTH}px var(--page-preview-width-px)
    ${PAGE_NAV_WIDTH}px 1fr;
`;

const Area = styled.div`
  ${pointerEventsCss}

  grid-area: ${({ area }) => area};
  overflow: ${({ overflowAllowed }) =>
    overflowAllowed ? 'visible' : 'hidden'};
  position: relative;
  width: 100%;
  height: 100%;
`;

// Page area is not `overflow:hidden` by default to allow different clipping
// mechanisms.
const PageAreaContainer = styled(Area).attrs({
  area: 'page',
  overflowAllowed: false,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fg.v1};
`;

const PageAreaContent = styled.div`
  width: 100%;
  height: var(--page-height-px);
  overflow: visible;
  position: relative;
`;

const PageAreaSafeZone = styled.div`
  pointer-events: none;
  position: absolute;
  background-image: linear-gradient(
    45deg,
    #a3a3a3 25%,
    #000000 25%,
    #000000 50%,
    #a3a3a3 50%,
    #a3a3a3 75%,
    #000000 75%,
    #000000 100%
  );
  background-size: 28.28px 28.28px;
  opacity: 0.05;
  width: 100%;
  height: calc((var(--page-preview-height-px) - var(--page-height-px)) / 2);
  z-index: 1;
`;

const PageAreaSafeZoneTop = styled(PageAreaSafeZone)`
  top: 0;
`;

const PageAreaSafeZoneBottom = styled(PageAreaSafeZone)`
  bottom: 0;
`;

const HeadArea = styled(Area).attrs({ area: 'head', overflowAllowed: false })``;

const MenuArea = styled(Area).attrs({ area: 'menu', overflowAllowed: false })``;

const NavArea = styled(Area).attrs({ overflowAllowed: false })`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavPrevArea = styled(NavArea).attrs({ area: 'prev' })``;

const NavNextArea = styled(NavArea).attrs({ area: 'next' })``;

const CarouselArea = styled(Area).attrs({
  area: 'carousel',
  overflowAllowed: true,
})``;

/**
 * @param {!{current: ?Element}} containerRef
 */
function useLayoutParams(containerRef) {
  const {
    actions: { setPageSize },
  } = useCanvas();

  useResizeEffect(containerRef, ({ width, height }) => {
    // See Layer's `grid` CSS above. Per the layout, the maximum available
    // space for the page is:
    const maxWidth = width - PAGE_NAV_WIDTH * 2;
    const maxHeight =
      height - HEADER_HEIGHT - MENU_HEIGHT - MIN_CAROUSEL_HEIGHT;

    // Find the first size that fits within the [maxWidth, maxHeight].
    let bestSize =
      ALLOWED_EDITOR_PAGE_WIDTHS[ALLOWED_EDITOR_PAGE_WIDTHS.length - 1];
    for (let i = 0; i < ALLOWED_EDITOR_PAGE_WIDTHS.length; i++) {
      const size = ALLOWED_EDITOR_PAGE_WIDTHS[i];
      if (size <= maxWidth && size * PAGE_RATIO <= maxHeight) {
        bestSize = size;
        break;
      }
    }
    setPageSize({ width: bestSize, height: bestSize * PAGE_RATIO });
  });
}

function useLayoutParamsCssVars() {
  const {
    state: { pageSize },
  } = useCanvas();
  return {
    '--page-width-px': `${pageSize.width}px`,
    '--page-height-px': `${pageSize.height}px`,
    '--page-preview-width-px': `${pageSize.width}px`,
    '--page-preview-height-px': `${pageSize.width * PREVIEW_RATIO}px`,
  };
}

function PageArea({ children }) {
  return (
    <PageAreaContainer>
      <PageAreaContent>{children}</PageAreaContent>
      <PageAreaSafeZoneTop />
      <PageAreaSafeZoneBottom />
    </PageAreaContainer>
  );
}

PageArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export {
  Layer,
  PageArea,
  HeadArea,
  MenuArea,
  NavPrevArea,
  NavNextArea,
  CarouselArea,
  useLayoutParams,
  useLayoutParamsCssVars,
};
