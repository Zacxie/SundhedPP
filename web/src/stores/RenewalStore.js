import {makeObservable, observable} from "mobx";

class RenewalStore {

    renewal_date = null;
    renewal_text = "";


    constructor() {
        makeObservable(this, {renewal_date: observable, renewal_text: observable});
    }

}

export const renewalStore = new RenewalStore();