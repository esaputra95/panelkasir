import { OptionSelectInterface } from "../globalInterface";
import { ProductInterface } from "../masters/ProductInterface";

export interface SaleDetailInterface {
    id?: number;
    salesId?: number;
    productId: number;
    productOption?: OptionSelectInterface;
    quantity: number;
    point?: number;
    capitalPrice?: number;
    discount?: number;
    sellingPrice: number
    tax?: number;
    total?: number;
    products?: ProductInterface;
    deleted?: boolean
}