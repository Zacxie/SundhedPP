import React, {useState} from "react"
import '../styling/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import PatientData from "./Data.json";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


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