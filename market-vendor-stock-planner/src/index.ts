import {
	GetAverageMade,
	GetAverageSold,
	GetSellThroughRate,
	GroupByProduct,
	Recommend,
	SaleRecord,
} from "@/types";

export const groupByProduct: GroupByProduct = (sales) => {
	return sales.reduce(
		(groups, sale) => {
			const key = sale.productName;
			if (!groups[key]) {
				groups[key] = [];
			}

			groups[key].push(sale);
			return groups;
		},
		{} as Record<string, SaleRecord[]>,
	);
};

export const getAverageSold: GetAverageSold = (groupedSales: Record<string, SaleRecord[]>) => {
	let averageSold: Record<string, number> = {};

	Object.keys(groupedSales).forEach((key) => {
		let totalSold = groupedSales[key].reduce((prev, amount) => prev + amount.amountSold, 0);
		averageSold[key] = Math.round(totalSold / groupedSales[key].length);
	});

	return averageSold;
};

export const getAverageMade: GetAverageMade = (groupedSales: Record<string, SaleRecord[]>) => {
	let averageMade: Record<string, number> = {};

	Object.keys(groupedSales).forEach((key) => {
		let totalMade = groupedSales[key].reduce((prev, amount) => prev + amount.amountMade, 0);
		averageMade[key] = Math.round(totalMade / groupedSales[key].length);
	});

	return averageMade;
};

export const getSellThroughRate: GetSellThroughRate = (groupedSales: Record<string, SaleRecord[]>) => {
	let sellThroughRate: Record<string, number> = {};
	let averageSold = getAverageSold(groupedSales);
	let averageMade = getAverageMade(groupedSales);

	Object.keys(averageSold).forEach((key) => {
		sellThroughRate[key] = Math.round((averageSold[key] / averageMade[key]) * 100);
	});

	return sellThroughRate;
};

export const recommend: Recommend = (sales, productName, { marginInDecimal, weather }) => {
	if (!sales || !sales.length) {
		throw new Error("Sales data is required");
	};
	const validSales = sales.filter((sale) => sale.isSoldOut !== true);

	const groupedSales = groupByProduct(validSales);
	if (!groupedSales[productName]) {
		throw new Error("Invalid product name");
	};

	const averageSold = getAverageSold(groupedSales)[productName];
	const weatherMod = weather === "rainy" ? 0.9 : weather === "cloudy" ? 0.95 : 1;
	const amountToMake = Math.round(averageSold * (1 + marginInDecimal) * weatherMod);

	return {productName, amountToMake};
}
