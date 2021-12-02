import {makeObservable, observable} from "mobx";

class UserStore {
    name = null;
    pass = null;
    token = "false";
    isAuthenticated = false;


    constructor() {
        makeObservable(this, {name: observable, pass: observable, token: observable, isAuthenticated: observable});
    }
}

export const userStore = new UserStore();
