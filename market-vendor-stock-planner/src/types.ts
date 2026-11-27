type Weather = "rainy" | "sunny" | "cloudy";

interface SaleRecord {
	week: number;
	productName: string;
	amountMade: number;
	amountSold: number;
	isSoldOut: boolean;
	weather: Weather;
}

interface Recommendation {
	productName: string;
	amountToMake: number;
}

interface Options {
	marginInDecimal: number;
	weather: Weather;
}

type GroupUnsoldOut = (sales: SaleRecord[]) => Record<string, SaleRecord[]>;
type GroupByProduct = (sales: SaleRecord[]) => Record<string, SaleRecord[]>;
type GetAverageSold = (sales: Record<string, SaleRecord[]>) => Record<string, number>;
type GetAverageMade = (sales: Record<string, SaleRecord[]>) => Record<string, number>;
type GetSellThroughRate = (sales: Record<string, SaleRecord[]>) => Record<string, number>;
type Recommend = (
	groupedSales: Record<string, SaleRecord[]>,
	productName: string,
	{ marginInDecimal, weather }: Options,
) => Recommendation;
type PrintPackingList = (
	sales: SaleRecord[],
	{ marginInDecimal, weather }: Options,
) => string;

export {
	Weather,
	SaleRecord,
	GroupByProduct,
	GetAverageSold,
	GetAverageMade,
	GetSellThroughRate,
	Recommend,
	Recommendation,
	Options,
	PrintPackingList,
	GroupUnsoldOut,
};
