import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { checkOut } from "@/index";
import type { Item, Loan, Member } from "@/types";
import { MAX_ACTIVE_LOANS } from "@/constants";

describe("checkout", () => {
	let loans: Loan[]
	let items: Item[]
	let members: Member[]

	beforeEach(() => {
		loans = [
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
			{
				id: "4",
				memberId: "2",
				itemId: "1",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
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
		]

		members = [
			{
				id: "1",
				name: "Brian Creed",
			},
			{
				id: "2",
				name: "Jane Doe",
			},
			{
				id: "3",
				name: "John Smith",
			},
			{
				id: "4",
				name: "Filly Anderson"
			}
		]
	})

	it("should block if member does not exist", () => {
		const loans: Loan[] = [];
		const memberId = "f";
		const fakeItemId = "4";
		const result = checkOut(memberId, fakeItemId, members, items, loans);

		expect(result).toEqual({ canBorrow: false, reason: "Member does not exist" });
	});
	it("should block if item does not exist", () => {
		const memberId = "2";
		const fakeItemId = "23";
		const result = checkOut(memberId, fakeItemId, members, items, loans);

		expect(result).toEqual({ canBorrow: false, reason: "Book does not exist" }); // what are you checking?
	});

	it("should block if item is already borrowed", () => {
		const memberId = "2";
		const itemId = "2";
		const result = checkOut(memberId, itemId, members, items, loans);

		expect(result).toEqual({ canBorrow: false, reason: "The book has been borrowed" });
	});
	it("should block if member has already borrowed 2 or more books", () => {
		const memberId = "1";
		const itemId = "3";
		const result = checkOut(memberId, itemId, members, items, loans);

		expect(result).toEqual({
			canBorrow: false,
			reason: `Member has already borrowed ${MAX_ACTIVE_LOANS} books`,
		});
	});
	it("should block if member has overdue loan", () => {
		const memberId = "2";
		const itemId = "3";
		const currentDate = "2025-10-29T10:00:00.000Z";
		const result = checkOut(memberId, itemId, members, items, loans, currentDate);

		expect(result).toEqual({ canBorrow: false, reason: "You have an active overdue loan" });
	});
});
