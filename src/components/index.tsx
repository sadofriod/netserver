import React, { useEffect, useRef } from "react";

import { Node } from "./Node";

const Main: React.FC<{
	dispatch: Components.ContextAction;
	state: Components.ContextState;
}> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { dispatch, state } = props;

	const { canvas } = state;
	const handleClick = (e: React.MouseEvent) => {
		const { pageX, pageY } = e;
		//  = canvasRef.current?.getBoundingClientRect();
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const rect = canvas.getBoundingClientRect();
		if (!rect) {
			return;
		}
		const { left, top } = rect;
		// console.log("dd", );
	};

	const addNode = () => {
		dispatch({
			type: "ADD_NODE",
			payload: {},
		});
	};

	useEffect(() => {
		dispatch({
			type: "INIT_BASIC_CANVAS",
			payload: canvasRef.current,
		});
	}, []);

	return (
		<div className="App">
			<div className="menuList">
				<div>ADD</div>
			</div>
			<div className="canvasContainer">
				<canvas
					style={{
						height: "90vh",
						width: "100vw",
					}}
					onClick={handleClick}
					ref={canvasRef}
				>
					{canvas ? (
						<Node
							canvas={canvas}
							node={{
								style: {
									height: 10,
									width: 20,
									x: 20,
									y: 20,
								},
								data: {
									next: [],
									previous: [],
									code: "test",
								},
							}}
							code="test"
						/>
					) : null}
				</canvas>
				<div className="drag" />
			</div>
		</div>
	);
};
export default Main;
