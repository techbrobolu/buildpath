// A few things this program assumes:
// - The memberId and itemId passed into the checkOut and checkIn functions are valid and exist.
// - The date passed into the checkOut and checkIn functions is valid.

import type { Item, Member, Loan, CheckOut } from "@/types";
import { loans, items, MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS } from "@/constants";

const  checkOut: CheckOut = (
	itemId: string,
	memberId: string,
	currentDate: string = new Date().toISOString(),
) => {
    const book: Item = items.filter((item) => item.id === itemId)[0];
    if (book.isBorrowed) {
        return {canBorrow: false, reason: "Book is already borrowed"};
    }
    
    const activeLoans: Loan[] = loans.filter((loan) => loan.memberId === memberId);
    if (activeLoans.length >= 2) {
        return {canBorrow: false, reason: "Member has already borrowed two books"};
    }

    const dueDate = new Date(new Date(currentDate).getTime() + MAX_DAYS * MS_PER_DAY).toISOString();
	const loan: Loan = {
		id: String(loans.length + 1),
		memberId: memberId,
		itemId: itemId,
        loanDate: currentDate,
        dueDate: dueDate,
        returnDate: null
    };
    
	return {canBorrow: true, loan: loan};
};