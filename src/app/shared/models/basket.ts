import {v4 as uuidv4} from 'uuid';
import { ICategory } from './category';
export interface IBasketItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    manufacturer: string;
    category: string;
}

export interface IBasket {
    id: string;
    items: IBasketItem[];
}

export class Basket implements IBasket{
    id= uuidv4();
    items: IBasketItem[]=[];

}