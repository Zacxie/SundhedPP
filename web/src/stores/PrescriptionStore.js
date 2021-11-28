import {makeObservable, observable} from "mobx";

const baseUrlProd =  "https://sundhedpp.fisk.devops.diplomportal.dk";
const baseUrlTest = "http://localhost:8080";//Base url til endpoint for at hente data

class PrescriptionStore {

    prescriptions = [];

    constructor() {
        makeObservable(this, {prescriptions: observable});
    }

    fetchPrescriptions() {
        fetch(baseUrlTest + "/rest/prescription")
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
        fetch(baseUrlTest + "/rest/prescription", {
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
        {

            if (results != "") {
                results.map(item => {

                    this.prescriptions.push({
                            id: item.id,
                            description: item.description,
                            start_date: item.start_date,
                            end_date: item.end_date,
                            patient: item.patient_id

                        }
                    )
                });
            }

        }
    }

    getByPatientId(id) {
        fetch(baseUrlTest + '/rest/prescription/patient/' + id)
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
