type Item = {
    readonly id: string;
    name: string;
    author: string;
    isBorrowed: boolean;
}

type Member = {
    readonly id: string;
    name: string;
}

type Loan = {
    readonly id: string;
    memberId: string;
    itemId: string;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
}

type CheckoutResponse = {
    canBorrow: boolean;
    reason?: string;
    loan?: Loan;
}

type CheckOut = (memberId: string, itemId: string, currentDate?: string) => CheckoutResponse

export { Item, Member, Loan, CheckOut }