type Item = {
	readonly id: string;
	name: string;
	author: string;
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
	overdueTime?: number;
};

type CheckoutResponse = {
	canBorrow: boolean;
	reason?: string;
	loan?: Loan;
};

type CheckinResponse = {
	overdue?: boolean;
	checkedIn: boolean;
	message: string;
};

type OverdueStatus = {
	overdue: boolean;
	overdueTime: number;
	message: string;
};

type CheckOut = (memberId: string, itemId: string, members: Member[], items: Item[], loans: Loan[], currentDate?: string) => CheckoutResponse;
type CheckIn = (loans: Loan[], items: Item[], itemId: string, currentDate?: string) => CheckinResponse;
type IsOverdue = (loan: Loan, currentDate: string) => OverdueStatus;
type ListOverdue = (loans: Loan[], currentDate?: string) => Loan[] | string

export { Item, Member, Loan, CheckOut, CheckIn, IsOverdue, ListOverdue };
