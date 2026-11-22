type Book = {
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
	bookId: string;
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

type ListOverdueResponseItem = {
	loanId: string;
	memberName: string;
	bookName: string;
	bookAuthor: string;
	overdueTime: number;
};

type CheckOut = (memberId: string, itemId: string, members: Member[], books: Book[], loans: Loan[], currentDate?: string) => CheckoutResponse;
type CheckIn = (loans: Loan[], books: Book[], itemId: string, currentDate?: string) => CheckinResponse;
type IsOverdue = (loan: Loan, currentDate: string) => OverdueStatus;
type ListOverdue = (loans: Loan[], members: Member[], books: Book[], currentDate?: string) => ListOverdueResponseItem[] | string

export { Book, Member, Loan, CheckOut, CheckIn, IsOverdue, ListOverdue, ListOverdueResponseItem };
