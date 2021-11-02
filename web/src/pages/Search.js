import React from "react"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const patientList = [
    { name: 'Mikkel Jensen', cpr: "170390-2839" },
    { name: 'Peter Bieger', cpr: "190288-2839" },
    { name: 'Jens Jensen', cpr: "050680-2839" },
    { name: 'Ole Mikkelsen', cpr: "121294-2839" },
    { name: 'Gustav Timmermann', cpr: "241200-2839" },
    { name: "Sebastian Ulriksen", cpr: "270898-2839" },
    { name: 'Lars Larsen', cpr: "110191-2839" },
    { name: "Kien Moon", cpr: "250588-0539" },
    { name: "Tea Hickman", cpr: "260476-3218"},
    { name: "Levi Hayes", cpr: "261059-0082"},
    { name: "Clayton Mcconnell", cpr: "220364-4852"},
    { name: "Gia Whelan", cpr: "150689-0620" },
    { name: "Waqar Griffith", cpr:"011258-1480"},
    { name: "Debbie Singh", cpr: "160860-2328" },
    { name: "Sadiyah Byrd", cpr: "061294-2137"},
    { name: "Peter Kenny", cpr: "031297-4428"},
    { name: "Mamie Pace", cpr: "230562-4716"},
    { name: "Adam Farrow", cpr: "070264-4186" },
    { name: "Lennon Adamson", cpr: "030492-3466" },
    { name: "John Herring", cpr: "051151-0791"},
    { name: "Jens Mcmahon", cpr: "170741-0228"},
    { name: "Frederik Whitaker", cpr: "220568-2581"},
    { name: "Frank Waller", cpr: "190370-4639"},
    { name: "mark Delgado", cpr:  "160969-1294" },
    { name: "Lexi Noel", cpr: "280891-0988"}
]


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