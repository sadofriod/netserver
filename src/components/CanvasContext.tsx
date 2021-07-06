import React, { useReducer } from "react";
import produce from "immer";
import * as uuid from "uuid";

const initialState: Components.ContextState = {
	canvas: null,
	attr: {
		clickX: NaN,
		clickY: NaN,
		offsetX: NaN,
		offsetY: NaN,
	},
	dragger: {
		node: null,
	},
	currentNode: null,
	overlay: {},
	nodes: {},
};

const reduce = (draft: Components.ContextState, action: ReturnType<Components.ContextAction>) => {
	const result = produce(draft, (state) => {
		const { payload, type } = action;

		switch (type) {
			case "ADD_NODE": {
				const { style } = payload;
				const code = uuid.v4();
				const node = {
					style: style as Common.NodeStyle,
					data: {
						code,
						previous: [],
						next: [],
					},
				};
				state.nodes[code] = node;
				state.currentNode = node;
				break;
			}
			case "DELETE_NODE":
				break;
			case "UPDATE_NODE": {
				// const code = state.currentNode?.data.code;
				const { currentNode } = state;
				const { x, y } = payload;

				if (currentNode) {
					const code = currentNode.data.code;
					state.nodes[code].style = {
						...state.nodes[code].style,
						x,
						y,
					};
					if (state.currentNode)
						state.currentNode.style = {
							...state.currentNode.style,
							x,
							y,
						};
				}
				break;
			}
			case "UPDATE_CANVAS_ATTR": {
				const { clickX, clickY, offsetX, offsetY } = payload;
				state.attr = {
					clickX,
					clickY,
					offsetX,
					offsetY,
				};
				break;
			}
			case "INIT_BASIC_CANVAS": {
				state.canvas = payload;
				break;
			}
			default:
				break;
		}
	});

	return result;
};

export const CanvasContext = React.createContext(initialState);

const CanvasProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reduce, initialState);
	return <CanvasContext.Provider value={state as any}>{children(state, dispatch)}</CanvasContext.Provider>;
};

export default CanvasProvider;
