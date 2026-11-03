// A few things this program assumes:
// - The memberId and itemId passed into the checkOut and checkIn functions are valid and exist.
// - The date passed into the checkOut and checkIn functions is valid.

import type { Item, Member, Loan, CheckOut } from "@/types";
import { loans, items, MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS } from "@/constants";

function isOverdue(dueDate: string, currentDate: string): boolean {
	const diffMs = new Date(currentDate).getTime() - new Date(dueDate).getTime(); // diffMs = currentDate in milliseconds - dueDate in milliseconds
	return diffMs > 0;
}

const checkOut: CheckOut = (
	memberId: string,
	itemId: string,
	currentDate: string = new Date().toISOString(),
) => {
	const book: Item = items.filter((item) => item.id === itemId)[0];
	if (!book) {
		return { canBorrow: false, reason: "Book does not exist" };
	}
	if (book.isBorrowed) {
		return { canBorrow: false, reason: "Book is already borrowed" };
	}

	const activeLoans: Loan[] = loans.filter(
		(loan) => loan.memberId === memberId && loan.returnDate === null,
	);
	if (activeLoans.length >= MAX_ACTIVE_LOANS) {
		return { canBorrow: false, reason: `Member has already borrowed ${MAX_ACTIVE_LOANS} books` };
	}

	if (activeLoans.some((loan) => isOverdue(loan.dueDate, currentDate))) {
		return { canBorrow: false, reason: "Book is overdue" };
	}

	book.isBorrowed = true;
	const dueDate = new Date(new Date(currentDate).getTime() + MAX_DAYS * MS_PER_DAY).toISOString();
	const loan: Loan = {
		id: String(loans.length + 1),
		memberId: memberId,
		itemId: itemId,
		loanDate: currentDate,
		dueDate: dueDate,
		returnDate: null,
	};

	loans.push(loan);

	return { canBorrow: true, loan: loan };
};
