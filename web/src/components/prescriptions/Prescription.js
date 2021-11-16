import React from "react";
import {Link, withRouter} from "react-router-dom";
import {prescriptionStore} from "../../stores/PrescriptionStore";
import {Button} from "@material-ui/core";

class Prescription extends React.Component {

    onClick = (id) => {
        let prescription = prescriptionStore.prescriptions.filter((prescription) => prescription.id === id)[0];
        prescription.end_date.setDate(prescription.end_date.getDate() + 7);
        window.location.href = "/#/";
    }

    render() {
        let id = this.props.match.params.id;

        return (
            <div>
                <h1>Prescription #{id}</h1>
                <Button onClick={() => this.onClick(id)}>Renew</Button>
            </div>
        )
    }
}

export default withRouter(Prescription)