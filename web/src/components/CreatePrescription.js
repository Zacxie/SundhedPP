import React, { useState} from "react";
import { useForm } from 'react-hook-form';
import {prescriptionStore} from "../stores/PrescriptionStore";
import {patientstore} from "../stores/PatientStore";
import '../styling/Form.css'
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

function CreatePrescription() {


    const {register, handleSubmit} = useForm();
    const [patient, setPatient] = useState();

    const handleAutocomplete = (e, patient) => {
        setPatient(patient);
        console.log(patient);
    }


    const onSubmit = (data) => {
        let prescription = data;
        prescription['name'] = patient.name;
        prescription['cpr'] = patient.cpr;
        prescription['id'] = patient.id;
        console.log(prescription);
        prescriptionStore.postPrescription(prescription);
    }
    return(
        <div className="form-box">
            <label> Create Prescription </label>
            <br/>
            <br/>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={patientstore.patients} // data
                getOptionLabel={(option) => {  // show options (name and cpr)
                    return (`${option.name}: ${option.cpr}: ${option.id} `)}
                }
                sx={{ width: 510}}
                onChange={handleAutocomplete}
                renderInput={(params) => <TextField {...params} label="Choose Patient" />}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="date"
                       placeholder="Enter start-date"
                       name="start_date" {...register('start-date', { required: true, pattern: "YYYY/DD/MM" })} // pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
                />
                <input type="date"
                       placeholder="Enter end-date"
                       name="end_date" {...register('end-date', { required: true, pattern: "YYYY/DD/MM"})} // pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
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