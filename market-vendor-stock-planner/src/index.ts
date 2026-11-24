import { GroupByProduct, SaleRecord } from "@/types";

export const groupByProduct: GroupByProduct = (sales) => {
    return sales.reduce((groups, sale) => {
        const key = sale.productName
        if (!groups[key]) {
            groups[key] = []
        }

        groups[key].push(sale)
        return groups
    }, {} as Record<string, SaleRecord[]>)
}