import type { Loan, CheckOut, CheckIn, IsOverdue, ListOverdue } from "@/types";
import { MAX_DAYS, MS_PER_DAY, MAX_ACTIVE_LOANS } from "@/constants";

const isOverdue: IsOverdue = (loan, currentDate) => {
	const diffMs = new Date(currentDate).getTime() - new Date(loan.dueDate).getTime(); // Milliseconds overdue: positive means overdue (e.g. 86_400_000 = 1 day); negative means not yet due.
	if (diffMs > 0) {
		const overdueTime = Math.ceil(diffMs / MS_PER_DAY);
		return {
			overdue: true,
			overdueTime: overdueTime,
			message: `The loan is overdue by ${overdueTime} day(s)`,
		};
	}

	return { overdue: false, overdueTime: 0, message: "Loan is not overdue" };
};

export const checkOut: CheckOut = (
	memberId,
	itemId,
	members,
	items,
	loans,
	currentDate = new Date().toISOString(),
) => {
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
	//    > push the new loan object to the loans array
	//    > return a response that states it can be borrowed and the loan object

	const member = members.find((member) => member.id == memberId);
	if (!member) {
		return { canBorrow: false, reason: "Member does not exist" };
	}

	const book = items.find((item) => item.id === itemId);
	if (!book) {
		return { canBorrow: false, reason: "Book does not exist" };
	}
	if (loans.some((loan) => loan.itemId === itemId && loan.returnDate === null)) {
		return { canBorrow: false, reason: "The book has been borrowed" };
	}

	const activeLoans: Loan[] = loans.filter(
		(loan) => loan.memberId === memberId && loan.returnDate === null,
	);
	if (activeLoans.length >= MAX_ACTIVE_LOANS) {
		return { canBorrow: false, reason: `Member has already borrowed ${MAX_ACTIVE_LOANS} books` };
	}

	if (activeLoans.some((loan) => isOverdue(loan, currentDate).overdue)) {
		return { canBorrow: false, reason: "You have an active overdue loan" };
	}

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

export const checkIn: CheckIn = (loans, items, itemId, currentDate = new Date().toISOString()) => {
	// 1. if book is checked out return message else set the book's borrow status to false
	// 2. set the loan's return date to the current date
	// 3. check if the book is overdue and return the appropriate response

	if (!items.find((item) => item.id === itemId)) {
		return { checkedIn: false, message: "itemId does not exist" };
	}

	const loan: Loan = loans.filter((loan) => loan.itemId === itemId && loan.returnDate === null)[0];
	if (!loan) {
		return { checkedIn: false, message: "Book is not checked out" };
	}

	const overdueResponse = isOverdue(loan, currentDate);
	if (overdueResponse.overdue) {
		loan.overdueTime = overdueResponse.overdueTime;
		loan.returnDate = currentDate;
		return { overdue: true, checkedIn: true, message: overdueResponse.message };
	}
	
	loan.returnDate = currentDate;
	return { overdue: false, checkedIn: true, message: "Book checked in successfully" };
};

export const listOverdue: ListOverdue = (loans, currentDate = new Date().toISOString()) => {
	// 1. Get current date
	// 2. Get overdue loans by filtering the main loans array using the conditions:
	//		> If the loan's returnDate is null AND
	//		> If the loan is overdue (to be checked using the isOverdue func)
	// 3. If there are no overdue loans return "There are no overdue loans"
	// 4. For each overdue loans add their overdue duration
	// 5. Sort the overdue loans using their overdue duration

	const overdueLoans = loans.filter(
		(loan) => loan.returnDate === null && isOverdue(loan, currentDate).overdue,
	);
	if (overdueLoans.length == 0) return "There are no overdue loans";

	overdueLoans.forEach((loan) => {
		const overdueResponse = isOverdue(loan, currentDate);
		loan.overdueTime = overdueResponse.overdueTime;
	});

	return overdueLoans.sort((a, b) => (b.overdueTime ?? 0) - (a.overdueTime ?? 0));
};
