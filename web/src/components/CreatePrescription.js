import React, { useState} from "react";
import { useForm } from 'react-hook-form';
import {prescriptionStore} from "../stores/PrescriptionStore";
import {patientstore} from "../stores/PatientStore";
import '../styling/Form.css'
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";

function CreatePrescription() {


    const {register, handleSubmit} = useForm();
    const [patient, setPatient] = useState();

    const handleAutocomplete = (e, patient) => {
        setPatient(patient);
    }


    const onSubmit = (data) => {
        let prescription = data;
        prescription['patient_id'] = patient.id;
        prescriptionStore.postPrescription(prescription);
        window.location.href = "/#/";
    }
    return(
        <div>
            <Header/>
        <div className="form-box">
            <label> Create Prescription </label>
            <br/>
            <br/>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={patientstore.patients} // data
                getOptionLabel={(option) => {  // show options (name and cpr)
                    return (`${option.name}: ${option.cpr}`)}
                }
                sx={{ width: 510}}
                onChange={handleAutocomplete}
                renderInput={(params) => <TextField {...params} label="Choose Patient" />}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="date"
                       placeholder="Enter start-date"
                       name="start_date" {...register('start_date', { required: true, pattern: "YYYY/DD/MM" })} // pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
                />
                <input type="date"
                       placeholder="Enter end-date"
                       name="end_date" {...register('end_date', { required: true, pattern: "YYYY/DD/MM" })} // pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
                />

                <textarea
                          placeholder="Enter a description"
                          name="description" {...register('description')}
                />

                <textarea
                    placeholder="Enter a diagnosis"
                    name="diagnosis" {...register('diagnosis')}
                />
                <input type="submit" />
            </form>
        </div>
        </div>
    )
}

export default CreatePrescription;