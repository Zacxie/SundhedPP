

const baseUrl =  "http://localhost:8080"; //Base url til endpoint for at hente data

class SearchStore {

    patients = [];
    constructor(props) {
        makeAutoObservable(this,{patients: observable},{autoBind:true});
        this.fetchPatients();

    }

    fetchPatients() {
        fetch(baseUrl + "/patients").then(
            (response) => response.json().then(
                (json) => runInAction(() => this.patients=json)
            )
        )
    }
}

export const searchstore = new SearchStore();