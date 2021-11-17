import React from "react"
import { useForm } from 'react-hook-form';
import {patientstore} from "../stores/PatientStore";
import '../styling/Form.css'

function CreatePatient() {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (patient) => {
        console.log(patient)
        patientstore.postPatient(patient)
    }

    return(
        <div className="form-box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label> Create Patient </label>
                <input type="text"
                       placeholder="Enter name"
                       name="name" {...register('name', {required: true} )}
                />

                <input type="text"
                       placeholder="Enter cpr-number"
                       name="cpr" {...register('cpr', {required: true, minLength: 10})}
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreatePatient;