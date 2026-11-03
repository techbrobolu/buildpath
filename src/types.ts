type Item = {
    id: string;
    name: string;
    author: string;
    isBorrowed: boolean;
}

type Member = {
    id: string;
    name: string;
}

type Loan = {
    id: string;
    memberId: string;
    itemId: string;
    loanDate: Date;
    dueDate: Date;
    returnDate: Date | null;
}

export { Item, Member, Loan }