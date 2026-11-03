import type { Item, Member, Loan } from "@/types";

const MAX_DAYS = 14
const MS_PER_DAY = 24 * 60 * 60 * 1000
const MAX_ACTIVE_LOANS = 2

const items: Item[] = [
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
    }
];

const members: Member[] = [
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
    }
];

const loans: Loan[] = [
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
		memberId: "5",
		itemId: "4",
		loanDate: "2025-10-08T10:00:00.000Z",
		dueDate: "2025-10-22T10:00:00.000Z",
		returnDate: "2025-10-20T10:00:00.000Z",
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
    }
];

export { items, members, loans, MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS };