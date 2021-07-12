import React, { useEffect, useRef } from "react";
import Dragger from "./Dragger";
import DraggerContainer from "./DraggerContainer";
import { renderNodes } from "./Node";

const Main: React.FC<{
	dispatch: Components.ContextAction;
	state: Components.ContextState;
}> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { dispatch, state } = props;

	const { canvas: ctx, nodes, currentNode } = state;
	// console.log(nodesOffset.xArray.map((item) => item.offset));

	const addNode = () => {
		dispatch({
			type: "ADD_NODE",
			payload: {
				style: {
					x: 20 * Math.random(),
					y: 20 * Math.random(),
					width: 100,
					height: 60,
					zIndex: Object.keys(nodes).length,
				},
			},
		});
	};

	useEffect(() => {
		ctx && renderNodes(ctx, nodes);
	}, [ctx, nodes]);

	// const

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			dispatch({
				type: "INIT_BASIC_CANVAS",
				payload: ctx,
			});
		}
	}, []);

	return (
		<div className="App">
			<div className="menuList">
				<div onClick={addNode}>ADD</div>
			</div>
			<DraggerContainer nodes={nodes} dispatch={dispatch} currentNode={nodes[currentNode?.data.code || ""] || null} canvasRef={canvasRef} ctx={ctx}>
				<canvas width={document.body.clientWidth} height={0.9 * document.body.clientHeight} ref={canvasRef} />
				<Dragger node={currentNode} />
			</DraggerContainer>
		</div>
	);
};
export default Main;
