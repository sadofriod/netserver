import * as uuid from "uuid";
import { insertOffsetArray } from "./common";

const addNode: Common.ReducerHelper<{ style: Common.NodeStyle }> = (payload, state) => {
	const { style } = payload;
	const code = uuid.v4();
	const node: Common.Nodes = {
		style,
		data: {
			code,
			previous: [],
			next: [],
		},
	};
	const { x, y } = style;
	const nodesCount = Object.keys(state.nodes).length;
	const newXArray = insertOffsetArray({ code, offset: x }, state.nodesOffset.xArray);
	const newYArray = insertOffsetArray({ code, offset: y }, state.nodesOffset.yArray);
	state.nodes[code] = node;

	state.nodesOffset = {
		xArray: newXArray,
		yArray: newYArray,
	};
	state.currentNode = { ...node, xIndex: nodesCount, yIndex: nodesCount };
	return state;
};
export default addNode;
