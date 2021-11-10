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
                if(!response.ok) {
                    throw Error('Error');
                }
              return response.json()
            }).then(data => {
                patientstore.patients = data;
                console.log(data)
                console.log(patientstore.patients)
            }).catch(error => {
                console.log(error)
        });
    }
}

export const patientstore = new PatientStore();