import React from "react"
import {patientstore} from "../stores/PatientStore";
import {Button} from "./Button";

let patient;


function CreatePatient() {

    return(
        <div>
            <Button onClick={patientstore.postPatient(patient)}>Create Patient</Button>
        </div>
    )
}

export default CreatePatient;