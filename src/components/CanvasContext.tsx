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
	overlay: {},
};

const reduce = produce((state: Components.ContextState, action: ReturnType<Components.ContextAction>) => {
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
			state.canvas = payload.canvas;
			break;
		}
		default:
			break;
	}
	// console.log(JSON.stringify(state), payload);

	return state;
});

export const CanvasContext = React.createContext(initialState);

const CanvasProvider: React.FC = ({ children }) => {
	// const Context = React.createContext(initialState);
	const [state, dispatch] = useReducer(reduce as any, initialState);

	return <CanvasContext.Provider value={state as any}>{React.cloneElement(children as any, { dispatch: (dispatch as unknown) as Components.ContextAction })}</CanvasContext.Provider>;
};

export default CanvasProvider;
