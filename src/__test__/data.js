const testData = {
	backgroundColor: "",
	grid: {
		containLabel: true,
		top: "50",
	},
	tooltip: {
		show: true,

		textStyle: {
			color: "#D8D8D8",
			grid1: {
				containLabel: true,
				top: "50",
				grid2: {
					containLabel: true,
					top: "50",
					grid3: {
						containLabel: true,
						top: "50",
						grid4: {
							containLabel: true,
							top: "50",
						},
					},
				},
			},
		},
	},
	series: [{ name: "张三" }, { name: "李四" }, { name: "王五" }],
};
export default testData;
