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
import { useCallback } from 'react';
/**
 * Internal dependencies
 */
import { useStory } from '../../story';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../../constants';
import fetchRemoteFile from './fetchRemoteFile';

function useProcessVideo({
  uploadMedia,
  uploadVideoPoster,
  updateMedia,
  deleteMediaElement,
}) {
  const { updateElementsByResourceId } = useStory((state) => ({
    updateElementsByResourceId: state.actions.updateElementsByResourceId,
  }));

  const copyResourceData = useCallback(
    ({ oldResource, resource }) => {
      const { id, alt, title } = oldResource;
      updateElementsByResourceId({
        id,
        properties: () => {
          return {
            type: resource.type,
            resource: {
              ...resource,
              alt,
              title,
            },
          };
        },
      });
    },
    [updateElementsByResourceId]
  );

  const updateExistingElements = useCallback(
    ({ oldResource }) => {
      const { id } = oldResource;
      updateElementsByResourceId({
        id,
        properties: () => {
          return {
            resource: {
              ...oldResource,
            },
          };
        },
      });
    },
    [updateElementsByResourceId]
  );

  const updateOldVideo = useCallback(
    (oldId, newId) => {
      updateMedia(oldId, {
        media_source: 'source-video',
        meta: {
          web_stories_optimized_id: newId,
        },
      });
    },
    [updateMedia]
  );

  const updateElementDimensions = useCallback(
    ({ id, resource }) => {
      updateElementsByResourceId({
        id,
        properties: (el) => {
          const hasChangedDimensions =
            el.resource.width !== resource.width ||
            el.resource.height !== resource.height;

          if (!hasChangedDimensions) {
            return {
              type: resource.type,
              resource,
            };
          }

          return {
            resource,
            type: resource.type,
            width: resource.width,
            height: resource.height,
            x: PAGE_WIDTH / 2 - resource.width / 2,
            y: PAGE_HEIGHT / 2 - resource.height / 2,
          };
        },
      });
    },
    [updateElementsByResourceId]
  );

  const optimizeVideo = useCallback(
    ({ resource: oldResource }) => {
      const { src: url, mimeType } = oldResource;

      const onUploadStart = () => {
        updateExistingElements({
          oldResource: { ...oldResource, isOptimized: true },
        });
      };

      const onUploadError = () => {
        updateExistingElements({
          oldResource: { ...oldResource, isOptimized: false },
        });
      };

      const onUploadSuccess = ({ resource }) => {
        copyResourceData({ oldResource, resource });
        updateOldVideo(oldResource.id, resource.id);
        deleteMediaElement({ id: oldResource.id });

        if (resource.type === 'video' && !resource.local) {
          uploadVideoPoster(resource.id, resource.src);
        }
      };

      const onUploadProgress = ({ resource }) => {
        const oldResourceWithId = { ...resource, id: oldResource.id };
        updateElementDimensions({
          id: oldResource.id,
          resource: oldResourceWithId,
        });
        updateExistingElements({
          oldResource: oldResourceWithId,
        });
      };

      const process = async () => {
        let file = false;
        try {
          file = await fetchRemoteFile(url, mimeType);
        } catch (e) {
          // Ignore for now.
          return;
        }
        await uploadMedia([file], {
          onUploadSuccess,
          onUploadStart,
          onUploadError,
          onUploadProgress,
          additionalData: { alt: oldResource.alt, title: oldResource.title },
        });
      };
      return process();
    },
    [
      copyResourceData,
      uploadMedia,
      uploadVideoPoster,
      updateOldVideo,
      deleteMediaElement,
      updateExistingElements,
      updateElementDimensions,
    ]
  );

  return {
    optimizeVideo,
  };
}

export default useProcessVideo;
