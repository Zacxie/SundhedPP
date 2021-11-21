import React from "react"
import { useForm } from 'react-hook-form';
import {prescriptionStore} from "../stores/PrescriptionStore";
import '../styling/Form.css'


function CreatePrescription() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (prescription) => {
        console.log(prescription)
        prescriptionStore.postPrescription(prescription)
    }
    return(
        <div className="form-box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label> Create Patient </label>
                <input type="text"
                       placeholder="Enter name"
                       name="name" {...register('name', {required: true, pattern: /^[a-zA-Z\s]+$/} )}
                />
                <input type="text"
                       placeholder="Enter cpr-number"
                       name="cpr" {...register('cpr', {required: true, minLength: 11, maxLength: 11})}
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreatePrescription;