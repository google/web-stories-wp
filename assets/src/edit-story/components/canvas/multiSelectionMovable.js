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
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Movable from '../movable';
import { useStory } from '../../app/story';
import calculateFitTextFontSize from '../../utils/calculateFitTextFontSize';
import { useUnits } from '../../units';
import useCanvas from './useCanvas';

const CORNER_HANDLES = [ 'nw', 'ne', 'sw', 'se' ];

function MultiSelectionMovable( { selectedElements, nodesById } ) {
	const moveable = useRef();

	// Update moveable with whatever properties could be updated outside moveable
	// itself.
	useEffect( () => {
		if ( moveable.current ) {
			moveable.current.updateRect();
		}
	}, [ selectedElements, moveable, nodesById ] );

	const { actions: { updateElementsById } } = useStory();
	const { actions: { pushTransform } } = useCanvas();
	const { actions: { editorToDataX, editorToDataY } } = useUnits();

	// Create targets list including nodes and also necessary attributes.
	const targetList = selectedElements.map( ( element ) => ( {
		node: nodesById[ element.id ],
		id: element.id,
		x: element.x,
		y: element.y,
		rotationAngle: element.rotationAngle,
		type: element.type,
		content: element.content,
	} ) );
	// Not all targets have been defined yet.
	if ( targetList.some( ( { node } ) => node === undefined ) ) {
		return null;
	}

	/**
	 * Set style to the element.
	 *
	 * @param {string} id Target element's id.
	 * @param {Object} target Target element to update.
	 * @param {Object} frame Properties from the frame for that specific element.
	 */
	const setTransformStyle = ( id, target, frame ) => {
		target.style.transform = `translate(${ frame.translate[ 0 ] }px, ${ frame.translate[ 1 ] }px) rotate(${ frame.rotate }deg)`;
		pushTransform( id, frame );
	};

	const frames = targetList ? targetList.map( ( target ) => ( {
		translate: [ 0, 0 ],
		rotate: target.rotationAngle,
		resize: [ 0, 0 ],
	} ) ) : [];

	/**
	 * Resets Movable once the action is done, sets the initial values.
	 */
	const resetMoveable = () => {
		targetList.forEach( ( { id, node }, i ) => {
			frames[ i ].translate = [ 0, 0 ];
			frames[ i ].resize = [ 0, 0 ];
			node.style.transform = '';
			node.style.width = '';
			node.style.height = '';
			pushTransform( id, null );
		} );
		if ( moveable.current ) {
			moveable.current.updateRect();
		}
	};

	const onGroupEventStart = ( { events, isDrag, isRotate } ) => {
		events.forEach( ( ev, i ) => {
			const sFrame = frames[ i ];
			if ( isDrag ) {
				ev.set( sFrame.translate );
			} else if ( isRotate ) {
				ev.set( sFrame.rotate );
			}
		} );
	};

	// Update elements once the event has ended.
	const onGroupEventEnd = ( { targets, isRotate, isResize } ) => {
		targets.forEach( ( target, i ) => {
			// Update position in all cases.
			const frame = frames[ i ];
			const [ editorWidth, editorHeight ] = frame.resize;
			const properties = {
				x: targetList[ i ].x + editorToDataX( frame.translate[ 0 ] ),
				y: targetList[ i ].y + editorToDataY( frame.translate[ 1 ] ),
			};
			if ( isRotate ) {
				properties.rotationAngle = frame.rotate;
			}
			if ( isResize && editorWidth !== 0 && editorHeight !== 0 ) {
				properties.width = editorToDataX( editorWidth );
				properties.height = editorToDataY( editorHeight );
				const isText = 'text' === targetList[ i ].type;
				if ( isText ) {
					properties.fontSize = editorToDataY( calculateFitTextFontSize( target.firstChild, editorHeight, editorWidth ) );
				}
			}
			updateElementsById( { elementIds: [ targetList[ i ].id ], properties } );
		} );
		resetMoveable();
	};

	return (
		<Movable
			ref={ moveable }
			zIndex={ 0 }
			target={ targetList.map( ( { node } ) => node ) }

			draggable={ true }
			resizable={ true }
			rotatable={ true }

			onDragGroup={ ( { events } ) => {
				events.forEach( ( { target, beforeTranslate }, i ) => {
					const sFrame = frames[ i ];
					sFrame.translate = beforeTranslate;
					setTransformStyle( targetList[ i ].id, target, sFrame );
				} );
			} }
			onDragGroupStart={ ( { events } ) => {
				onGroupEventStart( { events, isDrag: true } );
			} }
			onDragGroupEnd={ ( { targets } ) => {
				onGroupEventEnd( { targets } );
			} }

			onRotateGroupStart={ ( { events } ) => {
				onGroupEventStart( { events, isRotate: true } );
			} }
			onRotateGroup={ ( { events } ) => {
				events.forEach( ( { target, beforeRotate, drag }, i ) => {
					const sFrame = frames[ i ];
					sFrame.rotate = beforeRotate;
					sFrame.translate = drag.beforeTranslate;
					setTransformStyle( targetList[ i ].id, target, sFrame );
				} );
			} }
			onRotateGroupEnd={ ( { targets } ) => {
				onGroupEventEnd( { targets, isRotate: true } );
			} }

			onResizeGroupStart={ ( { events } ) => {
				events.forEach( ( ev, i ) => {
					const frame = frames[ i ];
					ev.setOrigin( [ '%', '%' ] );
					if ( ev.dragStart ) {
						ev.dragStart.set( frame.translate );
					}
				} );
			} }
			onResizeGroup={ ( { events } ) => {
				events.forEach( ( { target, width, height, drag }, i ) => {
					const sFrame = frames[ i ];
					const isText = 'text' === targetList[ i ].type;
					target.style.width = `${ width }px`;
					target.style.height = `${ height }px`;
					if ( isText ) {
						// For text: update font size, too.
						target.style.fontSize = calculateFitTextFontSize( target.firstChild, height, width );
					}
					sFrame.translate = drag.beforeTranslate;
					sFrame.resize = [ width, height ];
					setTransformStyle( targetList[ i ].id, target, sFrame );
				} );
			} }
			onResizeGroupEnd={ ( { targets } ) => {
				onGroupEventEnd( { targets, isResize: true } );
			} }

			renderDirections={ CORNER_HANDLES }
		/>
	);
}

MultiSelectionMovable.propTypes = {
	selectedElements: PropTypes.arrayOf( PropTypes.object ).isRequired,
	nodesById: PropTypes.object.isRequired,
};

export default MultiSelectionMovable;
