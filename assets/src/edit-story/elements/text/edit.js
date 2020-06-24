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
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

/**
 * Internal dependencies
 */
import { useStory, useFont } from '../../app';
import RichTextEditor from '../../components/richText/editor';
import { getHTMLInfo } from '../../components/richText/htmlManipulation';
import { useUnits } from '../../units';
import {
  elementFillContent,
  elementWithFont,
  elementWithBackgroundColor,
  elementWithTextParagraphStyle,
  elementWithRotation,
} from '../shared';
import StoryPropTypes from '../../types';
import { BACKGROUND_TEXT_MODE } from '../../constants';
import useUnmount from '../../utils/useUnmount';
import createSolid from '../../utils/createSolid';
import stripHTML from '../../utils/stripHTML';
import calcRotatedResizeOffset from '../../utils/calcRotatedResizeOffset';
import { useTransformHandler } from '../../components/transform';
import SingleSelectionMovable from '../../components/canvas/singleSelectionMovable';
import useCanvas from '../../components/canvas/useCanvas';
import { generateParagraphTextStyle, getHighlightLineheight } from './util';

// Wrapper bounds the text editor within the element bounds. The resize
// logic updates the height of this element to show the new height based
// on the content and properties.
const Wrapper = styled.div`
  ${elementFillContent}
`;

// TextBox defines all text display properties and is used for measuring
// of text height. This element has an unbounded height (bottom) so that
// it can be used for height measurement.
const TextBox = styled.div`
  ${elementWithFont}
  ${elementWithTextParagraphStyle}
  ${elementWithBackgroundColor}
  ${elementWithRotation}

  opacity: ${({ opacity }) => (opacity ? opacity / 100 : null)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

function TextEdit({ element, box: { x, y, height, rotationAngle } }) {
  const {
    id,
    content,
    backgroundColor,
    backgroundTextMode,
    opacity,
    height: elementHeight,
    ...rest
  } = element;
  const { font } = rest;
  const fontFaceSetConfigs = useMemo(() => {
    const htmlInfo = getHTMLInfo(content);
    return {
      fontStyle: htmlInfo.isItalic ? 'italic' : 'normal',
      fontWeight: htmlInfo.fontWeight,
      content: stripHTML(content),
    };
  }, [content]);

  const {
    dataToEditorX,
    dataToEditorY,
    editorToDataX,
    editorToDataY,
  } = useUnits(
    ({
      actions: { dataToEditorX, dataToEditorY, editorToDataX, editorToDataY },
    }) => ({
      dataToEditorX,
      dataToEditorY,
      editorToDataX,
      editorToDataY,
    })
  );

  const { lastSelectionEvent } = useCanvas(
    ({ state: { lastSelectionEvent } }) => ({
      lastSelectionEvent,
    })
  );

  const textProps = {
    ...generateParagraphTextStyle(rest, dataToEditorX, dataToEditorY),
    font,
    backgroundColor,
    opacity,
    rotationAngle,
    ...(backgroundTextMode === BACKGROUND_TEXT_MODE.HIGHLIGHT && {
      lineHeight: getHighlightLineheight(
        rest.lineHeight,
        dataToEditorX(rest.padding?.vertical || 0)
      ),
      backgroundColor: createSolid(255, 255, 255),
    }),
    ...(backgroundTextMode === BACKGROUND_TEXT_MODE.NONE && {
      backgroundColor: null,
    }),
  };
  const {
    actions: { maybeEnqueueFontStyle },
  } = useFont();
  const { updateElementById } = useStory((state) => ({
    updateElementById: state.actions.updateElementById,
  }));

  const setProperties = useCallback(
    (properties) => updateElementById({ elementId: id, properties }),
    [id, updateElementById]
  );

  const [textBox, setTextBox] = useState(null);
  const wrapperRef = useRef(null);
  const editorRef = useRef(null);
  const moveableRef = useRef(null);
  const boxRef = useRef();
  const contentRef = useRef();
  const editorHeightRef = useRef(0);

  // x, y, height, rotationAngle changes should not update the content while in edit mode.
  // updateContent should be only called on unmount.
  useEffect(() => {
    boxRef.current = { x, y, height, rotationAngle };
  }, [x, y, height, rotationAngle]);

  // Make sure to allow the user to click in the text box while working on the text.
  const onClick = (evt) => {
    const editor = editorRef.current;
    // Refocus the editor if the container outside it is clicked.
    if (!editor.getNode().contains(evt.target)) {
      editor.focus();
    }
    evt.stopPropagation();
  };

  // Set focus when initially rendered.
  useLayoutEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const updateContent = useCallback(() => {
    const newHeight = editorHeightRef.current;
    wrapperRef.current.style.height = '';
    if (contentRef.current) {
      // Remove manual line breaks and remember to trim any trailing non-breaking space.
      const properties = { content: contentRef.current };
      // Recalculate the new height and offset.
      if (newHeight) {
        const [dx, dy] = calcRotatedResizeOffset(
          boxRef.current.rotationAngle,
          0,
          0,
          0,
          newHeight - boxRef.current.height
        );
        properties.height = editorToDataY(newHeight);
        properties.x = editorToDataX(boxRef.current.x + dx);
        properties.y = editorToDataY(boxRef.current.y + dy);
      }
      setProperties(properties);
    }
  }, [editorToDataX, editorToDataY, setProperties]);

  // Update content for element on unmount.
  useUnmount(updateContent);

  // A function to remeasure height
  const handleResize = useCallback(() => {
    if (textBox) {
      const wrapper = wrapperRef.current;
      editorHeightRef.current = textBox.offsetHeight;
      wrapper.style.height = `${editorHeightRef.current}px`;
      // Also update moveable.
      if (moveableRef.current) {
        moveableRef.current.updateRect();
      }
    }
  }, [textBox]);
  // Invoke on each content update.
  const handleUpdate = useCallback(
    (newContent) => {
      contentRef.current = newContent;
      handleResize();
    },
    [handleResize]
  );
  // Also invoke if the raw element height ever changes
  useEffect(handleResize, [elementHeight, handleResize]);

  useEffect(() => {
    maybeEnqueueFontStyle([
      {
        ...fontFaceSetConfigs,
        font,
      },
    ]);
  }, [font, fontFaceSetConfigs, maybeEnqueueFontStyle]);

  useTransformHandler(id, (transform) => {
    const target = textBox;
    const updatedFontSize = transform?.updates?.fontSize;
    target.style.fontSize = updatedFontSize
      ? `${dataToEditorY(updatedFontSize)}px`
      : '';
  });

  return (
    <>
      <Wrapper ref={wrapperRef} onClick={onClick} data-testid="textEditor">
        <TextBox ref={setTextBox} {...textProps}>
          <RichTextEditor
            ref={editorRef}
            content={content}
            onChange={handleUpdate}
          />
        </TextBox>
      </Wrapper>
      {textBox && (
        <SingleSelectionMovable
          selectedElement={element}
          targetEl={textBox}
          pushEvent={lastSelectionEvent}
          isEditMode={true}
          editMoveableRef={moveableRef}
        />
      )}
    </>
  );
}

TextEdit.propTypes = {
  element: StoryPropTypes.elements.text.isRequired,
  box: StoryPropTypes.box.isRequired,
};

export default TextEdit;
