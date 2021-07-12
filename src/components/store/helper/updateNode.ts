import { binarySearch } from "./common";

export const updateNodes: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;

	if (!currentNode) {
		return state;
		// console.log(JSON.stringify(state.nodesOffset.xArray));
	}
	const code = currentNode.data.code;

	state.nodes[code].style = {
		...state.nodes[code].style,
		x,
		y,
	};
	return state;

	// const
};

const updateOffsetArray = (
	offsetArray: Components.NodesOffsetSortedItem[],
	newNode: {
		data: Common.NodeData;
		offset: number;
	},
	oldOffsetIndex: number
) => {
	const { offset, data } = newNode;
	const { code } = data;
	const newIndex = binarySearch(
		{
			offset,
			code,
		},
		offsetArray
	);

	offsetArray.splice(newIndex, 0, {
		code,
		offset,
	});

	offsetArray.splice(oldOffsetIndex, 1);

	return {
		index: newIndex,
		array: offsetArray,
	};
};

export const updateCurrentNode: Common.ReducerHelper<Common.Nodes> = (payload, state) => {
	const { currentNode, nodesOffset } = state;
	const { xArray, yArray } = nodesOffset;
	if (!currentNode) {
		return state;
	}
	const { yIndex, xIndex } = currentNode;

	const { style: currStyle, data } = payload;
	const { x, y } = currStyle;
	const { index: newXIndex, array: newXArray } = updateOffsetArray(
		xArray,
		{
			data,
			offset: x,
		},
		xIndex
	);
	const { index: newYIndex, array: newYArray } = updateOffsetArray(
		yArray,
		{
			data,
			offset: y,
		},
		yIndex
	);
	state.currentNode = { ...payload, yIndex: newYIndex, xIndex: newXIndex };
	state.nodesOffset = {
		xArray: newXArray.slice(),
		yArray: newYArray.slice(),
	};
	return state;
};
