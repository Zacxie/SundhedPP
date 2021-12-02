import {makeObservable, observable} from "mobx";


const baseUrl =  "https://sundhedpp.fisk.devops.diplomportal.dk";


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

    putPrescription(prescription) {
        if (prescription.id == null || prescription.id === 0)
            return;

        let jsonPrescription = {};
        // JS copies by reference by default, so we have use this method to get an actual copy of the object
        Object.assign(jsonPrescription, this.prescriptions.filter((presc) => presc.id === prescription.id)[0]);

        // Convert to something the API can understand
        if (jsonPrescription.patient != null) {
            delete jsonPrescription.patient;
            jsonPrescription.patient_id = prescription.patient.id;
        }

        fetch(baseUrl + "/rest/prescription/" + prescription.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonPrescription)
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
                        diagnosis: item.diagnosis,
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
            this.forceReloadOrganization(data);
        }).catch(error => {
            console.log(error);
        })
    }
}

export const prescriptionStore = new PrescriptionStore();
