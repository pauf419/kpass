import { IArea } from "./IArea"
import { ICity } from "./ICity"
import { IProduct } from "./IProduct"

export interface IPurchase {
    id: string 
    city: ICity
    area: IArea
    product: IProduct
    orderid: string 
    price: string
    userid: string
}