import React from "react"
import '../styling/Search.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import patientList from './patientlist'


function Search() {

    return(
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={patientList} // data
            getOptionLabel={(option) => {  // show options (name and cpr)
                return (`${option.name}: ${option.cpr}`)}
            }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Søg patient" />}
        />

    )
}


export default Search;