import React from "react"
import {patientstore} from "../stores/PatientStore";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {observer} from "mobx-react-lite";


function Search() {

    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={patientstore.patients} // data
            getOptionLabel={(option) => {  // show options (name and cpr)
                    return (`${option.name}: ${option.cpr}`)
                }
            }
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Søg patient"/>}
            onChange={(event, newValue) => {
                if (newValue === null)
                    return;

                patientstore.setSelectedId(newValue.id);
            }}
            onFocus={() => {patientstore.fetchPatients()}}
        />
    )
}

export default observer(Search);