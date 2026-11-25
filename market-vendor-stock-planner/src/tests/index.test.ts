import { getAverageSold, groupByProduct } from "@/index";
import { SaleRecord } from "@/types";
import { beforeEach, describe, expect, it } from "vitest";

describe("Tests for groupByProduct()", () => {
	let records: SaleRecord[]

	beforeEach(() => {
		records = [
			{
				week: 1,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 16,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 1,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 9,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 20,
				isSoldOut: true,
				weather: "rainy",
			},
			{
				week: 2,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 11,
				isSoldOut: false,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "sourdough",
				amountBrought: 24,
				amountSold: 19,
				isSoldOut: false,
				weather: "cloudy",
			},
			{
				week: 3,
				productName: "preserves",
				amountBrought: 18,
				amountSold: 18,
				isSoldOut: true,
				weather: "cloudy",
			},
		];
	})

	it("The keys are product names", () => {
		const result = groupByProduct(records);
		expect(Object.keys(result)).toEqual(["sourdough", "preserves"])
	})
	it("Each value is an array of records", () => {
		const result = groupByProduct(records);
		expect(Array.isArray(result.sourdough)).toBe(true);
		expect(Array.isArray(result.preserves)).toBe(true);
	})
	it("The arrays contain the right records", () => {
		const result = groupByProduct(records);
		expect(result.sourdough).toHaveLength(3);
		expect(result.preserves).toHaveLength(3);
		expect(result.sourdough).toEqual([
			{
				week: 1,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 16,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 20,
				isSoldOut: true,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "sourdough",
				amountBrought: 24,
				amountSold: 19,
				isSoldOut: false,
				weather: "cloudy",
			},
		]);
		expect(result.preserves).toEqual([
			{
				week: 1,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 9,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 11,
				isSoldOut: false,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "preserves",
				amountBrought: 18,
				amountSold: 18,
				isSoldOut: true,
				weather: "cloudy",
			},
		]);
	})
});

describe("Tests for getAverageSold", () => {
	let records: SaleRecord[];

	beforeEach(() => {
		records = [
			{
				week: 1,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 16,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 1,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 9,
				isSoldOut: false,
				weather: "sunny",
			},
			{
				week: 2,
				productName: "sourdough",
				amountBrought: 20,
				amountSold: 20,
				isSoldOut: true,
				weather: "rainy",
			},
			{
				week: 2,
				productName: "preserves",
				amountBrought: 15,
				amountSold: 11,
				isSoldOut: false,
				weather: "rainy",
			},
			{
				week: 3,
				productName: "sourdough",
				amountBrought: 24,
				amountSold: 19,
				isSoldOut: false,
				weather: "cloudy",
			},
			{
				week: 3,
				productName: "preserves",
				amountBrought: 18,
				amountSold: 18,
				isSoldOut: true,
				weather: "cloudy",
			},
		];
	});

	it("Should return an obj with the same props as groupedSales", () => {
		const groupedSales = groupByProduct(records);
		const averageSold = getAverageSold(groupedSales);
		expect(Object.keys(averageSold)).toEqual(Object.keys(groupedSales));
	});
	it("Should return the right averages", () => {
		const groupedSales = groupByProduct(records);
		const averageSold = getAverageSold(groupedSales);
		expect(averageSold).toEqual({
			sourdough: 18,
			preserves: 13,
		})
	})
});