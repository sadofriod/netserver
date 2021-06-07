import { CanvasContext } from "components/CanvasContext";
import React, { useContext, useRef } from "react";
import "./App.css";

const App: React.FC<{
	dispatch?: React.DispatchWithoutAction;
}> = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dispatch = useContext(CanvasContext);
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
		// console.log(pageX, pageY, left, top);
		// dispatch({
		// 	type,
		// });
	};

	return (
		<div className="App">
			<div>22222</div>
			<canvas
				style={{
					height: "100vh",
					width: "100vw",
				}}
				onClick={handleClick}
				ref={canvasRef}
			></canvas>
		</div>
	);
};

export default App;
