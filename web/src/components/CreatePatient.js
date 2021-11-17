import React from "react"
import { useForm } from 'react-hook-form';
import {patientstore} from "../stores/PatientStore";
import {Button} from "./Button";

let patient;


function CreatePatient() {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (patient) => {
        console.log(patient)
        patientstore.postPatient(patient)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Indtast navn" name="name" {...register('name')}/>
            <input type="text" placeholder="Indtast cpr-nummer" name="cpr" {...register('cpr')}/>
            <input type="submit" />
        </form>
    )
}

export default CreatePatient;