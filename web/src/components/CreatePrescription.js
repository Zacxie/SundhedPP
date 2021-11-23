import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import {prescriptionStore} from "../stores/PrescriptionStore";
import {patientstore} from "../stores/PatientStore";
import '../styling/Form.css'
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@mui/material";

function CreatePrescription() {

    const {register, handleSubmit} = useForm();
    const [patient, setPatient] = useState()


    const handleAutocomplete = (e, patient) => {
        setPatient(patient);
        console.log(patient);
    }

    const onSubmit = (prescription) => {
        console.log(prescription)
        prescriptionStore.postPrescription(prescription)
    }
    return(
        <div className="form-box">
            <br/>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={patientstore.patients} // data
                getOptionLabel={(option) => {  // show options (name and cpr)
                    return (`${option.name}: ${option.cpr}`)}
                }
                sx={{ width: 350}}
                onChange={handleAutocomplete}
                renderInput={(params) => <TextField {...params} label="Choose Patient" />}
            />
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label> Create Prescription </label>
                <input type="text"
                       placeholder="Choose Patient"
                       value={`${patient.name}: ${patient.cpr}`}
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