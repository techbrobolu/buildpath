import type { Item, Loan, CheckOut, CheckIn, IsOverdue } from "@/types";
import { loans, items, MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS } from "@/constants";

const isOverdue: IsOverdue = (dueDate, currentDate) => {
	const diffMs = new Date(currentDate).getTime() - new Date(dueDate).getTime(); // diffMs = currentDate in milliseconds - dueDate in milliseconds
	if (diffMs > 0)
		return {
			overdue: true,
			message: `The book is overdue by ${Math.ceil(diffMs / 1000 / 60 / 60 / 24)} day(s)`,
		};

    return { overdue: false, message: "The book is not overdue" };
};

const checkOut: CheckOut = (memberId, itemId, currentDate = new Date().toISOString()) => {
    // 1. if the book doesn't exist return a response that states it
    // 2. if the book is already borrowed return a response that states it
    // 3. filter for the member's active loans
    // 4. if the member currently has 2 borrowed books return a response that states it
    // 5. if the book is overdue return a response that states it
    // 6. if it passes all the tests above: 
    //    > set the book's borrow status to true
    //    > set the loan's loan date to the current date
    //    > set the loan's due date to the current date + 14 days
    //    > set the loan's return date to null

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

	if (activeLoans.some((loan) => isOverdue(loan.dueDate, currentDate).overdue)) {
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

const checkIn: CheckIn = (itemId, currentDate = new Date().toISOString()) => {
    // 1. if book is checked out return message else set the book's borrow status to false
    // 2. set the loan's return date to the current date
    // 3. check if the book is overdue and return the appropriate response

	const loan: Loan = loans.filter((loan) => loan.itemId === itemId && loan.returnDate === null)[0];
	if (!loan) {
		return { message: "Book is not checked out" };
    }

    const book: Item = items.filter((item) => item.id === itemId)[0];
    book.isBorrowed = false;

	loan.returnDate = currentDate;
	const overdueResponse = isOverdue(loan.dueDate, currentDate);
	if (overdueResponse.overdue) {
		return { overdue: true, message: overdueResponse.message };
    }
    
	return { overdue: false, message: "Book checked in successfully" };
};
