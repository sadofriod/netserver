import { binarySearch } from "./common";

export const updateNodes: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;
	// const { xArray, yArray } = nodesOffset;
	if (!currentNode) {
		return state;
		// console.log(JSON.stringify(state.nodesOffset.xArray));
	}
	const { data } = currentNode;
	const { code } = data;
	const newStyle = {
		...state.nodes[code].style,
		x,
		y,
	};
	state.nodes[code].style = newStyle;

	// const { index: newXIndex, array: newXArray } = updateOffsetArray(
	// 	xArray,
	// 	{
	// 		data,
	// 		offset: x,
	// 	},
	// 	xIndex
	// );
	// const { index: newYIndex, array: newYArray } = updateOffsetArray(
	// 	yArray,
	// 	{
	// 		data,
	// 		offset: y,
	// 	},
	// 	yIndex
	// );

	// state.currentNode = {
	// 	...currentNode,
	// 	xIndex: newXIndex,
	// 	yIndex: newYIndex,
	// 	style: {
	// 		...style,
	// 		x,
	// 		y,
	// 	},
	// };
	return updateCurrentNode(state.nodes[code], state);

	// const
};

const isRemoveOlditem = (offsetArray: Components.NodesOffsetSortedItem[], oldOffsetIndex: number, code: string) => {
	if (!offsetArray[oldOffsetIndex]) {
		if (offsetArray[offsetArray.length - 1].code === code) {
			return true;
		}
		if (offsetArray[0].code === code) {
			return true;
		}
	}
	if (code === offsetArray[oldOffsetIndex].code) return true;
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
	// if (!offsetArray[oldOffsetIndex]) {
	// 	if (offsetArray[offsetArray.length - 1].code === code) {
	// 		offsetArray.splice(oldOffsetIndex, 1);
	// 	}
	// 	if (offsetArray[0].code === code) {
	// 		offsetArray.splice(oldOffsetIndex, 1);
	// 	}
	// }
	if (isRemoveOlditem(offsetArray, oldOffsetIndex, code)) offsetArray.splice(oldOffsetIndex, 1);
	offsetArray.splice(newIndex, 0, {
		code,
		offset,
	});
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
