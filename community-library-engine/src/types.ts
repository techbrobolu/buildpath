type Item = {
	readonly id: string;
	name: string;
	author: string;
	isBorrowed: boolean;
};

type Member = {
	readonly id: string;
	name: string;
};

type Loan = {
	readonly id: string;
	memberId: string;
	itemId: string;
	loanDate: string;
	dueDate: string;
	returnDate: string | null;
};

type CheckoutResponse = {
	canBorrow: boolean;
	reason?: string;
	loan?: Loan;
};

type CheckinResponse = {
	overdue?: boolean;
	message: string;
};

type OverdueStatus = {
	overdue: boolean;
	message: string;
};

type CheckOut = (memberId: string, itemId: string, currentDate?: string) => CheckoutResponse;
type CheckIn = (itemId: string, currentDate?: string) => CheckinResponse;
type IsOverdue = (dueDate: string, currentDate: string) => OverdueStatus;

export { Item, Member, Loan, CheckOut, CheckIn, IsOverdue };
