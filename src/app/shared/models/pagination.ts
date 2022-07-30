import { IProduct } from "./product";

export interface IPagination {
    pageNum: number;
    pageSize: number;
    totalItemCount: number;
    categoryName: string;
    sort: string;
    searchQuery: string;
    productsReturn: IProduct[];
}

