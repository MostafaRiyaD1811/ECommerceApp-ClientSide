import {ICategory}from 'src/app/shared/models/category'
export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    manufacturer: string;
    pictureUrl: string;
    category: ICategory;
}