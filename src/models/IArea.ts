import { IDBEntity } from "./IDBEntity"

export interface IArea extends IDBEntity {
    parent: string 
    name: string 
}
