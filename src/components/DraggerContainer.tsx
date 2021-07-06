import { useState } from "react";

const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	dispatch: React.Dispatch<Components.ActionParams<any>>;
}> = (props) => {
	const { canvasRef, children, dispatch } = props;

	const [isMoving, setMove] = useState(false);
	// const [sPosition, setPosition] = useState({ sx: NaN, sy: NaN });

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
		console.log(left, top, pageX, pageY);
		setMove(true);

		// console.log("dd", );
	};

	const handleMove = (e: React.MouseEvent) => {
		const { pageX, pageY } = e;
		// const { sx, sy } = sPosition;
		if (!isMoving) return;
		dispatch({
			type: "UPDATE_NODE",
			payload: {
				x: pageX,
				y: pageY,
			},
		});
	};

	return (
		<div className="canvasContainer" onMouseDown={handleClick} onMouseUp={() => setMove(false)} onMouseMove={handleMove}>
			{children}
		</div>
	);
};
export default DraggerContainer;
