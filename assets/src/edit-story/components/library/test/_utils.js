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
import { render, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

/**
 * Internal dependencies
 */
import theme from '../../../theme';
import Library from '../index';
import { MediaProvider } from '../../../app/media';
import { ConfigProvider } from '../../../app/config';
import { FontProvider } from '../../../app/font';
import APIContext from '../../../app/api/context';

export async function arrange({ mediaResponse = [] }) {
  const config = {
    api: {},
    allowedMimeTypes: {
      image: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      video: ['video/mp4'],
    },
  };
  const getMediaPromise = Promise.resolve({
    data: mediaResponse,
    headers: { get: () => 1 },
  });
  const getAllFontsPromise = Promise.resolve([]);
  const allPromises = [getMediaPromise, getAllFontsPromise];
  const apiContextValue = {
    actions: {
      getMedia: () => getMediaPromise,
      getAllFonts: () => getAllFontsPromise,
    },
  };

  const accessors = render(
    <ThemeProvider theme={theme}>
      <ConfigProvider config={config}>
        <APIContext.Provider value={apiContextValue}>
          <FontProvider>
            <MediaProvider>
              <Library />
            </MediaProvider>
          </FontProvider>
        </APIContext.Provider>
      </ConfigProvider>
    </ThemeProvider>
  );

  // Another option without allPromises:
  // const flushPromises = () => new Promise(window.setImmediate);
  // await act(flushPromises);

  await act(() => Promise.all(allPromises));

  return accessors;
}

export const mediaResponseWithPdfAndImage = [
  {
    id: 775,
    date: '2020-04-09T07:32:27',
    date_gmt: '2020-04-09T07:32:27',
    guid: {
      rendered: 'http://localhost:8899/wp-content/uploads/2020/04/brochure.pdf',
      raw: 'http://localhost:8899/wp-content/uploads/2020/04/brochure.pdf',
    },
    modified: '2020-04-09T07:32:27',
    modified_gmt: '2020-04-09T07:32:27',
    slug: 'brochure',
    status: 'inherit',
    type: 'attachment',
    link: 'http://localhost:8899/brochure',
    title: { raw: 'brochure', rendered: 'brochure' },
    author: 1,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    template: '',
    meta: { web_stories_is_poster: false },
    permalink_template: 'http://localhost:8899/?attachment_id=775',
    generated_slug: 'brochure',
    featured_media_src: '',
    description: {
      raw: '',
      rendered:
        '<p class="attachment"><a href=\'http://localhost:8899/wp-content/uploads/2020/04/brochure.pdf\'><img width="212" height="300" src="http://localhost:8899/wp-content/uploads/2020/04/brochure-pdf-212x300.jpg" class="attachment-medium size-medium" alt="" /></a></p>\n',
    },
    caption: { raw: '', rendered: '' },
    alt_text: '',
    media_type: 'file',
    mime_type: 'application/pdf',
    media_details: {
      sizes: {
        full: {
          file: 'brochure-pdf.jpg',
          width: 1058,
          height: 1497,
          mime_type: 'application/pdf',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/brochure-pdf.jpg',
        },
        medium: {
          file: 'brochure-pdf-212x300.jpg',
          width: 212,
          height: 300,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/brochure-pdf-212x300.jpg',
        },
        large: {
          file: 'brochure-pdf-724x1024.jpg',
          width: 724,
          height: 1024,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/brochure-pdf-724x1024.jpg',
        },
        thumbnail: {
          file: 'brochure-pdf-106x150.jpg',
          width: 106,
          height: 150,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/brochure-pdf-106x150.jpg',
        },
      },
    },
    post: null,
    source_url: 'http://localhost:8899/wp-content/uploads/2020/04/brochure.pdf',
    missing_image_sizes: [],
    _links: {
      self: [{ href: 'http://localhost:8899/wp-json/wp/v2/media/775' }],
      collection: [{ href: 'http://localhost:8899/wp-json/wp/v2/media' }],
      about: [{ href: 'http://localhost:8899/wp-json/wp/v2/types/attachment' }],
      author: [
        {
          embeddable: true,
          href: 'http://localhost:8899/wp-json/wp/v2/users/1',
        },
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://localhost:8899/wp-json/wp/v2/comments?post=775',
        },
      ],
      'wp:action-unfiltered-html': [
        { href: 'http://localhost:8899/wp-json/wp/v2/media/775' },
      ],
      'wp:action-assign-author': [
        { href: 'http://localhost:8899/wp-json/wp/v2/media/775' },
      ],
      curies: [
        { name: 'wp', href: 'https://api.w.org/{rel}', templated: true },
      ],
    },
  },
  {
    id: 768,
    date: '2020-04-08T16:10:10',
    date_gmt: '2020-04-08T16:10:10',
    guid: {
      rendered:
        'http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg',
      raw: 'http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg',
    },
    modified: '2020-04-08T16:10:10',
    modified_gmt: '2020-04-08T16:10:10',
    slug: 'testImage',
    status: 'inherit',
    type: 'attachment',
    link: 'http://localhost:8899/testImage',
    title: { raw: 'testImage', rendered: 'testImage' },
    author: 1,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    template: '',
    meta: { web_stories_is_poster: false },
    permalink_template: 'http://localhost:8899/?attachment_id=768',
    generated_slug: 'testImage',
    featured_media_src: '',
    description: {
      raw: '',
      rendered:
        '<p class="attachment"><a href=\'http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg\'><img width="221" height="300" src="http://localhost:8899/wp-content/uploads/2020/04/testImage-221x300.jpg" class="attachment-medium size-medium" alt="" srcset="http://localhost:8899/wp-content/uploads/2020/04/testImage-221x300.jpg 221w, http://localhost:8899/wp-content/uploads/2020/04/testImage-754x1024.jpg 754w, http://localhost:8899/wp-content/uploads/2020/04/testImage-768x1043.jpg 768w, http://localhost:8899/wp-content/uploads/2020/04/testImage-150x204.jpg 150w, http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg 1080w" sizes="(max-width: 221px) 100vw, 221px" /></a></p>\n',
    },
    caption: { raw: '', rendered: '' },
    alt_text: '',
    media_type: 'image',
    mime_type: 'image/jpeg',
    media_details: {
      width: 1080,
      height: 1467,
      file: '2020/04/testImage.jpg',
      sizes: {
        medium: {
          file: 'testImage-221x300.jpg',
          width: 221,
          height: 300,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-221x300.jpg',
        },
        large: {
          file: 'testImage-754x1024.jpg',
          width: 754,
          height: 1024,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-754x1024.jpg',
        },
        thumbnail: {
          file: 'testImage-150x150.jpg',
          width: 150,
          height: 150,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-150x150.jpg',
        },
        medium_large: {
          file: 'testImage-768x1043.jpg',
          width: 768,
          height: 1043,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-768x1043.jpg',
        },
        'web-stories-poster-portrait': {
          file: 'testImage-696x928.jpg',
          width: 696,
          height: 928,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-696x928.jpg',
        },
        'web-stories-poster-square': {
          file: 'testImage-928x928.jpg',
          width: 928,
          height: 928,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-928x928.jpg',
        },
        'web-stories-poster-landscape': {
          file: 'testImage-928x696.jpg',
          width: 928,
          height: 696,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-928x696.jpg',
        },
        web_stories_thumbnail: {
          file: 'testImage-150x204.jpg',
          width: 150,
          height: 204,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage-150x204.jpg',
        },
        full: {
          file: 'testImage.jpg',
          width: 1080,
          height: 1467,
          mime_type: 'image/jpeg',
          source_url:
            'http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg',
        },
      },
      image_meta: {
        aperture: '0',
        credit: '',
        camera: '',
        caption: '',
        created_timestamp: '0',
        copyright: '',
        focal_length: '0',
        iso: '0',
        shutter_speed: '0',
        title: '',
        orientation: '0',
        keywords: [],
      },
    },
    post: null,
    source_url:
      'http://localhost:8899/wp-content/uploads/2020/04/testImage.jpg',
    missing_image_sizes: [],
    _links: {
      self: [{ href: 'http://localhost:8899/wp-json/wp/v2/media/768' }],
      collection: [{ href: 'http://localhost:8899/wp-json/wp/v2/media' }],
      about: [{ href: 'http://localhost:8899/wp-json/wp/v2/types/attachment' }],
      author: [
        {
          embeddable: true,
          href: 'http://localhost:8899/wp-json/wp/v2/users/1',
        },
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://localhost:8899/wp-json/wp/v2/comments?post=768',
        },
      ],
      'wp:action-unfiltered-html': [
        { href: 'http://localhost:8899/wp-json/wp/v2/media/768' },
      ],
      'wp:action-assign-author': [
        { href: 'http://localhost:8899/wp-json/wp/v2/media/768' },
      ],
      curies: [
        { name: 'wp', href: 'https://api.w.org/{rel}', templated: true },
      ],
    },
  },
];
