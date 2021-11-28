import React, {useState} from "react";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {prescriptionStore} from "../../stores/PrescriptionStore";
import RenewPrescription from "./RenewPrescription";
import '../../styling/prescriptions/PrescriptionsTable.css'
import {waitFor} from "@testing-library/react";
import Async from 'react-async';

const NewPrescriptionTable = () =>{

    const [open, setOpen] = useState(false)
    const [select, setSelect] = useState(null)
    const [patient, setPatient] = useState({})


    const changeDialog = async (rowID) =>{
        setOpen(current => !current)
        setSelect(current => rowID)
        let prescription = prescriptionStore.prescriptions.filter((prescription) => prescription.id === rowID)[0];
        const waitSet = await setPatient(current => prescription)

    }
    const onClose = () =>{
        setOpen(current => !current)
    }

    const onRenewal = (value, text, rowID) =>{
        // set date for prescription
        let prescription = prescriptionStore.prescriptions.filter((prescription) => prescription.id === rowID)[0];
        prescription.end_date = value;

        // set instruction for prescription
        if(text != "") {
            let prescription_text = prescriptionStore.prescriptions.filter((prescription) => prescription.id === rowID)[0];
            prescription_text.instructions = text;
        }
        setOpen(current => !current)
    }



    const columns: GridColDef[] = [
        {field: 'patientName', headerName: 'Patient', width: 150},
        {field: 'startDate', headerName: 'Start Date', width: 150},
        {field: 'endDate', headerName: 'End Date', width: 150},
        {field: 'contents', headerName: 'Contents', width: 150}
    ];

    const rows: GridRowsProp[] = [];

    prescriptionStore.prescriptions.forEach((prescription) => {
        let prescriptionContent = "";
        prescription.contents.forEach((content, index) => {
            prescriptionContent += content.medication.name;
            if (index !== (prescription.contents.length - 1))
                prescriptionContent += ", ";
        });

        rows.push({
            id: prescription.id,
            patientName: prescription.patient.name,
            startDate: prescription.start_date.toDateString(),
            endDate: prescription.end_date.toDateString(),
            contents: prescriptionContent
        });
    });

    return (
        <div className="prescriptions-table">
            <DataGrid
                disableSelectionOnClick={true}
                columns={columns}
                rows={rows}
                onRowClick={(row) => changeDialog(row.id) }
            />
            <Async RenewPrescription open={open} onClose={onClose} select={select} onRenewal={onRenewal} patient={patient} />
        </div>
    );
}
export default NewPrescriptionTable