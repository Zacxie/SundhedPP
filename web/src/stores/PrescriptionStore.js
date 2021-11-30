import {makeObservable, observable} from "mobx";

const baseUrl =  "https://sundhedpp.fisk.devops.diplomportal.dk";
//const baseUrl = "http://localhost:8080";//Base url til endpoint for at hente data

class PrescriptionStore {

    prescriptions = [];

    constructor() {
        makeObservable(this, {prescriptions: observable});
    }

    fetchPrescriptions() {
        fetch(baseUrl + "/rest/prescription")
            .then(response => {
                if (!response.ok) {
                    throw Error('Error');
                }
                return response.json()
            }).then(data => {
            this.forceReloadOrganization(data);
            console.log(data);
        }).catch(error => {
            console.log(error)

        });
    }

    postPrescription(prescription) {
        fetch(baseUrl + "/rest/prescription", {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(prescription)
        }).then(res => res.json())
            .then(res => console.log(res));
    }

    forceReloadOrganization = (results) => {
        this.prescriptions = [];
        if (results !== "") {
            results.forEach(item => {
                this.prescriptions.push({
                        id: item.id,
                        description: item.description,
                        start_date: item.start_date,
                        end_date: item.end_date,
                        patient: item.patient
                    }
                )
            });
        }
    }

    getByPatientId(id) {
        fetch(baseUrl + '/rest/prescription/patient/' + id)
            .then(response => {
                if (!response.ok)
                    throw Error('Error while getting patients prescriptions');

                return response.json();
            }).then(data => {
            console.log(data);
            this.forceReloadOrganization(data);
        }).catch(error => {
            console.log(error);
        })
    }
}

export const prescriptionStore = new PrescriptionStore();
