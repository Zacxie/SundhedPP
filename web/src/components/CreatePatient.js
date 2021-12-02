import React from "react"
import {useForm} from 'react-hook-form';
import {patientstore} from "../stores/PatientStore";
import '../styling/Form.css'
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";


function CreatePatient() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (patient) => {
        console.log(patient)
        patientstore.postPatient(patient)
        window.location.href = "/#/";
    }
    return (
        <div className="form-box">
            <Header/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label> Create Patient </label>
                <input type="text"
                       id="name"
                       placeholder="Enter name"
                       name="name" {...register('name', {required: true, pattern: /^[a-zA-Z\s]+$/})}/>
                <input type="text"
                       placeholder="Enter cpr-number"
                       name="cpr" {...register('cpr', {required: true, minLength: 11, maxLength: 11})}/>

                <input type="submit"/>
            </form>
            <Footer/>
        </div>
    )
}

export default CreatePatient;