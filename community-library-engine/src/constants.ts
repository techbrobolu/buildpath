import type { Item, Member, Loan } from "@/types";

const MAX_DAYS = 14
const MS_PER_DAY = 24 * 60 * 60 * 1000
const MAX_ACTIVE_LOANS = 2

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
    }
];

export { loans, MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS };