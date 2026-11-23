type Weather = "rainy" | "sunny" | "cloudy";

interface SaleRecord {
	week: number;
	productName: string;
	amountBrought: number;
	amountSold: number;
	isSoldOut: boolean;
	weather: Weather;
}

export { Weather, SaleRecord };
