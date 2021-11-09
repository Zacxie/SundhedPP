import {makeAutoObservable, observable} from "mobx"


const baseUrl =  "http://localhost:8080"; //Base url til endpoint for at hente data


class PatientStore {

    patients = [];

    constructor(props) {
        makeAutoObservable(this,{patients: observable},{autoBind:true});
        this.fetchPatients();

    }

    fetchPatients() {
        fetch(baseUrl + "/rest/patient")
            .then(response => {
              return response.json()
            }).then(data => {
                this.patients = data;
            console.log(this.patients);
        });
    }
}

export const patientstore = new PatientStore();