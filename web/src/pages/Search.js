import React, {useState} from "react"
import '../styling/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import PatientData from "./Data.json";


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
    )
}


export default Search;