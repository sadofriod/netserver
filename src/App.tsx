import React, { useEffect, useRef } from "react";
import "./App.css";
import NodeComp from "./components/Node";
const App: React.FC<{
	dispatch: Components.ContextAction;
}> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { dispatch } = props;
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
			<canvas
				style={{
					height: "90vh",
					width: "100vw",
				}}
				onClick={handleClick}
				ref={canvasRef}
			></canvas>
			<NodeComp></NodeComp>
		</div>
	);
};

export default App;
