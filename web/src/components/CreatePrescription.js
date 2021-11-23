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
                <label> Create Description </label>
                <input type="text"
                       placeholder="Choose Patient"
                       name="patient" {...register('patient', { required: true })}
                />
                <input type="text"
                       placeholder="Enter start-date (yyyy-MM-dd)"
                       name="start-date" {...register('start-date', { required: true })}
                />

                <input type="text"
                       placeholder="Enter end-date (yyyy-MM-dd)"
                       name="end-date" {...register('end-date', { required: true })}
                />

                <textarea
                          placeholder="Enter a description"
                          name="description" {...register('description')}
                />



                <input type="submit" />
            </form>
        </div>
    )
}

export default CreatePrescription;