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
import { screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import PageAttachment from '..';
import CanvasContext from '../../../../app/canvas/context';
import { renderWithTheme } from '../../../../testUtils';
import StoryContext from '../../../../app/story/context';

function setup(props = {}) {
  const { pageAttachment = {}, canvasProps = null } = props;
  const canvasContext = {
    state: {
      pageSize: {},
      displayLinkGuidelines: false,
      pageAttachmentContainer: null,
      currentPage: {
        elements: [],
      },
      ...canvasProps,
    },
    actions: { setPageAttachmentContainer: jest.fn() },
  };
  const storyContext = {
    state: {
      currentPage: {
        elements: [],
      },
    },
  };
  return renderWithTheme(
    <StoryContext.Provider value={storyContext}>
      <CanvasContext.Provider value={canvasContext}>
        <PageAttachment pageAttachment={pageAttachment} />
      </CanvasContext.Provider>
    </StoryContext.Provider>
  );
}

describe('PageAttachment', () => {
  it('should display only wrapper in case of empty Page Attachment', () => {
    setup();
    const pageAttachment = screen.getByRole('presentation');
    expect(pageAttachment).toBeInTheDocument();
    expect(pageAttachment).toBeEmptyDOMElement();
  });

  it('should display the configured Page Attachment', () => {
    setup({
      pageAttachment: { url: 'http://example.test', ctaText: 'Click me!' },
    });
    const ctaText = screen.getByText('Click me!');
    expect(ctaText).toBeInTheDocument();
  });

  it('should display default CTA Text if none set', () => {
    setup({
      pageAttachment: { url: 'http://example.test' },
    });
    const ctaText = screen.getByText('Learn more');
    expect(ctaText).toBeInTheDocument();
  });

  it('should display dotted line if link found in the area', () => {
    setup({
      canvasProps: {
        displayLinkGuidelines: true,
      },
    });
    const pageAttachment = screen.getByRole('presentation');
    // The guiding line is always displayed right before the page attachment, on the same level.
    const guideline = pageAttachment.previousSibling;
    expect(guideline).toBeDefined();
    const style = window.getComputedStyle(guideline);
    // Verify the background was added for displaying dashed line.
    expect(style.backgroundSize).toStrictEqual('16px 0.5px');
    expect(style.backgroundPosition).toStrictEqual('top');
  });
});
