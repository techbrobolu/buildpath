import { describe, it, expect } from "vitest";
import { checkIn } from "@/index";
import type { Item, Loan } from "@/types";
import { items, loans, MAX_ACTIVE_LOANS } from "@/constants";

describe("checkin", () => {
    it("should block if item does not exist", () => {
        const itemId = "a"
        const result = checkIn(itemId)
        expect(result).toEqual({ message: "itemId does not exist" });
    });
    it("should block if the book is not checked out", () => {
        const itemId = "7"
        const result = checkIn(itemId)
        expect(result).toEqual({ message: "Book is not checked out" });
    });
    it("should notify that the loan is overdue", () => {
        const itemId = "2"
        const result = checkIn(itemId)
        expect(result.overdue).toBe(true)
    });
    it("should checkin successfully", () => {
        const itemId = "4"
        const currentDate = "2025-10-22T10:00:00.000Z"
        const result = checkIn(itemId, currentDate)
        expect(result.message).toEqual("Book checked in successfully");
    })
})