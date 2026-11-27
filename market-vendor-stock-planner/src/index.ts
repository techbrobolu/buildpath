import {
	GroupUnsoldOut,
	GetAverageMade,
	GetAverageSold,
	GetSellThroughRate,
	GroupByProduct,
	PrintPackingList,
	Recommend,
	Recommendation,
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

export const groupUnsoldOut: GroupUnsoldOut = (sales) => {
	const filteredSales = sales.filter((sale) => sale.isSoldOut !== true);
	if (filteredSales.length === 0) {
		throw new Error("There are no unsold-out sales");
	}

	const groupedSales = groupByProduct(filteredSales);

	return groupedSales;
}

export const getAverageSold: GetAverageSold = (groupedSales: Record<string, SaleRecord[]>) => {
	let averageSold: Record<string, number> = {};

	Object.keys(groupedSales).forEach((key) => {
		// Formula: average sold = sum of units sold / number of sales records, rounded to a whole unit.
		let totalSold = groupedSales[key].reduce((prev, amount) => prev + amount.amountSold, 0);
		averageSold[key] = Math.round(totalSold / groupedSales[key].length);
	});

	return averageSold;
};

export const getAverageMade: GetAverageMade = (groupedSales: Record<string, SaleRecord[]>) => {
	let averageMade: Record<string, number> = {};

	Object.keys(groupedSales).forEach((key) => {
		// Formula: average made = sum of units made / number of sales records, rounded to a whole unit.
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
		// Formula: sell-through rate (%) = (average sold / average made) * 100, rounded to a whole percent.
		sellThroughRate[key] = Math.round((averageSold[key] / averageMade[key]) * 100);
	});

	return sellThroughRate;
};

export const recommend: Recommend = (groupedSales, productName, { marginInDecimal, weather }) => {
	if (!groupedSales || Object.keys(groupedSales).length === 0) {
		throw new Error("Sales data is required");
	};
	if (!groupedSales[productName]) {
		throw new Error("Invalid product name");
	};

	const averageSold = getAverageSold(groupedSales)[productName];
	// Formula: weather modifier = 0.9 for rain, 0.95 for clouds, or 1 for sun.
	const weatherMod = weather === "rainy" ? 0.9 : weather === "cloudy" ? 0.95 : 1;
	// Formula: amount to make = average sold * (1 + margin) * weather modifier, rounded to a whole unit.
	const amountToMake = Math.round(averageSold * (1 + marginInDecimal) * weatherMod);

	return {productName, amountToMake};
}

export const printPackingList: PrintPackingList = (sales, { marginInDecimal, weather }) => {
	const recommendations: Recommendation[] = []
	const groupedSales = groupUnsoldOut(sales);

	Object.keys(groupedSales).forEach((key) => {
		recommendations.push(recommend(groupedSales, key, { marginInDecimal, weather }));
	})
	

	let list = `Your recommended packing list for a ${weather} weather is:\n\n`;
	for (const rec of recommendations) {
		list += `${rec.productName}: ${rec.amountToMake}\n`
	}

	return list
}
