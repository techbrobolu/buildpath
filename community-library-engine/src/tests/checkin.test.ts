import { describe, it, expect, beforeEach } from "vitest";
import { checkIn } from "@/index";
import type { Item, Loan } from "@/types";

describe("checkin", () => {
	let loans: Loan[];
	let items: Item[];

	beforeEach(() => {
		loans = [
			{
				id: "1",
				memberId: "2",
				itemId: "7",
				loanDate: "2025-10-01T10:00:00.000Z",
				dueDate: "2025-10-15T10:00:00.000Z",
				returnDate: "2025-10-13T10:00:00.000Z",
			},
			{
				id: "2",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "3",
				memberId: "4",
				itemId: "4",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "4",
				memberId: "1",
				itemId: "5",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "5",
				memberId: "3",
				itemId: "1",
				loanDate: "2025-10-12T10:00:00.000Z",
				dueDate: "2025-10-26T10:00:00.000Z",
				returnDate: "2025-10-25T10:00:00.000Z",
			},
			{
				id: "6",
				memberId: "2",
				itemId: "6",
				loanDate: "2025-10-14T10:00:00.000Z",
				dueDate: "2025-10-28T10:00:00.000Z",
				returnDate: null,
			},
		];

		items = [
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
			},
			{
				id: "2",
				name: "To Kill a Mockingbird",
				author: "Harper Lee",
			},
			{
				id: "3",
				name: "1984",
				author: "George Orwell",
			},
			{
				id: "4",
				name: "The Catcher in the Rye",
				author: "J.D. Salinger",
			},
			{
				id: "5",
				name: "Brave New World",
				author: "Aldous Huxley",
			},
			{
				id: "6",
				name: "The Lord of the Rings",
				author: "J.R.R. Tolkien",
			},
			{
				id: "7",
				name: "The Hobbit",
				author: "J.R.R. Tolkien",
			},
		];
	});

	it("should block if item does not exist", () => {
		const itemId = "a";
        const result = checkIn(loans, items, itemId);
        
		expect(result).toEqual({ checkedIn: false, message: "itemId does not exist" });
	});
	it("should block if the book is not checked out", () => {
        const itemId = "1";
        const result = checkIn(loans, items, itemId);

		expect(result).toEqual({ checkedIn: false, message: "Book is not checked out" });
	});
	it("should notify that the loan is overdue", () => {
		const itemId = "2";
		const result = checkIn(loans, items, itemId);

		expect(result.overdue).toBe(true);
	});
	it("should checkin successfully", () => {
		const itemId = "5";
		const currentDate = "2025-10-22T10:00:00.000Z";
		const result = checkIn(loans, items, itemId, currentDate);

		expect(result.message).toEqual("Book checked in successfully");
	});
});
