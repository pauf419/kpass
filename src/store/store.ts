import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    isAuth = false;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async verifyAccess(apikey:string): Promise<void> {
        this.setLoading(true)
        try {
            const response = await AuthService.verifyAccess(apikey);
            switch(response.data.status) {
                case 200: 
                    this.setAuth(true)
                    localStorage.setItem('token', apikey);
                    break;
                default: 
                    return;
            }
        } catch(e) {
            console.error(e)
        }
        this.setLoading(false)
    }

    async login() {
        try {
            localStorage.removeItem('token ')
            this.setAuth(true);
        } catch (e) {
            console.log(e);
        }
    }
}
