import { describe, it, expect } from "vitest";
import { listOverdue } from "@/index";
import type { Loan } from "@/types";

describe("listoverdue", () => {
	it("should state if there are no overdue loans", () => {
		const loans: Loan[] = [];
		const result = listOverdue(loans);

		expect(result).toEqual("There are no overdue loans");
	});
	it("should list the overdue loans from oldest to newest", () => {
		const loans = [
			{
				id: "6",
				memberId: "2",
				itemId: "6",
				loanDate: "2025-10-14T10:00:00.000Z",
				dueDate: "2025-10-28T10:00:00.000Z",
				returnDate: null,
				// overdueTime: 386,
			},
			{
				id: "4",
				memberId: "1",
				itemId: "5",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
				// overdueTime: 390,
			},
			{
				id: "3",
				memberId: "4",
				itemId: "4",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: null,
				// overdueTime: 392,
			},
			{
				id: "2",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
				// overdueTime: 395,
			},
		];
		const currentDate = "2025-10-30T10:00:00.000Z";
		const result = listOverdue(loans, currentDate);

		expect(result).toEqual([
			{
				id: "2",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
				overdueTime: 11,
			},
			{
				id: "3",
				memberId: "4",
				itemId: "4",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: null,
				overdueTime: 8,
			},
			{
				id: "4",
				memberId: "1",
				itemId: "5",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
				overdueTime: 6,
			},
			{
				id: "6",
				memberId: "2",
				itemId: "6",
				loanDate: "2025-10-14T10:00:00.000Z",
				dueDate: "2025-10-28T10:00:00.000Z",
				returnDate: null,
				overdueTime: 2,
			},
		]);
	});
});
