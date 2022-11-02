import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import axios from 'axios';
import { API_URL } from '../config';

const useStyles = makeStyles((theme: any) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));


interface RegisterInterface {
    closeDialog: () => void
    open: boolean
}


const RegisterDialog: React.FC<RegisterInterface> = ({ closeDialog, open }) => {
    const classes = useStyles();
    // create state variables for each input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password
            })

            console.log(response.data);

            closeDialog();
        } catch (e) {
            console.log('error registering')
        }
    };

    return (
        <Dialog onClose={closeDialog} open={open}>

            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="filled"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div>
                    <Button variant="contained" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </div>
            </form>
        </Dialog>

    );
};

export default RegisterDialog
