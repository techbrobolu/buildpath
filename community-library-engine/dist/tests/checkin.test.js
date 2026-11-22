"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("@/index");
(0, vitest_1.describe)("checkin", () => {
    let loans;
    let books;
    (0, vitest_1.beforeEach)(() => {
        loans = [
            {
                id: "1",
                memberId: "2",
                bookId: "7",
                loanDate: "2025-10-01T10:00:00.000Z",
                dueDate: "2025-10-15T10:00:00.000Z",
                returnDate: "2025-10-13T10:00:00.000Z",
            },
            {
                id: "2",
                memberId: "1",
                bookId: "2",
                loanDate: "2025-10-05T10:00:00.000Z",
                dueDate: "2025-10-19T10:00:00.000Z",
                returnDate: null,
            },
            {
                id: "3",
                memberId: "4",
                bookId: "4",
                loanDate: "2025-10-08T10:00:00.000Z",
                dueDate: "2025-10-22T10:00:00.000Z",
                returnDate: null,
            },
            {
                id: "4",
                memberId: "1",
                bookId: "5",
                loanDate: "2025-10-10T10:00:00.000Z",
                dueDate: "2025-10-24T10:00:00.000Z",
                returnDate: null,
            },
            {
                id: "5",
                memberId: "3",
                bookId: "1",
                loanDate: "2025-10-12T10:00:00.000Z",
                dueDate: "2025-10-26T10:00:00.000Z",
                returnDate: "2025-10-25T10:00:00.000Z",
            },
            {
                id: "6",
                memberId: "2",
                bookId: "6",
                loanDate: "2025-10-14T10:00:00.000Z",
                dueDate: "2025-10-28T10:00:00.000Z",
                returnDate: null,
            },
        ];
        books = [
            {
                id: "1",
                name: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
            },
            {
                id: "2",
                name: "To Kill a Mockingbird",
                author: "Harper Lee",
            },
            {
                id: "3",
                name: "1984",
                author: "George Orwell",
            },
            {
                id: "4",
                name: "The Catcher in the Rye",
                author: "J.D. Salinger",
            },
            {
                id: "5",
                name: "Brave New World",
                author: "Aldous Huxley",
            },
            {
                id: "6",
                name: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
            },
            {
                id: "7",
                name: "The Hobbit",
                author: "J.R.R. Tolkien",
            },
        ];
    });
    (0, vitest_1.it)("should block if Book does not exist", () => {
        const bookId = "a";
        const result = (0, index_1.checkIn)(loans, books, bookId);
        (0, vitest_1.expect)(result).toEqual({ checkedIn: false, message: "bookId does not exist" });
    });
    (0, vitest_1.it)("should block if the book is not checked out", () => {
        const bookId = "1";
        const result = (0, index_1.checkIn)(loans, books, bookId);
        (0, vitest_1.expect)(result).toEqual({ checkedIn: false, message: "Book is not checked out" });
    });
    (0, vitest_1.it)("should notify that the loan is overdue", () => {
        const bookId = "2";
        const result = (0, index_1.checkIn)(loans, books, bookId);
        (0, vitest_1.expect)(result.overdue).toBe(true);
    });
    (0, vitest_1.it)("should checkin successfully", () => {
        const bookId = "5";
        const currentDate = "2025-10-22T10:00:00.000Z";
        const result = (0, index_1.checkIn)(loans, books, bookId, currentDate);
        (0, vitest_1.expect)(result.message).toEqual("Book checked in successfully");
    });
});
