import React from "react"
import {patientstore} from "../stores/PatientStore";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



function Search() {

    return(
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            onInputChange={(event, newInputValue) => {
                if (newInputValue.length < 3) return;
                // UPDATING OPTIONS
                patientstore.patients.length = 0;
                getNewOptions(newInputValue).forEach((item) => patientstore.patients.push(item))
            }}
            options = patienstore // data
            getOptionLabel={(option) => {  // show options (name and cpr)
                return (`${option.name}: ${option.cpr}`)}
            }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Søg patient" />}
        />
    )
}

export default Search;