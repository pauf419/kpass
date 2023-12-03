import $api from "../http";
import {AxiosResponse} from 'axios';
import { HttpResponse } from "../models/response/HttpResponse";

export default class AuthService {

    static async verifyAccess(apikey:string): Promise<AxiosResponse<HttpResponse>> {
        return $api.get<HttpResponse>("/admin/access", {
            params: {
                apikey
            }
        })
    }

}

