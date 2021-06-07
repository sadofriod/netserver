declare namespace Common {
	interface NodeData {
		code: string;
		previous: string[];
		next: string[];
	}

	enum Colors {
		PRIMART_COLOR,
		PATH_COLOR,
		FONT_COLOR,
	}

	interface Node extends NodeData {
		height: number;
		width: number;
		x: number;
		y: number;
		color: Colors;
	}

	type PathData = NodeData[];
}

declare namespace Components {
	// interface CanvasContext {
	// 	canvas: HTMLCanvasElement | null;
	// }

	interface ContextState {
		canvas: CanvasContext["canvas"];
		overlay: Partial<{
			[code: string]: {
				canvas: CanvasContext["canvas"];
			};
			cacheData: unknown;
		}>;
		attr: {
			clickX: number;
			clickY: number;
			offsetX: number;
			offsetY: number;
		};
	}

	type ActionType = "ADD_NODE" | "DELETE_NODE" | "UPDATE_NODE" | "UPDATE_CANVAS_ATTR";

	type ContextAction = <P = any>(
		...arg: Any[]
	) => {
		type: ActionType;
		payload: p;
	};
}
