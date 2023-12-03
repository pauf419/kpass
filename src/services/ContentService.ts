
import $api from "../http";
import {Axios, AxiosResponse} from 'axios';
import { HttpResponse } from "../models/response/HttpResponse";
import { ICity } from "../models/ICity";
import { IArea } from "../models/IArea";
import { IProduct } from "../models/IProduct";
import { IPurchase } from "../models/IPurchase";

export default class ContentService {

    static async getCities(): Promise<AxiosResponse<HttpResponse<ICity[]>>> {
        return $api.get<HttpResponse>("/content/city")
    }

    static async getProducts(): Promise<AxiosResponse<HttpResponse<IProduct[]>>> {
        return $api.get<HttpResponse>("/content/product")
    }

    static async removeProduct(id:string): Promise<AxiosResponse<HttpResponse<IProduct>>> {
        return $api.delete<HttpResponse>("/admin/product", {
            data: {
                id
            }
        })
    }

    static async getPurchases(): Promise<AxiosResponse<HttpResponse<IPurchase[]>>> {
        return $api.get<HttpResponse>("/admin/purchase")
    }

    static async addProduct(name:string, price:string): Promise<AxiosResponse<HttpResponse<IProduct>>> {
        return $api<HttpResponse>("/admin/product", {
            method: "PUT", 
            data: {
                name, 
                price
            }
        })
    }

    static async removeArea(id:string): Promise<AxiosResponse<HttpResponse<IArea>>> {
        return $api.delete<HttpResponse>("/admin/area", {
            data: {
                id
            }
        })
    }

    static async addArea(name:string, parent:string): Promise<AxiosResponse<HttpResponse<IArea>>> {
        return $api<HttpResponse>("/admin/area", {
            method: "PUT",
            data: {
                parent,
                name
            }
        })
    }

    static async removeCity(id:string): Promise<AxiosResponse<HttpResponse<ICity>>> {
        return $api.delete<HttpResponse>("/admin/city", {
            data: {
                id
            }
        })
    }

    static async addCity(name:string): Promise<AxiosResponse<HttpResponse<ICity>>> {
        return $api<HttpResponse>("/admin/city", {
            method: "PUT", 
            data: {
                name
            }
        })
    }

    static async verifyAccess(apikey:string): Promise<AxiosResponse<HttpResponse>> {
        return $api.get<HttpResponse>("/admin/access", {
            params: {
                apikey
            }
        })
    }

}

