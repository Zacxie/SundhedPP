import {makeObservable, observable} from "mobx";

class UserStore {
    token = "false";
    state = true;
    alerts = false;

    constructor() {
        makeObservable(this, {token: observable, state: observable});
    }
}

export const userStore = new UserStore();
