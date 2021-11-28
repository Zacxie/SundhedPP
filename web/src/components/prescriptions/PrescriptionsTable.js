import {prescriptionStore} from "../../stores/PrescriptionStore";
import {DataGrid, GridRowsProp} from "@mui/x-data-grid";
import React from "react";
import {GridColDef} from "@mui/x-data-grid";

import '../../styling/prescriptions/PrescriptionsTable.css'
import RenewPrescription from "./RenewPrescription";
import {userStore} from "../../stores/UserStore";



class PrescriptionsTable extends React.Component {

    setAlert = () =>{
        console.log("row click")
        console.log(userStore.alerts)
        userStore.alerts = true
    }

    redirect = (id) => {
        let path = "/#/prescription/" + id; // We use hashrouter
        window.location.href = path;
    }

    render() {
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
                    onRowClick={(row) => this.setAlert(row.id) }
                />
                <RenewPrescription/>
            </div>
        );
    }
}

export default PrescriptionsTable;


