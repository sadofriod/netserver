// export const croodinate2Pixel = (cHigth: number, cWidth: number, x: number, y: number) => {
// 	const index = x + y * cWidth;
// };

const currentNodeCoordcache = {
	x: 0,
	y: 0,
};

export const setCurrentNodeCoordCache = (x: number, y: number): typeof currentNodeCoordcache => {
	currentNodeCoordcache.x = x;
	currentNodeCoordcache.y = y;

	return currentNodeCoordcache;
};

export const getCurrentNodeCoordCache = (): typeof currentNodeCoordcache => {
	return currentNodeCoordcache;
};

export const resetCurrentNodeCoordCache = (): void => {
	currentNodeCoordcache.x = 0;
	currentNodeCoordcache.y = 0;
};

const getVertex = (p0: [number, number], p1: [number, number], h: number) => {
	const x = (p0[0] + p1[0]) / 2 - h / Math.sqrt(1 + Math.pow((p1[0] - p0[0]) / (p1[1] - p0[1]), 2));
	const y = (p0[1] + p1[1]) / 2 - h / Math.sqrt(1 + Math.pow(1 / (p1[0] - p0[0]) / (p1[1] - p0[1]), 2));
	return [Math.abs(x), Math.abs(y)];
};

const lineLen = (start: number[], end: number[]) => {
	return Math.sqrt(start[0] - end[0]);
};

const cubeControl = (start: number[], end: number) => {
	const radin = Math.atan(start[1] / start[0]);
	// const yOffset = Math.sin(radin)*
};
