import React, { useReducer } from "react";
import produce from "immer";
const initialState: Components.ContextState = {
	canvas: null,
	attr: {
		clickX: NaN,
		clickY: NaN,
		offsetX: NaN,
		offsetY: NaN,
	},
	draggerAttr: {
		x: 0,
		y: 0,
		height: 0,
		width: 0,
	},
	overlay: {},
	nodes: {},
};

const reduce = (draft: Components.ContextState, action: ReturnType<Components.ContextAction>) => {
	const result = produce(draft, (state) => {
		const { payload, type } = action;

		switch (type) {
			case "ADD_NODE":
				break;
			case "DELETE_NODE":
				break;
			case "UPDATE_NODE":
				break;
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
	console.log("CanvasProvider", state);
	return <CanvasContext.Provider value={state as any}>{children(state, dispatch)}</CanvasContext.Provider>;
};

export default CanvasProvider;
