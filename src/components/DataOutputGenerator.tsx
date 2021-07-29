// import React from "react";

// import { baseIntentNumber } from "util/constant";

const DataOutputGenerator: React.FC<{
	auxiliary: Common.NodeData["auxiliary"];
	dispatch: Common.Action;
	points?: Common.Points;
}> = ({ auxiliary, dispatch, points }) => {
	// const renderPointCreator = (auxiliary: Common.NodeData["auxiliary"], dispatch: Common.Action) => {};
	const renderIntentMark = (markPoint: number) => {
		let resultMark = "- ";
		for (let index = 0; index < markPoint; index++) {
			resultMark += "- ";
		}
		return resultMark;
	};

	const isOutput = (path: string, points?: Common.Points) => {
		if (!points) return false;
		// const pointsCode = Object.keys(points);

		for (const key in points) {
			const point = points[key];
			if (path === point.path) return true;
		}

		return false;
	};

	return (
		<div style={{ marginLeft: "10px", borderLeft: "1px dashed #222" }}>
			{auxiliary &&
				Object.keys(auxiliary).map((key) => {
					const keyArr = key.split(".");
					const intentCount = keyArr.length - 1;
					const isSelected = isOutput(key, points);
					return (
						<div
							key={key}
							style={{
								zoom: 0.9,
							}}
						>
							{renderIntentMark(intentCount)}
							<button
								// style={{
								// 	fontSize: "12px",
								// 	borderColor: "#ccc",
								// 	borderRadius: "5px",
								// 	backgroundColor: "#aaa",
								// 	color: "#fff",
								// }}
								onClick={() =>
									dispatch("createPoint", {
										type: "output",
										path: key,
									})
								}
								disabled={isSelected}
							>
								{keyArr[intentCount]}
							</button>
							<span style={{ display: isSelected ? "inline" : "none", paddingLeft: "3px", fontFamily: "Microsoft Ya-Hei" }}>x</span>
						</div>
					);
				})}
		</div>
	);
};
export default DataOutputGenerator;
