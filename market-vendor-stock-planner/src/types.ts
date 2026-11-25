type Weather = "rainy" | "sunny" | "cloudy";

interface SaleRecord {
	week: number;
	productName: string;
	amountMade: number;
	amountSold: number;
	isSoldOut: boolean;
	weather: Weather;
}

type GroupByProduct = (sales: SaleRecord[]) => Record<string, SaleRecord[]>
type GetAverageSold = (sales: Record<string, SaleRecord[]>) => Record<string, number>
type GetAverageMade = (sales: Record<string, SaleRecord[]>) => Record<string, number>;

export { Weather, SaleRecord, GroupByProduct, GetAverageSold, GetAverageMade };
