import { OptionSelectInterface } from "../globalInterface";
import { ProductInterface } from "../masters/ProductInterface";

export interface SaleStockistDetailInterface {
    id?: number;
    SaleStockistsId?: number;
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