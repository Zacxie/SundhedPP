import {prescriptionStore} from "../../stores/PrescriptionStore";
import {DataGrid, GridRowsProp} from "@mui/x-data-grid";
import React from "react";
import {GridColDef} from "@mui/x-data-grid";

import '../../styling/prescriptions/PrescriptionsTable.css'
import {observer} from "mobx-react-lite";
import {patientstore} from "../../stores/PatientStore";

function PrescriptionsTable() {

    let rows: GridRowsProp[] = [];

    const columns: GridColDef[] = [
        {field: 'patientName', headerName: 'Patient', width: 150},
        {field: 'startDate', headerName: 'Start Date', width: 150},
        {field: 'endDate', headerName: 'End Date', width: 150},
        {field: 'description', headerName: 'Description', width: 150}
    ];

    prescriptionStore.prescriptions.forEach((prescription) => {
        console.log(prescription);
        rows.push({
            id: prescription.id,
            patientName: prescription.patient.name,
            startDate: new Date(prescription.start_date).toDateString(),
            endDate: new Date(prescription.end_date).toDateString(),
            description: prescription.description
        });
    });

    return (
        <div className="prescriptions-table">
            <DataGrid
                autoHeight
                disableSelectionOnClick={true}
                columns={columns}
                rows={rows}
                onRowClick={(row) => {
                    let path = "/#/prescription/" + row.id;
                    window.location.href = path;
                }}
            />
        </div>
    );
}

export default observer(PrescriptionsTable);
