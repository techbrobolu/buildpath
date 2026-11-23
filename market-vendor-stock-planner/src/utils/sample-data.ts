import { SaleRecord } from "../types";

const sampleData: SaleRecord[] = [
	{ week: 1, productName: "sourdough", amountBrought: 20, amountSold: 16, isSoldOut: false, weather: "sunny" },
	{ week: 1, productName: "preserves", amountBrought: 15, amountSold: 9, isSoldOut: false, weather: "sunny" },
	{ week: 2, productName: "sourdough", amountBrought: 20, amountSold: 20, isSoldOut: true, weather: "rainy" },
	{ week: 2, productName: "preserves", amountBrought: 15, amountSold: 11, isSoldOut: false, weather: "rainy" },
	{ week: 3, productName: "sourdough", amountBrought: 24, amountSold: 19, isSoldOut: false, weather: "cloudy" },
	{ week: 3, productName: "preserves", amountBrought: 18, amountSold: 18, isSoldOut: true, weather: "cloudy" },
	{ week: 4, productName: "sourdough", amountBrought: 24, amountSold: 24, isSoldOut: true, weather: "sunny" },
	{ week: 4, productName: "preserves", amountBrought: 18, amountSold: 13, isSoldOut: false, weather: "sunny" },
	{ week: 5, productName: "sourdough", amountBrought: 22, amountSold: 17, isSoldOut: false, weather: "rainy" },
	{ week: 5, productName: "preserves", amountBrought: 18, amountSold: 18, isSoldOut: true, weather: "rainy" },
	{ week: 6, productName: "sourdough", amountBrought: 26, amountSold: 21, isSoldOut: false, weather: "cloudy" },
	{ week: 6, productName: "preserves", amountBrought: 20, amountSold: 14, isSoldOut: false, weather: "cloudy" },
];

export { sampleData };