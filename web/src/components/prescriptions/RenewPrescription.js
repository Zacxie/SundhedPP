
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField, Typography} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {StaticDatePicker} from "@mui/lab";
import {Input} from "@material-ui/core";



const RenewPrescription = ({open, onClose, select, onRenewal, patient}) => {

    // State
    const [value, setValue] = React.useState(null);
    const [text, setText] =React.useState("")


    // passing text to state
    const handleChange = (e) =>{
        setText(e.target.value)
    }

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to renew a prescription for?"}
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            Patient: { }
                        </Typography>
                        <Typography gutterBottom>
                            End date: {}
                        </Typography>
                        <DialogContentText id="alert-dialog-description">
                            Description: {}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Instructions: {}
                        </DialogContentText>
                        <Typography className="renewal_datepicker" gutterBottom>
                            Reason for renewal:
                        </Typography>
                        <Input fullWidth id="standard-basic" label="Reason for renewal" variant="standard" value={text} onChange={handleChange} />
                        <div className="renewal_datepicker">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    label="End date for prescription"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}

                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => onRenewal(value, text, select)} >
                            Renew
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
}


export default RenewPrescription;