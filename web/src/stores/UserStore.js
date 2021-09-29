import {makeObservable, observable} from "mobx";

class UserStore {
    users = [];

    constructor() {
        makeObservable(this, {users: observable});
    }
}

export const userStore = new UserStore();
