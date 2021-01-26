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
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { useStory } from '../../../../app/story';
import { Panel, PanelContent } from '../../panel';
import { areAllType, getPanelInitialHeight } from './utils';
import PresetsHeader from './header';
import Presets from './presets';
import Resize from './resize';
import useApplyPreset from './useApplyPreset';
import useAddPreset from './useAddPreset';
import ColorPresetPanel from './colorPreset/colorPresetPanel';
import useDeletePreset from './useDeletePreset';

function PresetPanel({
  presetType = 'color',
  title,
  itemRenderer,
  pushUpdate,
}) {
  const isStyle = 'style' === presetType;
  const isColor = 'color' === presetType;
  const { storyPresets, selectedElements, stylePresets } = useStory(
    ({
      state: {
        selectedElements,
        story: { stylePresets, storyPresets },
      },
    }) => {
      return {
        storyPresets,
        selectedElements,
        stylePresets,
      };
    }
  );

  const { colors, textStyles } = stylePresets;
  const globalPresets = isColor ? colors : textStyles;
  const { colors: localColors } = storyPresets;
  const hasLocalPresets = localColors.length > 0;
  // If there are any global presets or local colors in case of color.
  const hasPresets = globalPresets.length > 0 || (isColor && hasLocalPresets);

  const [isEditMode, setIsEditMode] = useState(false);

  const isText = areAllType('text', selectedElements);
  const isShape = areAllType('shape', selectedElements);

  const handleApplyPreset = useApplyPreset({ isColor, pushUpdate });
  const { addGlobalPreset } = useAddPreset({ presetType });
  const { deleteLocalPreset, deleteGlobalPreset } = useDeletePreset({
    presetType,
    setIsEditMode,
  });

  useEffect(() => {
    // If there are no colors left, exit edit mode.
    if (isEditMode && !hasPresets) {
      setIsEditMode(false);
    }
  }, [hasPresets, isEditMode]);

  // Text and shape presets are not compatible.
  if (!isText && !isShape && selectedElements.length > 1) {
    return null;
  }

  const handlePresetClick = (preset, isLocal = false) => {
    if (isEditMode) {
      if (isLocal) {
        deleteLocalPreset(preset);
      } else {
        deleteGlobalPreset(preset);
      }
    } else {
      handleApplyPreset(preset);
    }
  };

  const resizeable = hasPresets;
  const canCollapse = !isEditMode && (hasPresets || isColor);

  if (!isStyle && !isColor) {
    return null;
  }

  return (
    <Panel
      name={`stylepreset-${presetType}`}
      initialHeight={getPanelInitialHeight(isColor, globalPresets)}
      resizeable={resizeable}
      canCollapse={canCollapse}
    >
      <PresetsHeader
        handleAddPreset={addGlobalPreset}
        hasPresets={hasPresets}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        canCollapse={canCollapse}
        title={title}
        presetType={presetType}
      />
      <PanelContent isPrimary padding={hasPresets && '0'}>
        {isColor && (
          <ColorPresetPanel
            itemRenderer={itemRenderer}
            isEditMode={isEditMode}
            handlePresetClick={handlePresetClick}
          />
        )}
        {isStyle && (
          <Presets
            isEditMode={isEditMode}
            presets={globalPresets}
            handleOnClick={handlePresetClick}
            handleAddPreset={addGlobalPreset}
            itemRenderer={itemRenderer}
            type={presetType}
          />
        )}
      </PanelContent>
      {resizeable && <Resize position="bottom" />}
    </Panel>
  );
}

PresetPanel.propTypes = {
  presetType: PropTypes.string,
  itemRenderer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  pushUpdate: PropTypes.func.isRequired,
};

export default PresetPanel;
