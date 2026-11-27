import { beforeEach, describe, expect, it } from "vitest";
import { getAverageMade, getAverageSold, getSellThroughRate, groupByProduct, recommend } from "@/index";
import { SaleRecord } from "@/types";
import { sampleData } from "@/sample-data";

let records: SaleRecord[];

beforeEach(() => {
	records = sampleData;
});

describe("Tests for groupByProduct()", () => {
	it("The keys are product names", () => {
		const result = groupByProduct(records);
		expect(Object.keys(result)).toEqual(["sourdough", "preserves"]);
	});
	it("Each value is an array of records", () => {
		const result = groupByProduct(records);
		expect(Array.isArray(result.sourdough)).toBe(true);
		expect(Array.isArray(result.preserves)).toBe(true);
	});
	it("The arrays contain the right records", () => {
		const result = groupByProduct(records);
		expect(result.sourdough).toHaveLength(6);
		expect(result.preserves).toHaveLength(6);
		expect(result.sourdough).toEqual([
			{
				week: 1,
				productName: "sourdough",
				amountMade: 20,
				amountSold: 16,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "sourdough",
				amountMade: 20,
				amountSold: 20,
				isSoldOut: true,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "sourdough",
				amountMade: 24,
				amountSold: 19,
				isSoldOut: false,
				weather: "cloudy",
			},
			{
				week: 4,
				productName: "sourdough",
				amountMade: 24,
				amountSold: 24,
				isSoldOut: true,
				weather: "sunny",
			},
			{
				week: 5,
				productName: "sourdough",
				amountMade: 22,
				amountSold: 17,
				isSoldOut: false,
				weather: "rainy",
			},
			{
				week: 6,
				productName: "sourdough",
				amountMade: 26,
				amountSold: 21,
				isSoldOut: false,
				weather: "cloudy",
			},
		]);
		expect(result.preserves).toEqual([
			{
				week: 1,
				productName: "preserves",
				amountMade: 15,
				amountSold: 9,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "preserves",
				amountMade: 15,
				amountSold: 11,
				isSoldOut: false,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "preserves",
				amountMade: 18,
				amountSold: 18,
				isSoldOut: true,
				weather: "cloudy",
			},
			{
				week: 4,
				productName: "preserves",
				amountMade: 18,
				amountSold: 13,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 5,
				productName: "preserves",
				amountMade: 18,
				amountSold: 18,
				isSoldOut: true,
				weather: "rainy",
			},
			{
				week: 6,
				productName: "preserves",
				amountMade: 20,
				amountSold: 14,
				isSoldOut: false,
				weather: "cloudy",
			},
		]);
	});
});

describe("Tests for getAverageSold", () => {
	it("Should return an obj with the same props as groupedSales", () => {
		const groupedSales = groupByProduct(records);
		const averageSold = getAverageSold(groupedSales);
		expect(Object.keys(averageSold)).toEqual(Object.keys(groupedSales));
	});
	it("Should return the right averages", () => {
		const groupedSales = groupByProduct(records);
		const averageSold = getAverageSold(groupedSales);
		expect(averageSold).toEqual({
			sourdough: 20,
			preserves: 14,
		});
	});
});

describe("Tests for getAverageMade", () => {
	it("Should return an obj with the same props as groupedSales", () => {
		const groupedSales = groupByProduct(records);
		const averageMade = getAverageMade(groupedSales);
		expect(Object.keys(averageMade)).toEqual(Object.keys(groupedSales));
	});
	it("Should return the right averages", () => {
		const groupedSales = groupByProduct(records);
		const averageMade = getAverageMade(groupedSales);
		expect(averageMade).toEqual({
			sourdough: 23,
			preserves: 17,
		});
	});
});

describe("Tests for getSellThroughRate", () => {
	it("Should return an obj with the same props as groupedSales", () => {
		const groupedSales = groupByProduct(records);
		const sellThroughRate = getSellThroughRate(groupedSales);
		expect(Object.keys(sellThroughRate)).toEqual(Object.keys(groupedSales));
	});
	it("Should return the right sell through rates", () => {
		const groupedSales = groupByProduct(records);
		const sellThroughRate = getSellThroughRate(groupedSales);
		expect(sellThroughRate).toEqual({
			sourdough: 87,
			preserves: 82,
		});
	});
});

describe("Tests for recommend()", () => {
	it("Throws when sales data is missing or empty", () => {
		expect(() => recommend([], "sourdough", { marginInDecimal: 0.2, weather: "sunny" })).toThrow(
			"Sales data is required",
		);
	});

	it("Throws for a product with no unsold-out sales", () => {
		expect(() =>
			recommend(
				[
					{
						week: 1,
						productName: "sourdough",
						amountMade: 20,
						amountSold: 20,
						isSoldOut: true,
						weather: "sunny",
					},
				],
				"sourdough",
				{ marginInDecimal: 0.2, weather: "sunny" },
			),
		).toThrow("There are no unsold-out sales");
	});

	it("Throws for an unknown product", () => {
		expect(() => recommend(records, "baguette", { marginInDecimal: 0.2, weather: "sunny" })).toThrow(
			"Invalid product name",
		);
	});

	it("Excludes sold-out records when calculating the amount", () => {
		expect(recommend(records, "sourdough", { marginInDecimal: 0.2, weather: "sunny" })).toEqual({
			productName: "sourdough",
			amountToMake: 22,
		});
	});

	it("Applies the rainy-weather modifier", () => {
		expect(recommend(records, "preserves", { marginInDecimal: 0.2, weather: "rainy" })).toEqual({
			productName: "preserves",
			amountToMake: 13,
		});
	});

	it("Applies the cloudy-weather modifier", () => {
		expect(recommend(records, "preserves", { marginInDecimal: 0.2, weather: "cloudy" })).toEqual({
			productName: "preserves",
			amountToMake: 14,
		});
	});

	it("Does not apply a modifier for sunny weather", () => {
		expect(recommend(records, "preserves", { marginInDecimal: 0.1, weather: "sunny" })).toEqual({
			productName: "preserves",
			amountToMake: 13,
		});
	});
});
