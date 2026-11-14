import { describe, it, expect } from "vitest";
import { checkOut } from "@/index";
import type { Item, Loan } from "@/types";
import { items, loans, MAX_ACTIVE_LOANS } from "@/constants";

describe("checkout", () => {
	it("should block if member does not exist", () => {
		const memberId = "f"
		const fakeItemId = "4"

		const result = checkOut(memberId, fakeItemId, items, loans)
		expect(result).toEqual({ canBorrow: false, reason: "Member does not exist" })
	});
	it("should block if item does not exist", () => {
		// arrange
		const books: Item[] = [
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				isBorrowed: false,
			},
			{
				id: "2",
				name: "To Kill a Mockingbird",
				author: "Harper Lee",
				isBorrowed: false,
			},
			{
				id: "3",
				name: "1984",
				author: "George Orwell",
				isBorrowed: false,
			},
			{
				id: "4",
				name: "The Catcher in the Rye",
				author: "J.D. Salinger",
				isBorrowed: false,
			},
			{
				id: "5",
				name: "Brave New World",
				author: "Aldous Huxley",
				isBorrowed: false,
			},
			{
				id: "6",
				name: "The Lord of the Rings",
				author: "J.R.R. Tolkien",
				isBorrowed: false,
			},
			{
				id: "7",
				name: "The Hobbit",
				author: "J.R.R. Tolkien",
				isBorrowed: false,
			},
		];
		const loans: Loan[] = [
			{
				id: "1",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "2",
				memberId: "2",
				itemId: "3",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: "2025-10-20T10:00:00.000Z",
			},
			{
				id: "3",
				memberId: "1",
				itemId: "4",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
			}
		]
		const memberId = "2";
		const fakeItemId = "23";

		// act
		const result = checkOut(memberId, fakeItemId, books, loans);

		// assert
		expect(result).toEqual({ canBorrow: false, reason: "Book does not exist" }); // what are you checking?
	});

	it("should block if item is already borrowed", () => {
		// arrange
		const books = [
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				isBorrowed: false,
			},
			{
				id: "2",
				name: "To Kill a Mockingbird",
				author: "Harper Lee",
				isBorrowed: true,
			},
			{
				id: "3",
				name: "1984",
				author: "George Orwell",
				isBorrowed: false,
			},
		];
		const loans: Loan[] = [
			{
				id: "1",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "2",
				memberId: "2",
				itemId: "3",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: "2025-10-20T10:00:00.000Z",
			},
			{
				id: "3",
				memberId: "1",
				itemId: "4",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
			},
		];
		const memberId = "2";
		const itemId = "2";

		// act
		const result = checkOut(memberId, itemId, books, loans);

		//assert
		expect(result).toEqual({ canBorrow: false, reason: "Book is already borrowed" });
	});
	it("should block if member has already borrowed 2 or more books", () => {
		// arrange
		const books = [
			{
				id: "1",
				name: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				isBorrowed: false,
			},
			{
				id: "2",
				name: "To Kill a Mockingbird",
				author: "Harper Lee",
				isBorrowed: true,
			},
			{
				id: "3",
				name: "1984",
				author: "George Orwell",
				isBorrowed: false,
			},
		];
		const loans: Loan[] = [
			{
				id: "1",
				memberId: "1",
				itemId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "2",
				memberId: "2",
				itemId: "3",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: "2025-10-20T10:00:00.000Z",
			},
			{
				id: "3",
				memberId: "1",
				itemId: "4",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
			},
		];
		const memberId = "1";
		const itemId = "3";

		// act
		const result = checkOut(memberId, itemId, books, loans);

		//assert
		expect(result).toEqual({
			canBorrow: false,
			reason: `Member has already borrowed ${MAX_ACTIVE_LOANS} books`,
		});
	});
	it("should block if book is overdue", () => {
		const memberId = "4"
		const itemId = "5"
		const currentDate = "2025-10-27T10:00:00.000Z";
		const result = checkOut(memberId, itemId, items, loans, currentDate);

		expect(result).toEqual({ canBorrow: false, reason: "You have an active overdue loan" });
	})
});
