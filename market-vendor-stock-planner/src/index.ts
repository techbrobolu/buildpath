import { GetAverageMade, GetAverageSold, GroupByProduct, SaleRecord } from "@/types";

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