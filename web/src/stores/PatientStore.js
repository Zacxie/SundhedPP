import {makeAutoObservable, observable} from "mobx"


// const baseUrl = "https://sundhedpp.fisk.devops.diplomportal.dk";
const baseUrl = "http://localhost:8080";//Base url til endpoint for at hente data


class PatientStore {

    patients = [];

    constructor(props) {
        makeAutoObservable(this, {patients: observable}, {autoBind: true});
    }

    fetchPatients() {
        fetch(baseUrl + "/rest/patient")
            .then(response => {
                if (!response.ok) {
                    throw Error('Error');
                }
                return response.json()
            }).then(data => {
            this.forceReloadOrganization(data);
        }).catch(error => {
            console.log(error)

        });
    }

    postPatient(patient) {
        fetch(baseUrl + "/rest/patient", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        }).then(res => res.json())
            .then(res => console.log(res));
    }

    forceReloadOrganization = (results) => {
        if (results !== "") {
            this.patients = [];
            results.forEach(item => {
                this.patients.push({
                        cpr: item.cpr,
                        name: item.name,
                        id: item.id
                    }
                )
            });
        }
    }
}


export const patientstore = new PatientStore();