import React from "react";
import { connect } from "./CanvasContext";

const Node: React.FC<Common.NodeProps<Common.NodeContextState>> = (props) => {
	const { code } = props;
	// const { x, y, height, width } = style;
	// const state = l
	console.log(props);

	return <></>;
};

export default connect((state) => {
	const { nodes } = state;
	return {};
}, Node);
