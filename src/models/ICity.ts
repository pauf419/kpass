import { IArea } from "./IArea"
import { IDBEntity } from "./IDBEntity"

export interface ICity extends IDBEntity {
    name: string 
    hash_name: string
    areas: IArea[]
}