import React, {useState} from "react"
import '../styling/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import PatientData from "./Data.json";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function Search() {
    const data = PatientData
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.navn.toLowerCase().includes(searchWord.toLowerCase());
        });

        if(searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }
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
        /*
        <div className="search">
            <div class="centered" className="searchInput" >
                <input type="text" placeholder="Indtast patient navn..."
                       value={wordEntered}
                       onChange={handleFilter}/>
                <div className="searchIcon">
                    {filteredData.length === 0 && wordEntered.length === 0 ? <SearchIcon/> :
                        <CloseIcon id="clearBtn" onClick={clearInput}/> }
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0,15).map((value, key) => {
                        return <a className="dataItem">
                            <p>{value.navn}, {value.cpr} </p>
                        </a>
                    })}
                </div>
            )}
        </div>
        */
    )
}


export default Search;