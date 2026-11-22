import { describe, it, expect, beforeEach } from "vitest";
import { listOverdue } from "@/index";
import type { Loan, Member, Book } from "@/types";

describe("listoverdue", () => {
	let loans: Loan[];
	let members: Member[];
	let books: Book[];

	beforeEach(() => {
		loans = [
			{
				id: "6",
				memberId: "2",
				bookId: "6",
				loanDate: "2025-10-14T10:00:00.000Z",
				dueDate: "2025-10-28T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "4",
				memberId: "1",
				bookId: "5",
				loanDate: "2025-10-10T10:00:00.000Z",
				dueDate: "2025-10-24T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "3",
				memberId: "4",
				bookId: "4",
				loanDate: "2025-10-08T10:00:00.000Z",
				dueDate: "2025-10-22T10:00:00.000Z",
				returnDate: null,
			},
			{
				id: "2",
				memberId: "1",
				bookId: "2",
				loanDate: "2025-10-05T10:00:00.000Z",
				dueDate: "2025-10-19T10:00:00.000Z",
				returnDate: null,
			},
		];

		books = [
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
				name: "Filly Anderson",
			},
		];
	});

	it("should state if there are no overdue loans", () => {
		const loans: Loan[] = [];
		const result = listOverdue(loans, members, books);

		expect(result).toEqual("There are no overdue loans");
	});
	it("should list the overdue loans from most overdue to least overdue", () => {
		const currentDate = "2025-10-30T10:00:00.000Z";
		const result = listOverdue(loans, members, books, currentDate);

		expect(result).toEqual([
			{
				loanId: "2",
				memberName: "Brian Creed",
				bookName: "To Kill a Mockingbird",
				bookAuthor: "Harper Lee",
				overdueTime: 11,
			},
			{
				loanId: "3",
				memberName: "Filly Anderson",
				bookName: "The Catcher in the Rye",
				bookAuthor: "J.D. Salinger",
				overdueTime: 8,
			},
			{
				loanId: "4",
				memberName: "Brian Creed",
				bookName: "Brave New World",
				bookAuthor: "Aldous Huxley",
				overdueTime: 6,
			},
			{
				loanId: "6",
				memberName: "Jane Doe",
				bookName: "The Lord of the Rings",
				bookAuthor: "J.R.R. Tolkien",
				overdueTime: 2,
			},
		]);
	});
});
