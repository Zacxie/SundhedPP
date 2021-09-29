import {makeObservable, observable} from "mobx";

class PrescriptionStore {
    prescriptions = [
        {
            id: 1,
            description: "This is a dummy prescription",
            patient: {
                name: "John Doe"
            },
            doctor: {
                name: "Dr. Jane Doe"
            },
            instructions: "John should take one tablet each a day",
            comments: "",
            start_date: new Date("2021-09-20"),
            end_date: new Date("2021-09-27"),
            contents: [
                {
                    medication: {
                        name: "Dummy drug"
                    },
                    dose: {
                        amount: 1,
                        unit: "tablet",
                        frequency: "daily"
                    },
                    quantity: { // TODO: Find better name for this
                        quantity: 30,
                        unit: "tablet"
                    }
                }
            ]
        },
        {
            id: 2,
            description: "This is a second dummy prescription",
            patient: {
                name: "John Doe's brother"
            },
            doctor: {
                name: "Dr. Jane Doe"
            },
            instructions: "John's brother should take two tablets a day",
            start_date: new Date("2021-09-20"),
            end_date: new Date("2021-09-27"),
            contents: [
                {
                    medication: {
                        name: "Dummy drug"
                    },
                    dose: {
                        amount: 2,
                        unit: "tablet",
                        frequency: "daily"
                    },
                    quantity: {
                        quantity: 60,
                        unit: "tablet"
                    }
                }
            ]
        }
    ];

    constructor() {
        makeObservable(this, {prescriptions: observable});
    }
}

export const prescriptionStore = new PrescriptionStore();
