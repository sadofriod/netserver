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
		2,
	}

	interface NodeStyle {
		height: number;
		width: number;
		x: number;
		y: number;
		color: string;
	}

	// type Node = NodeStyle & NodeData;
	interface Node {
		style: NodeStyle;
		data: NodeData;
	}

	interface NodeProps<S> {
		code: string;
		node: S;
		canvas: Components.CanvasContext["canvas"];
	}

	interface NodeContextState {
		style: Partial<NodeStyle>;
		data: NodeData;
	}

	interface LineProps {
		start: number[];
		end: number[];
		color: string;
		canvas: Components.CanvasContext["canvas"];
		radin?: number;
	}

	type PathData = NodeData[];
}

declare namespace Components {
	interface CanvasContext {
		canvas: HTMLCanvasElement;
	}

	interface ContextState {
		canvas: CanvasContext["canvas"] | null;
		overlay: Partial<{
			[code: string]: {
				canvas: CanvasContext["canvas"] | null;
			};
			cacheData: unknown;
		}>;
		attr: {
			clickX: number;
			clickY: number;
			offsetX: number;
			offsetY: number;
		};
		nodes: {
			[code: string]: Node;
		};
		draggerAttr: {
			x: number;
			y: number;
			height: number;
			width: number;
		};
	}

	type ConnectComponent = <P = {}>(C: React.FC<P>) => React.FC<P>;

	type Connect = <P = {}>(
		dependence: (
			state: ContextState
		) => {
			[key: string]: any;
		}
	) => ConnectComponent<P>;

	type ActionType = "ADD_NODE" | "DELETE_NODE" | "UPDATE_NODE" | "UPDATE_CANVAS_ATTR" | "INIT_BASIC_CANVAS";

	interface ActionParams<P = any> {
		type: ActionType;
		payload: P;
	}

	type ContextAction = <P = any>(params: ActionParams) => ActionParams;
}
