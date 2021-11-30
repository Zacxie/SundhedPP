import {makeObservable, observable} from "mobx";

class UserStore {
    users = [];
    token = "false";
    secret = "";
    state = true;
    alerts = false;


    constructor() {
        makeObservable(this, {users: observable, token: observable, state: observable});
    }
}

export const userStore = new UserStore();
